import {Product} from './Product';

/** Class representing a SubCategory. */
export class SubCategory {

    name: string;
    url: string;
    products: Array<Product>;

    /**
     * Create a SubCategory.
     * @param {string} name - The name value.
     * @param {string} url - The url value.
     * @param {Array<Product>} products - The products values.
     */
    constructor(name?: string, url?: string, products?: Array<Product>) {
        this.name = name || null;
        this.url = url || null;
        this.products = products || null;
    }

}
