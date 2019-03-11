/** Class representing a Product. */
export class Product {

    sku: number;
    name: string;
    url: string;
    shortDescription: string;
    internetPrice: number;
    normalPrice: number;
    img: string;

    /**
     * Create a Product.
     * @param {number} sku - The sku value.
     * @param {string} name - The name value.
     * @param {string} url - The url value.
     * @param {string} shortDescription - The shortDescription value.
     * @param {number} internetPrice - The internetPrice value.
     * @param {number} normalPrice - The normalPrice value.
     * @param {string} img - The img value.
     */
    constructor(sku?: number,
                name?: string,
                url?: string,
                shortDescription?: string,
                internetPrice?: number,
                normalPrice?: number,
                img?: string) {
        this.sku = sku || null;
        this.name = name || null;
        this.url = url || null;
        this.shortDescription = shortDescription || null;
        this.internetPrice = internetPrice || null;
        this.normalPrice = normalPrice || null;
        this.img = img || null;
    }

}
