import xlsx from 'xlsx';
import fs from 'fs';

const EXCEL_FILE = 'INFORMATIONS DES OSC MEMBRES DU CCEABT.xlsx';
const workbook = xlsx.readFile(EXCEL_FILE);
const sheet = workbook.Sheets[workbook.SheetNames[0]];

const data = xlsx.utils.sheet_to_json(sheet);

if (data.length > 0) {
    console.log('--- ALL KEYS ---');
    Object.keys(data[0]).forEach(key => {
        console.log(`KEY: "${key}"`);
    });
}
