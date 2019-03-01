export class Category {

    name: string;
    url: string;

    constructor(name?: string, url?: string){
        this.name = name || null;
        this.url = url || null;
    }

}
