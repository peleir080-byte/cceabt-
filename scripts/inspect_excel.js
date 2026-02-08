import xlsx from 'xlsx';
import fs from 'fs';

const EXCEL_FILE = 'INFORMATIONS DES OSC MEMBRES DU CCEABT.xlsx';
const workbook = xlsx.readFile(EXCEL_FILE);
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// Use default behavior to pick up headers
const data = xlsx.utils.sheet_to_json(sheet);

if (data.length > 0) {
    console.log('--- DETECTED KEYS (Headers) ---');
    console.log(JSON.stringify(Object.keys(data[0]), null, 2)); // Print keys of first object

    console.log('\n--- FIRST ITEM SAMPLE ---');
    console.log(JSON.stringify(data[0], null, 2));
} else {
    console.log('No data found with default parsing.');
}
