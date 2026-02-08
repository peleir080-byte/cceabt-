const AdmZip = require('adm-zip');
const fs = require('fs');

const DOCX_FILE = 'Liste des OSC membres du CCEABT avec logo.docx';

try {
    const zip = new AdmZip(DOCX_FILE);
    const contentXml = zip.readAsText('word/document.xml');

    // Simple regex to extract text within <w:t> tags
    const textMatches = contentXml.match(/<w:t[^>]*>(.*?)<\/w:t>/g);

    if (textMatches) {
        const text = textMatches.map(tag => {
            return tag.replace(/<w:t[^>]*>/, '').replace(/<\/w:t>/, '');
        }).join('\n');

        console.log('--- Extracted Text ---');
        console.log(text);

        // Save to file for inspection
        fs.writeFileSync('extracted_docx_text.txt', text);
    } else {
        console.log('No text found in document.xml');
    }

} catch (e) {
    console.error('Error reading docx:', e);
}
