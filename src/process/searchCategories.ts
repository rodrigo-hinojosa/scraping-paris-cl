const request = require('request-promise');
const cheerio = require('cheerio');
const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');

const URLS = [
    'https://www.paris.cl/led-60-lg-smart-tv-ultra-hd-4k-60uk6200-363156999.html?cgid=elcTelevision',
    'https://www.paris.cl/led-50-lg-smart-tv-ultra-hd-4k-premium-50uk6550-947684999.html?cgid=elcTelevision#start=1'
];

const BASE_URL = 'https://www.paris.cl/';

(async () => {

    const topCategoriesResponse = await request({
            uri: BASE_URL,
            headers: {
                'Origin': 'https://www.paris.cl',
                'Referer': 'https://www.paris.cl/led-50-lg-smart-tv-ultra-hd-4k-premium-50uk6550-947684999.html?cgid=elcTelevision',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36'
            }
        }
    );

    const $ = cheerio.load(topCategoriesResponse);

    const topCategories = [];

    $('#navigation > ul > li').each((_index, _category) => {

        let categoryName = $(_category).find('a').attr('data-for-scraping-category');

        let categoryHref = $(_category).find('a').attr('href');

        topCategories.push({
            name: categoryName,
            href: categoryHref
        });

    });

    let categories = [];

    for (let topCategory of topCategories) {

        let categoriesResponse = await request({
                uri: topCategory.href,
                headers: {
                    'Origin': 'https://www.paris.cl',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36'
                }
            }
        );

        let $$ = cheerio.load(categoriesResponse);

        $$('#main > div:nth-child(6) > section').each((__index, _subCategory) => {

            $$(_subCategory).find('article').each((__index, articles) => {

                let categoryName = $$(articles).find('h3').text();

                let categoryHref = $$(articles).find('a').attr('href');

                categories.push({
                    categoryTopName: topCategory.name,
                    categoryTopHref: topCategory.href,
                    categoryName: categoryName,
                    categoryHref: categoryHref
                });

            });

        });

    }

    console.log(categories);

    // $('#navigation > ul > li').each(async (_index, _category) => {
    //
    //     let categoryURL = $(_category).find('a').attr('href');
    //
    //     categorias.push(categoryURL);
    //
    //     let subCategory = await request({
    //             uri: categoryURL,
    //             headers: {
    //                 'Origin': 'https://www.paris.cl',
    //                 'Referer': 'https://www.paris.cl/led-50-lg-smart-tv-ultra-hd-4k-premium-50uk6550-947684999.html?cgid=elcTelevision',
    //                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36'
    //             }
    //         }
    //     );
    //
    //     subCategorias.push(subCategory);
    //
    //     // $2('#main > div:nth-child(6) > section:nth-child(3) > article').forEach((__index, _subCategory) => {
    //     //     let categoryName = $(_subCategory).find('h3').text();
    //     //
    //     //
    //     // });
    //
    //
    // });

    // let productsData = [];
    //
    // for (let product of URLS) {
    //
    //     const response = await request({
    //             uri: product,
    //             headers: {
    //                 'Origin': 'https://www.paris.cl',
    //                 'Referer': 'https://www.paris.cl/led-50-lg-smart-tv-ultra-hd-4k-premium-50uk6550-947684999.html?cgid=elcTelevision',
    //                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36'
    //             }
    //         }
    //     );
    //
    //     let $ = cheerio.load(response);
    //
    //     let name = $('div.product-title-wrapper > h4').text().trim();
    //     let shortDescription = $('p.short-description').text().trim();
    //     let price = parseInt($('div.item-price.offer-price.price-tc.default-price').text().trim().replace(/\D/g, ''));
    //     let SKU = parseInt($('p.product-sku').text().trim().replace(/\D/g, ''));
    //
    //     productsData.push({
    //         SKU,
    //         name,
    //         shortDescription,
    //         price
    //     });
    //
    // }
    //
    // console.log(productsData);
    //
    // const json2csvParser = new Json2csvParser();
    // const csv = json2csvParser.parse(productsData);

    const json = JSON.stringify(categories);

    fs.writeFileSync('./data-for-scraping.json', json, 'utf-8');

    debugger;

})();
