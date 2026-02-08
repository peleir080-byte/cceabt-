import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DOCX_FILE = path.join(__dirname, '..', 'public', 'images', 'partners', 'Liste des OSC membres du CCEABT avec logo.docx');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'partners');

console.log('📄 Fichier Word:', DOCX_FILE);
console.log('📁 Dossier de sortie:', OUTPUT_DIR);

// Vérifier si le fichier existe
if (!fs.existsSync(DOCX_FILE)) {
    console.error(`❌ Fichier non trouvé: ${DOCX_FILE}`);
    console.log('\n💡 Placez le fichier Word dans le répertoire racine du projet');
    process.exit(1);
}

// Créer le dossier de sortie s'il n'existe pas
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✅ Dossier créé: ${OUTPUT_DIR}`);
}

try {
    console.log('\n🔄 Extraction des images en cours...\n');
    
    const zip = new AdmZip(DOCX_FILE);
    const zipEntries = zip.getEntries();

    let count = 0;
    const extractedFiles = [];

    zipEntries.forEach((entry) => {
        if (entry.entryName.startsWith('word/media/')) {
            const fileName = path.basename(entry.entryName);
            const targetPath = path.join(OUTPUT_DIR, fileName);

            // Extraire le fichier
            zip.extractEntryTo(entry, OUTPUT_DIR, false, true);

            // Vérifier que le fichier a bien été extrait
            if (fs.existsSync(targetPath)) {
                const stats = fs.statSync(targetPath);
                console.log(`✅ Extrait: ${fileName} (${(stats.size / 1024).toFixed(2)} KB)`);
                extractedFiles.push(fileName);
                count++;
            } else {
                console.warn(`⚠️  Échec: ${fileName}`);
            }
        }
    });

    console.log(`\n✨ Total d'images extraites: ${count}`);
    console.log(`📂 Images sauvegardées dans: ${OUTPUT_DIR}`);
    
    if (extractedFiles.length > 0) {
        console.log('\n📋 Fichiers extraits:');
        extractedFiles.forEach((file, index) => {
            console.log(`   ${index + 1}. ${file}`);
        });
    }

    console.log('\n🎉 Extraction terminée avec succès!');

} catch (e) {
    console.error(`\n❌ Erreur lors du traitement du fichier DOCX: ${e.message}`);
    console.error(e.stack);
    process.exit(1);
}
