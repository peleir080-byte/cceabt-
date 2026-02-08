import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DOCX_FILE = path.join(__dirname, '..', 'public', 'images', 'partners', 'Liste des OSC membres du CCEABT avec logo.docx');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'partners');

console.log('📄 Analyse du document Word...\n');

if (!fs.existsSync(DOCX_FILE)) {
    console.error(`❌ Fichier non trouvé: ${DOCX_FILE}`);
    process.exit(1);
}

try {
    const zip = new AdmZip(DOCX_FILE);
    
    // Extraire le contenu XML du document
    const documentXml = zip.readAsText('word/document.xml');
    
    // Extraire les relations pour faire correspondre les images aux noms
    const relsXml = zip.readAsText('word/_rels/document.xml.rels');
    
    console.log('📋 Analyse du contenu du document...\n');
    
    // Chercher les noms d'organisations dans le texte
    const orgNames = [];
    
    // Patterns pour trouver les noms d'organisations
    const textMatches = documentXml.match(/<w:t[^>]*>([^<]+)<\/w:t>/g) || [];
    const extractedText = textMatches
        .map(match => match.replace(/<[^>]+>/g, ''))
        .filter(text => text.trim().length > 2)
        .filter(text => !/^\d+$/.test(text.trim())); // Exclure les numéros
    
    console.log('📝 Texte extrait du document:');
    console.log('─'.repeat(50));
    extractedText.forEach((text, index) => {
        if (text.trim().length > 3) {
            console.log(`${index + 1}. ${text.trim()}`);
        }
    });
    console.log('─'.repeat(50));
    
    // Lister les images disponibles
    console.log('\n🖼️  Images extraites:');
    console.log('─'.repeat(50));
    const imageFiles = fs.readdirSync(IMAGES_DIR)
        .filter(file => /\.(png|jpg|jpeg)$/i.test(file))
        .filter(file => file.startsWith('image'));
    
    imageFiles.forEach((file, index) => {
        const filePath = path.join(IMAGES_DIR, file);
        const stats = fs.statSync(filePath);
        console.log(`${index + 1}. ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
    });
    console.log('─'.repeat(50));
    
    // Essayer de faire correspondre les images aux organisations
    console.log('\n🔍 Tentative de correspondance...\n');
    
    // Liste des organisations connues
    const knownOrgs = [
        'PADI', 'Chaine de l\'espoir', 'FIADI', 'ODIAE', 'ADESCO', 'AJT', 'CDD',
        'AESEN', 'AFD', 'UE', 'PSEAU', 'Coalition Eau', 'SWA', 'AAFEA',
        'ENDWATERPOVERTY', 'Ambassade de France au Togo', 'GENDA Water Alliance',
        'Plan International Togo', 'SEVES', 'CAWST'
    ];
    
    console.log('Organisations connues trouvées dans le document:');
    knownOrgs.forEach(org => {
        if (extractedText.some(text => text.toLowerCase().includes(org.toLowerCase()))) {
            console.log(`  ✅ ${org}`);
        }
    });
    
    console.log('\n💡 Pour identifier les logos:');
    console.log('   1. Ouvrez le document Word');
    console.log('   2. Notez l\'ordre des organisations et leurs logos');
    console.log('   3. Les images sont numérotées dans l\'ordre d\'apparition dans le document');
    
} catch (e) {
    console.error(`❌ Erreur: ${e.message}`);
    console.error(e.stack);
    process.exit(1);
}
