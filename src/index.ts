import {ParisSiteScrapping} from './parisSiteContents';
import {Utils} from './utils';

(async () => {
    // Execute Script
    console.log('start: ', Utils.getDatetime());
    await ParisSiteScrapping.initialize();
    console.log('finish: ', Utils.getDatetime());

})();
