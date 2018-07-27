import Api from '../models/api';
import ApiEvent from '../models/tracking/apiEvent';

var https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default class ApiWorker {

    apiModel = Api;
    apiEventModel = ApiEvent;

    doWork = () => {

        this.apiModel.find({}, (err, docs) => {

            docs.forEach(element => {
                this.doApiRequest(element.hostName, element.headers, element.path, element.method, 
                    element.data, this.trackApiRequest);
            });
        });
    }
  
    doApiRequest = (hostName, headers, path, method, data, tracker) => {


        let headerList = {};
        headers.forEach(element => {
            headerList[element.key] = element.value;
        });

        if (data) {
            headerList['Content-Length'] = Buffer.byteLength(data);
        }

        let options = {
            hostname: hostName,
            headers: headerList,
            path: path,
            method: method
        };

        console.log(`doRequest hostName: ${hostName} path: ${path} options: ${JSON.stringify(options)} data: ${data}`);               
        
        try {
            let start = Date.now();    
            let req = https.request(options, function(response){
                var str = '';
                response.on('data', function (chunk) {
                    str += chunk;
                });
                response.on('end', function () {
                    console.log(`received ${str.length} bytes`);
                    var end = Date.now();
                    var elapsedTime = end - start;
                    tracker(hostName, path, response.statusCode, str.length, elapsedTime);
                });
            });
            req.write(data);
            req.end();
        } catch (e) {
            console.log('doRequest exception: ', e);               
        }       
    }

    trackApiRequest = (hostName, path, responseStatusCode, size, elapsedTime) => {

        let eventDate = new Date();
        let apiEventData = {
            url: hostName + path,
            httpStatus: responseStatusCode,
            responseTimeMilliseconds: elapsedTime,
            responseSize: size,
            date: eventDate,
            dayOfWeek: eventDate.getDay(),
            dayOfMonth: eventDate.getDate(),
            month: eventDate.getMonth(),
            year: eventDate.getFullYear()
        }
        
        const obj = new this.apiEventModel(apiEventData);
        obj.save((err, item) => {
            if (err) {
                console.error(err);
            } else {
                console.log(`trackApiRequest: ${apiEventData}`);
            }

        });
    }

}
