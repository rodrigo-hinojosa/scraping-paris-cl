import { Category } from './Category';

export class SubCategory {

    category: Category;
    name: string;
    url: string;

    constructor(category?: Category, name?: string, url?: string){
        this.category = category || null;
        this.name = name || null;
        this.url = url || null;
    }

}
