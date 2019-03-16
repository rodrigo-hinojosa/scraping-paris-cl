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

    static writeJsonFile(data: any, dir: string, fileName: string): void {

        const jsonFile = JSON.stringify(data);

        fs.writeFileSync(`${dir.concat(fileName)}.json`, jsonFile, 'utf-8');

    }

    static writeXmlFile(data: any, dir: string, fileName: string): void {

        fs.writeFileSync(`${dir.concat(fileName)}.xml`, data, 'utf-8');

    }

    static writeCsvFile(data: any, dir: string, fileName: string): void {

        const csvFile = Json2csvParser.parse(data);

        fs.writeFileSync(`${dir.concat(fileName)}.csv`, csvFile, 'utf-8');

    }

    static createExportFolder(): string {

        const dirExport = './dist/export/';

        if (!fs.existsSync(dirExport)) {
            fs.mkdirSync(dirExport);
        }

        const processDir: string = `${dirExport.concat(this.getTimeStamp())}`;

        if (!fs.existsSync(processDir)) {
            fs.mkdirSync(processDir);
        }

        return processDir.concat('/');
    }

    static fixLastLineOfXmlFiles(dir: string): void {

        // fs.readdirSync(dir, (err, files) => {
        //     files.forEach((file) => {
        //         fs.readFileSync('DATA', 'utf8');
        //     });
        // });
        //
        // var files = fs.readdirSync('./lib/application/models/');
        // for (var i in files) {
        //     var definition = require('./application/models/' + files[i]).Model;
        //     console.log('Model Loaded: ' + files[i]);
        // }

    }

}
