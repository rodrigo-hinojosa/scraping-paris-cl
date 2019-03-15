import * as jsonToXml from 'jsontoxml';

import {Product} from '../models';
import {Utils} from '../utils';

export const jsonDataToXml = {
    initialize: (products: Array<Product>): jsonToXml => {

        const data = jsonToXml(jsonDataToXml.setJsonProducts(products), {xmlHeader: true});

        Utils.writeXmlFile(data);

    },
    setJsonProducts: (products: Array<Product>) => {

        const xmlProductsList = [];

        for (const product of products) {
            xmlProductsList.push(jsonDataToXml.setJsonProduct(product));
        }

        return {catalog: xmlProductsList};

    },
    setJsonProduct: (product: Product): object => {

        return {
            name: 'product',
            attrs: {'product-id': product.sku},
            children: [
                {name: 'unit', text: 1},
                {name: 'min-order-quantity', text: 1},
                {name: 'step-quantity', text: 1},
                {name: 'display-name', attrs: {'xml:lang': 'x-default'}, text: product.name},
                {name: 'short-description ', attrs: {'xml:lang': 'x-default'}, text: product.shortDescription},
                {name: 'store-force-price-flag', text: 'false'},
                {name: 'store-non-inventory-flag', text: 'false'},
                {name: 'store-non-revenue-flag', text: 'false'},
                {name: 'store-non-discountable-flag', text: 'false'},
                {name: 'online-flag', text: 'true'},
                {name: 'available-flag', text: 'true'},
                {name: 'searchable-flag', text: 'true'},
                {name: 'brand', text: product.brand},
                {
                    name: 'page-attributes', children: [
                        {name: 'page-title', attrs: {'xml:lang': 'x-default'}, text: product.pageTitle},
                        {
                            name: 'page-description',
                            attrs: {'xml:lang': 'x-default'},
                            text: product.pageDescription
                        }
                    ]
                },
                {
                    name: 'classification-category',
                    attrs: {'catalog-id': 'paris-storefront-catalog'},
                    text: 'root'
                },
                {name: 'pinterest-enabled-flag', text: 'false'},
                {name: 'facebook-enabled-flag', text: 'false'},
                {
                    name: 'store-attributes', children: [
                        {name: 'force-price-flag', text: 'false'},
                        {name: 'non-inventory-flag', text: 'false'},
                        {name: 'non-revenue-flag', text: 'false'},
                        {name: 'non-discountable-flag', text: 'false'}
                    ]
                }
            ]
        };

    }
};
