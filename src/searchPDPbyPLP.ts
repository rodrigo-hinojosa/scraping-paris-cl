import * as cheerio from 'cheerio';
import * as request from 'request-promise';
import {categories} from './categories';
import {Utils} from './utils';

const BASE_URL = 'https://www.paris.cl';

try {

    console.log(Utils.getDatetime());

    (async () => {

        const productsData = [];

        for (const category of categories) {

            const PLPResponse = await request({
                    headers: {
                        'Origin': 'https://www.paris.cl',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36'
                    },
                    uri: category.subCategoryURL,
                }
            );

            const $PLP = cheerio.load(PLPResponse);

            const productsHref = [];

            $PLP('#search-result-items > li').each(async (index, product) => {

                const productHref = $PLP(product).find('div.box-image-product > div > a').attr('href');

                productsHref.push(productHref);

            });

            for (const productHref of productsHref) {

                await new Promise((resolve) => setTimeout(resolve, 1000));

                const PDPResponse = await request({
                        headers: {
                            'Origin': 'https://www.paris.cl',
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36'
                        },
                        uri: BASE_URL.concat(productHref),

                    }
                );

                const $PDP = cheerio.load(PDPResponse);

                const SKU = parseInt($PDP('p.product-sku').text().trim().replace(/\D/g, ''), 0);
                const name = $PDP('div.product-title-wrapper > h4').text().trim();
                const shortDescription = $PDP('p.short-description').text().trim();
                const internetPrice = parseInt($PDP('#product-content > div.price > div.item-price').text().trim().replace(/\D/g, ''), 0);
                const normalPrice = parseInt($PDP('#product-content > div.price > div.row-price > div.column-price.details-price > div > s').text().trim().replace(/\D/g, ''), 0);

                productsData.push({
                    'category Name': category.categoryName,
                    'subCategory Name': category.subCategoryName,
                    'subCategory URL': category.subCategoryURL,
                    'product Name': name,
                    'product URL': BASE_URL.concat(productHref),
                    'product SKU': SKU,
                    'product Short description': shortDescription,
                    'product Internet Price': internetPrice,
                    'product Normal Price': normalPrice
                });

            }

        }

        Utils.writeCsvFile(productsData);

        Utils.writeJsonFile(productsData);

        console.log(Utils.getDatetime());

    })();
} catch (e) {
    console.log(e);
}



