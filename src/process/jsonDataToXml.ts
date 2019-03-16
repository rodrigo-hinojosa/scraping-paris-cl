import * as jsonToXml from 'jsontoxml';

import {Category, Product} from '../models';
import {Utils} from '../utils';

export const jsonDataToXml = {
    initialize: (categories: Array<Category>): void => {

        const products = [];

        for (const category of categories) {

            for (const subCategory of category.subCategories) {

                for (const product of subCategory.products) {
                    products.push(product);
                }
            }
        }

        jsonDataToXml.saveFiles(products);

    },
    setJsonProducts: (products: Array<Product>): object => {

        const xmlProductsList = [];

        for (const product of products) {
            xmlProductsList.push(jsonDataToXml.setJsonProduct(product));
        }

        return {'catalog xmlns="http://www.demandware.com/xml/impex/catalog/2006-10-31" catalog-id="cencosud-master-catalog"': xmlProductsList};

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

    },
    setJsonInventories: (products: Array<Product>, listIdName: string): object => {

        const xmlInventoryList = [];

        for (const product of products) {
            xmlInventoryList.push(jsonDataToXml.setJsonInventory(product));
        }

        return {
            'inventory xmlns="http://www.demandware.com/xml/impex/inventory/2007-05-31"': {
                'inventory-list': [
                    {
                        name: 'header', attrs: {'list-id': listIdName}, children: [
                            {name: 'default-instock', text: 'false'},
                            {name: 'use-bundle-inventory-only', text: 'false'},
                            {name: 'on-order', text: 'false'}
                        ]
                    },
                    {
                        records: [xmlInventoryList]
                    }
                ]
            }
        };

    },
    setJsonInventory: (product: Product): object => {

        return {
            name: 'record',
            attrs: {'product-id': product.sku},
            children: [
                {name: 'allocation', text: 100},
                {name: 'allocation-timestamp', text: '2019-01-08T05:02:27.00Z'},
                {name: 'perpetual', text: false},
                {name: 'preorder-backorder-handling', text: 'none'}
            ]
        };

    },
    setJsonPrices: (products: Array<Product>, priceBookIdName: string, priceType: string): object => {

        const xmlInventoryList = [];

        for (const product of products) {
            xmlInventoryList.push(jsonDataToXml.setJsonPrice(product, priceType));
        }

        return {
            'pricebooks xmlns="http://www.demandware.com/xml/impex/pricebook/2006-10-31"': {
                pricebook: [
                    {
                        name: 'header', attrs: {'pricebook-id': priceBookIdName}, children: [
                            {name: 'currency', text: 'CLP'}
                        ]
                    },
                    {
                        'price-tables': [xmlInventoryList]
                    }
                ]
            }
        };

    },
    setJsonPrice: (product: Product, priceType: string): object => {

        return {
            name: 'price-table',
            attrs: {'product-id': product.sku},
            children: [
                {name: 'online-from', text: '2019-02-11T06:01:00.000'},
                {name: 'online-to', text: '2019-02-05T06:00:00.000'},
                {name: 'mount', attrs: {quantity: 1}, text: product[priceType]}
            ]
        };

    },
    saveFiles: (products: Array<Product>) => {

        const xmlFileConfig = {
            xmlHeader: true
        };

        const exportDir = Utils.createExportFolder();

        // Create Catalog XML file
        Utils.writeXmlFile(jsonToXml(jsonDataToXml.setJsonProducts(products), xmlFileConfig), exportDir, 'catalog');

        // Create Inventories XML file
        Utils.writeXmlFile(jsonToXml(jsonDataToXml.setJsonInventories(products, 'Consolidated'), xmlFileConfig), exportDir, 'inventory-consolidated');
        Utils.writeXmlFile(jsonToXml(jsonDataToXml.setJsonInventories(products, 'Paris.cl'), xmlFileConfig), exportDir, 'inventory-paris-cl');

        // Create Prices XML file
        Utils.writeXmlFile(jsonToXml(jsonDataToXml.setJsonPrices(products, 'clp-internet-prices', 'internetPrice'), xmlFileConfig), exportDir, 'internet-prices');
        Utils.writeXmlFile(jsonToXml(jsonDataToXml.setJsonPrices(products, 'clp-list-prices', 'normalPrice'), xmlFileConfig), exportDir, 'list-prices');
    }
};
