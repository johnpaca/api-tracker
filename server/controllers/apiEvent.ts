import ApiEvent from '../models/tracking/apiEvent';
import BaseCtrl from './base';


export default class ApiEventCtrl extends BaseCtrl {
  model = ApiEvent;

//   getSummary = (req, res) => {

//     var time = new Date().getTime() - 1 * 24 * 60 * 60 * 1000;
//     this.model.aggregate([
//         { $match: {
//             date: { $gt: new Date(time) }
//         }}
//     ], function (err, result) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(result);
//         res.status(200).json(result);
//     });
//   }

    getSummary1 = (req, res) => {

        this.model.aggregate([
        { $group: {
            _id: { url: "$url" },
            averageResponseTimeMilliseconds: {$avg: "$responseTimeMilliseconds"},
            count: { $sum: 1}
        }}
        ], function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);
            res.status(200).json(result);
        });
    }
    
    getSummaryForUrl = (url) => {
        return new Promise(function (resolve, reject) {
            this.model.find({"url" : url}, null, {sort: '-date'}, (err, docs) => {
                if (err) { return reject(err); }
                return resolve(docs);
            })
        });
    }

    getSummaryForUrls = (urlArray) => {
        let outputDocs = []
        return new Promise(function (resolve, reject) {
            urlArray.forEach(element => {
                outputDocs.push(this.getSummaryForUrl(element._id.url));
            });

            return resolve(outputDocs);
        });
    };    

    // Get all Sorted By Date
    getSummary = (req, res) => {

        console.log(`startDate ${req.query.startDate} endDate ${req.query.endDate}`);
        
        let startDateObj = new Date(req.query.startDate);
        let endDateObj = new Date(req.query.endDate);

        this.model.find({"date": {"$gte": startDateObj, "$lt": endDateObj}}, null, {sort: '-date'}, (err, docs) => {
            if (err) { return console.error(err); }


            let summaryObject: {
                _id: number;
                url: string;
                count: number;
                countErrorWarn: number;
                averageResponseTimeMilliseconds: number;
                percentageErrorWarn: number;
                status: string[]
            }
            let outputDocs = [];
            
            docs.forEach(element => {
                
                summaryObject = null;
                for (let index = 0; index < outputDocs.length; index++) {
                    if (outputDocs[index].url === element.url) {
                        summaryObject = outputDocs[index];
                    }
                }
                if (summaryObject == null) {
                    summaryObject = {
                        _id: element._id,
                        url: element.url,
                        count: 0,
                        countErrorWarn: 0,
                        averageResponseTimeMilliseconds: 0,
                        percentageErrorWarn: 0,
                        status: []
                    }
                    outputDocs.push(summaryObject);                  
                }

                summaryObject.count++;
                summaryObject.averageResponseTimeMilliseconds += element.responseTimeMilliseconds;
                if (element.httpStatus != 200) {
                    summaryObject.status[summaryObject.count-1] = "E"; 
                    summaryObject.countErrorWarn++;
                } else if (element.responseTimeMilliseconds > 500) {
                    summaryObject.status[summaryObject.count-1] = "W"; 
                    summaryObject.countErrorWarn++;
                } else {
                    summaryObject.status[summaryObject.count-1] = "K"; 
                }

            });

            // compute average response time / percentage error or warn
            outputDocs.forEach(doc2 => {
                doc2.averageResponseTimeMilliseconds = Math.floor(doc2.averageResponseTimeMilliseconds / 
                    doc2.count);
                doc2.percentageErrorWarn = Math.floor(100 * (doc2.countErrorWarn / doc2.count));
            });

            //console.log(outputDocs);
            res.status(200).json(outputDocs);
        });
    }
    
  
    getAllyyyy = (req, res) => {

        this.model.aggregate([
            { $group: {
                _id: { url: "$url" }
            }}], function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(result);

            let outputDocs = [];

            result.forEach(element => {
                ApiEvent.find({"url" : element._id.url}, null, {sort: '-date'}, (err, docs) => {
                    if (err) { return console.error(err); }
                    //res.status(200).json(docs);
                    outputDocs.push(docs);
                })
                console.log(element);    

            });

        });



        // console.log(result);

        // let outputDocs = [];

        // // { "_id" : { "url" : "int-api.ihg.com/hotels/v1/profiles/ATLMA/details" } }
        // result.forEach(element => {
        //     this.model.find({"url" : element._id.url}, null, {sort: '-date'}, (err, docs) => {
        //         if (err) { return console.error(err); }
        //         res.status(200).json(docs);
        //         outputDocs.push(docs);
        //     })
        //     console.log(element);              
        // });

        // res.status(200).json(outputDocs);
    }


    // Get all Sorted By Data
    getAllDetail = (req, res) => {

        console.log(`startDate ${req.query.startDate} endDate ${req.query.endDate}`);
        
        let startDateObj = new Date(req.query.startDate);
        let endDateObj = new Date(req.query.endDate);

        this.model.find({"date": {"$gte": startDateObj, "$lt": endDateObj}}, null, {sort: '-date'}, (err, docs) => {
            if (err) { return console.error(err); }
            res.status(200).json(docs);
        });
    }
    
 
}
