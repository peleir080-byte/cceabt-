import xlsx from 'xlsx';
import fs from 'fs';

const EXCEL_FILE = 'INFORMATIONS DES OSC MEMBRES DU CCEABT.xlsx';
const workbook = xlsx.readFile(EXCEL_FILE);
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// Read as array of arrays to see raw structure
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

console.log(`Total Raw Rows: ${data.length}`);
console.log('--- First 5 Rows ---');
data.slice(0, 5).forEach((row, i) => console.log(`Row ${i}:`, JSON.stringify(row)));

// Check for empty rows confusing the parser
console.log('--- Checking for empty rows ---');
let emptyCount = 0;
data.forEach((row, i) => {
    if (!row || row.length === 0) {
        console.log(`Row ${i} is empty`);
        emptyCount++;
    }
});
console.log(`Total empty rows: ${emptyCount}`);
