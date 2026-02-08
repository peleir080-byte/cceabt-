import xlsx from 'xlsx';

const EXCEL_FILE = 'INFORMATIONS DES OSC MEMBRES DU CCEABT.xlsx';
const workbook = xlsx.readFile(EXCEL_FILE);

console.log('Sheets:', workbook.SheetNames);
workbook.SheetNames.forEach(name => {
    const sheet = workbook.Sheets[name];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    console.log(`Sheet "${name}" has ${data.length} rows.`);
});
