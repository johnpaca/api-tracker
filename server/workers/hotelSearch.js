var https = require('https');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";



hotelDetails = function() {
  var options = {
      hostname: 'int-api.ihg.com',
      headers: {
          'x-ihg-mws-api-token': 'dbd3f1ee-3ca1-48dc-b509-ace04edcb7da',
          'x-ihg-api-key': 'Ym5gIH17Fe7WcF9J3gHbtAyoeusJpO2q',
          'content-type': 'application/json'
      },
      path: '/hotels/v1/profiles/ATLWS/details',
      method: 'GET'
  };
  
  console.log('hotel details...');

  var req = https.request(options, function(response){
      var str = '';
      response.on('data', function (chunk) {
          str += chunk;
      });
      response.on('end', function () {
          console.log(str);
      });
  });
  req.end();
}

hotelSearch = function() {

    var data = '{"version":"1.3","location":{"location":"New York, NY"},"radius": 50,"checkDailyPointsCost":"true","stay":{"dateRange": {"start": "2018-10-20","end": "2018-10-21"}, "adults":1,"rooms":1,"children":0,"rateCode": "6CBARC"},"bulkAvailability": true}';

    var options = {
        hostname: 'qap.guestapi.ihg.com',
        headers: {
            'X-IHG-MWS-API-Token': 'dbd3f1ee-3ca1-48dc-b509-ace04edcb7da',
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
         },
        path: '/v1/holidayinn/us/en/searchLight',
        method: 'POST'
    };
    

    console.log('hotel search ...');

    var start = Date.now();    
    var req = https.request(options, function(response){
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            console.log(`received ${str.length} bytes`);
        });

        var end = Date.now();
        var elapsedTime = end - start;
        console.log(`response status: ${response.statusCode} response milliseconds: ${elapsedTime}`);
        var storageItem = {
            status: response.statusCode,
            size: str.length,
            elapsedTime: elapsedTime
        }
        //storage.add(storageItem);

    });
    req.write(data);
    req.end();    
}

exports.doSomeWork = function () {

  //hotelDetails();
  
  hotelSearch();          
}

