import fs from 'fs';
import path from 'path';

const XML_FILE = path.join('temp_docx', 'word', 'document.xml');

try {
    if (fs.existsSync(XML_FILE)) {
        const contentXml = fs.readFileSync(XML_FILE, 'utf8');

        // Regex to find text inside <w:t> tags
        const textMatches = contentXml.match(/<w:t[^>]*>(.*?)<\/w:t>/g);

        if (textMatches) {
            // Join with newline, filter out empty strings
            const text = textMatches
                .map(tag => tag.replace(/<w:t[^>]*>/, '').replace(/<\/w:t>/, ''))
                .filter(t => t.trim().length > 0)
                .join('\n');

            console.log('--- Extracted Text Start ---');
            console.log(text);
            console.log('--- Extracted Text End ---');

            fs.writeFileSync('extracted_docx_text.txt', text);
        } else {
            console.log('No text found in xml');
        }
    } else {
        console.log('XML file not found:', XML_FILE);
        // List dir to debug
        if (fs.existsSync('temp_docx')) {
            console.log('temp_docx contents:', fs.readdirSync('temp_docx'));
            if (fs.existsSync('temp_docx/word')) {
                console.log('temp_docx/word contents:', fs.readdirSync('temp_docx/word'));
            }
        }
    }

} catch (e) {
    console.error('Error:', e);
}
