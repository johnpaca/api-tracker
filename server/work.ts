import * as express from 'express';
import ApiWorker from './workers/apiWorker';

import * as hotelSearch from './workers/hotelSearch';

//import store from './workers/store';

export default function doWork() {

    //Set up storage
    //const storage = require('./server/work/store');

    //Set up workers
    //const workers = require('./server/work/worker');
    //setInterval(hotelSearch.doSomeWork, 20000);

    let apiWorker = new ApiWorker();
    setInterval(apiWorker.doWork, 20000);

}
