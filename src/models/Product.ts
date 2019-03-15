/** Class representing a Product. */
export class Product {

    sku: number;
    name: string;
    url: string;
    shortDescription: string;
    internetPrice: number;
    normalPrice: number;
    brand: string;
    img: string;
    pageTitle: string;
    pageDescription: string;

    /**
     * Create a Product.
     * @param {number} sku - The sku value.
     * @param {string} name - The name value.
     * @param {string} url - The url value.
     * @param {string} shortDescription - The shortDescription value.
     * @param {number} internetPrice - The internetPrice value.
     * @param {number} normalPrice - The normalPrice value.
     * @param {string} brand - The brand value.
     * @param {string} img - The image value.
     * @param {string} pageTitle - The Page title value.
     * @param {string} pageDescription - Page description img value.
     */
    constructor(sku?: number,
                name?: string,
                url?: string,
                shortDescription?: string,
                internetPrice?: number,
                normalPrice?: number,
                brand?: string,
                img?: string,
                pageTitle?: string,
                pageDescription?: string) {
        this.sku = sku || null;
        this.name = name || null;
        this.url = url || null;
        this.shortDescription = shortDescription || null;
        this.internetPrice = internetPrice || null;
        this.normalPrice = normalPrice || null;
        this.brand = brand || null;
        this.img = img || null;
        this.pageTitle = pageTitle || null;
        this.pageDescription = pageDescription || null;
    }

}
