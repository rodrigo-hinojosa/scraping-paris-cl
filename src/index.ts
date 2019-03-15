import {getParisSiteData, jsonDataToXml} from './process';
import {Utils} from './utils';

(async () => {
    // Execute Process
    console.log('start: ', Utils.getDatetime());

    const parisSiteData = await getParisSiteData.initialize();

    const products = [];

    for (const category of parisSiteData) {

        for (const subCategory of category.subCategories) {

            for (const product of subCategory.products) {
                products.push(product);
            }
        }
    }

    jsonDataToXml.initialize(products);

    console.log('finish: ', Utils.getDatetime());

})();
