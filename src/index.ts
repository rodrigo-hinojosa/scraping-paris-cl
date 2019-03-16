import {getParisSiteData, jsonDataToXml} from './process';
import {Utils} from './utils';

(async () => {
    // Execute Process
    console.log('start: ', Utils.getDatetime());

    const parisSiteData = await getParisSiteData.initialize();

    jsonDataToXml.initialize(parisSiteData);

    console.log('finish: ', Utils.getDatetime());

})();
