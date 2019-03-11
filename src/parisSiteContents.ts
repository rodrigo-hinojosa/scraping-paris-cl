import * as cheerio from 'cheerio';
import * as request from 'request-promise';

import {Category} from './models/Category';
import {Product} from './models/Product';
import {SubCategory} from './models/SubCategory';

import {categoryList} from './data-for-scraping/categoryList';
import {Utils} from './utils';

const BASE_URL: string = 'https://www.paris.cl';

export const ParisSiteScrapping = {

    initialize: async (): Promise<void> => {
        const scrapingData = await ParisSiteScrapping.getCategories(categoryList);

        Utils.writeJsonFile(scrapingData);
    },
    getCategories: async (categories: Array<Category>): Promise<Array<Category>> => {

        for (const category of categories) {

            category.subCategories = await ParisSiteScrapping.getSubCategories(category.subCategories);

        }

        return categories;

    },
    getSubCategories: async (subCategories: Array<SubCategory>): Promise<Array<SubCategory>> => {

        for (const subCategory of subCategories) {

            const PLPResponse = await request({
                headers: {
                    'Origin': BASE_URL,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36'
                },
                uri: subCategory.url,
            });

            const $PLP = cheerio.load(PLPResponse);

            const productsHref = [];

            $PLP('#search-result-items > li').each((index, product) => {

                const productHref = $PLP(product).find('div.box-image-product > div > a').attr('href');

                productsHref.push(productHref);

            });

            subCategory.products = await ParisSiteScrapping.getProducts(productsHref);

            $PLP('div.col-md-6.col-sm-12.border-right.center.pages.pages-top.d-md-none > div > a').each((index, page) => {

                const productHref = $PLP(page).find('div.box-image-product > div > a').attr('href');

                productsHref.push(productHref);

            });

        }

        return subCategories;

    },
    getProducts: async (productsHref: Array<string>): Promise<Array<Product>> => {

        const products: Array<Product> = [];

        for (const productHref of productsHref) {

            await new Promise((resolve) => setTimeout(resolve, 1500));

            const url = BASE_URL.concat(productHref);

            const PDPResponse = await request({
                headers: {
                    'Origin': BASE_URL,
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36'
                },
                uri: url
            });

            const $PDP = cheerio.load(PDPResponse);

            const sku = parseInt($PDP('p.product-sku').text().trim().replace(/\D/g, ''), 0);
            const name = $PDP('div.product-title-wrapper > h4').text().trim();
            const shortDescription = $PDP('p.short-description').text().trim();
            const internetPrice = parseInt($PDP('#product-content > div.price > div.item-price').text().trim().replace(/\D/g, ''), 0);
            const normalPrice = parseInt($PDP('#product-content > div.price > div.row-price > div.column-price.details-price > div > s').text().trim().replace(/\D/g, ''), 0);
            const img = $PDP('div.box-foto.product-primary-image.slider-zoom > div > a').attr('href');

            const product = new Product(
                sku,
                name,
                url,
                shortDescription,
                internetPrice,
                normalPrice,
                img
            );

            products.push(product);

        }

        return products;

    }

};





