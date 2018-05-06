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
                this.doApiRequest(element._id, element.hostName, element.headers, element.path, element.method, 
                    element.data, this.trackApiRequest);
            });
        });
    }
  
    doApiRequest = (_id, hostName, headers, path, method, data, tracker) => {

        console.log(`doRequest hostName: ${hostName} path: ${path}`);               

        let headerList = {};
        headers.forEach(element => {
            headerList[element.key] = element.value;
        });

        headerList['Content-Length'] = Buffer.byteLength(data);

        let options = {
            hostname: hostName,
            headers: headerList,
            path: path,
            method: method
        };

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
                tracker(_id, response.statusCode, str.length, elapsedTime);
            });
        });
        req.write(data);
        req.end();       
    }

    trackApiRequest = (_id, responseStatusCode, size, elapsedTime) => {

        console.log(`Tracking response for Api id: ${_id} response status: ${responseStatusCode} response milliseconds: ${elapsedTime}`);

        let eventDate = new Date();
        let apiEventData = {
            _apiId: _id,
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
