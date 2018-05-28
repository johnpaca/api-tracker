import * as express from 'express';
import ApiWorker from './workers/apiWorker';

import * as hotelSearch from './workers/hotelSearch';

//import store from './workers/store';

export default function doWork() {

    let apiWorker = new ApiWorker();
    setInterval(apiWorker.doWork, 60 * 1000);

}
