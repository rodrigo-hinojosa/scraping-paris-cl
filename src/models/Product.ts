import { SubCategory } from './SubCategory';

export class Product {

    subCategory: SubCategory;
    sku: number;
    name: string;
    url: string;
    shortDescription: string;
    internetPrice: number;
    normalPrice: number;

    constructor(subCategory?: SubCategory,
                sku?: number,
                name?: string,
                url?: string,
                shortDescription?: string,
                internetPrice?: number,
                normalPrice?: number){
        this.subCategory = subCategory || null;
        this.sku = sku || null;
        this.name = name || null;
        this.url = url || null;
        this.shortDescription = shortDescription || null;
        this.internetPrice = internetPrice || null;
        this.normalPrice = normalPrice || null;
    }

}
