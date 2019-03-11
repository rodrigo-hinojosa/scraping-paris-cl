import * as fs from 'fs';
import * as Json2csvParser from 'json2csv';

export class Utils {

    static getDatetime(): string {
        const i = new Date();

        return ('00' + (i.getMonth() + 1)).slice(-2) + '/' +
            ('00' + i.getDate()).slice(-2) + '/' +
            i.getFullYear() + ' ' +
            ('00' + i.getHours()).slice(-2) + ':' +
            ('00' + i.getMinutes()).slice(-2) + ':' +
            ('00' + i.getSeconds()).slice(-2);
    }

    static getTimeStamp(): string {
        const d = new Date();

        return ('00' + (d.getMonth() + 1)).slice(-2) +
            ('00' + d.getDate()).slice(-2) + d.getFullYear() +
            ('00' + d.getHours()).slice(-2) +
            ('00' + d.getMinutes()).slice(-2) +
            ('00' + d.getSeconds()).slice(-2);
    }

    static writeJsonFile(data: any): void {

        this.createExportFolder();

        const jsonFile = JSON.stringify(data);

        fs.writeFileSync(`./dist/export/${this.getTimeStamp()}-data.json`, jsonFile, 'utf-8');

    }

    static writeCsvFile(data: any): void {

        this.createExportFolder();

        const csvFile = Json2csvParser.parse(data);

        fs.writeFileSync(`./dist/export/${this.getTimeStamp()}-data.csv`, csvFile, 'utf-8');

    }

    private static createExportFolder() {

        const dir = './dist/export';

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }

}
