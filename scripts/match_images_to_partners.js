import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DOCX_FILE = path.join(__dirname, '..', 'public', 'images', 'partners', 'Liste des OSC membres du CCEABT avec logo.docx');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images', 'partners');

console.log('🔍 Correspondance des images aux organisations...\n');

if (!fs.existsSync(DOCX_FILE)) {
    console.error(`❌ Fichier non trouvé: ${DOCX_FILE}`);
    process.exit(1);
}

try {
    const zip = new AdmZip(DOCX_FILE);
    
    // Extraire le contenu XML du document
    const documentXml = zip.readAsText('word/document.xml');
    const relsXml = zip.readAsText('word/_rels/document.xml.rels');
    
    // Extraire les relations image -> rId
    const imageRelations = {};
    const relMatches = relsXml.match(/<Relationship[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"[^>]*>/g) || [];
    relMatches.forEach(rel => {
        const idMatch = rel.match(/Id="([^"]+)"/);
        const targetMatch = rel.match(/Target="([^"]+)"/);
        if (idMatch && targetMatch && targetMatch[1].includes('media/')) {
            imageRelations[idMatch[1]] = path.basename(targetMatch[1]);
        }
    });
    
    // Extraire le texte et trouver l'ordre des organisations
    const textMatches = documentXml.match(/<w:t[^>]*>([^<]+)<\/w:t>/g) || [];
    const extractedText = textMatches
        .map(match => match.replace(/<[^>]+>/g, ''))
        .filter(text => text.trim().length > 0);
    
    // Trouver les références aux images dans le document
    const imageRefs = documentXml.match(/<a:blip[^>]*r:embed="([^"]+)"/g) || [];
    const imageOrder = [];
    imageRefs.forEach(ref => {
        const rIdMatch = ref.match(/r:embed="([^"]+)"/);
        if (rIdMatch && imageRelations[rIdMatch[1]]) {
            imageOrder.push(imageRelations[rIdMatch[1]]);
        }
    });
    
    // Mapping des organisations connues (CDD et CCDD sont différents)
    const orgMapping = {
        'PADIE': 'PADI',
        'PADI': 'PADI',
        'ONG FIADI': 'FIADI',
        'FIADI': 'FIADI',
        'ODIAE': 'ODIAE',
        'ADESCO': 'ADESCO',
        'Action Jeune Togo': 'AJT',
        'AJT': 'AJT',
        'CCDD': 'CCDD', // Collectif des citoyens pour le développement durable
        'CDD': 'CDD', // Communication pour un Développement Durable (différent de CCDD)
        'Communication pour un': 'CDD', // Pour détecter CDD
        'Développemenet Durable': 'CDD', // Partie du nom CDD
        'La Chaîne de l\'Espoir': 'Chaine de l\'espoir',
        'Chaine de l\'espoir': 'Chaine de l\'espoir',
        'Plan International Togo': 'Plan International Togo',
        'SEVES': 'SEVES'
    };
    
    // Trouver les organisations dans le texte (en vérifiant le contexte pour distinguer CDD et CCDD)
    const foundOrgs = [];
    const processedIndices = new Set();
    
    // Construire le texte complet pour mieux analyser le contexte
    const fullText = extractedText.join(' ').toLowerCase();
    
    extractedText.forEach((text, index) => {
        const trimmed = text.trim();
        const context = extractedText.slice(Math.max(0, index - 3), index + 4).join(' ').toLowerCase();
        
        // D'abord vérifier CCDD (Collectif des citoyens pour le développement durable)
        // CCDD apparaît avec "Collectif des citoyens"
        if (trimmed === 'CCDD' && context.includes('collectif') && context.includes('citoyens')) {
            if (!foundOrgs.some(f => f.name === 'CCDD')) {
                foundOrgs.push({
                    name: 'CCDD',
                    textIndex: index,
                    originalText: trimmed
                });
                processedIndices.add(index);
            }
        }
        // Ensuite vérifier CDD (Communication pour un Développement Durable)
        // CDD apparaît avec "Communication pour un" et "Développemenet Durable" (avec faute d'orthographe)
        else if (trimmed === 'CDD' && context.includes('communication') && 
                 (context.includes('développemenet') || context.includes('développement durable'))) {
            if (!foundOrgs.some(f => f.name === 'CDD')) {
                foundOrgs.push({
                    name: 'CDD',
                    textIndex: index,
                    originalText: trimmed
                });
                processedIndices.add(index);
            }
        }
        // Pour les autres organisations
        else if (!processedIndices.has(index)) {
            Object.keys(orgMapping).forEach(orgKey => {
                if (trimmed.toLowerCase() === orgKey.toLowerCase() || 
                    (trimmed.toLowerCase().includes(orgKey.toLowerCase()) && 
                     orgKey !== 'CCDD' && orgKey !== 'CDD' && 
                     orgKey !== 'Communication pour un' && orgKey !== 'Développemenet Durable')) {
                    if (!foundOrgs.some(f => f.name === orgMapping[orgKey] && f.textIndex === index)) {
                        foundOrgs.push({
                            name: orgMapping[orgKey],
                            textIndex: index,
                            originalText: trimmed
                        });
                        processedIndices.add(index);
                    }
                }
            });
        }
    });
    
    console.log('📋 Organisations trouvées dans le document:');
    foundOrgs.forEach((org, index) => {
        console.log(`   ${index + 1}. ${org.name} (${org.originalText})`);
    });
    
    console.log(`\n🖼️  Ordre des images dans le document: ${imageOrder.length} images`);
    imageOrder.forEach((img, index) => {
        console.log(`   ${index + 1}. ${img}`);
    });
    
    // Faire correspondre les images aux organisations
    console.log('\n🔗 Correspondance images -> organisations:\n');
    const matches = [];
    
    // Les images sont généralement dans le même ordre que les organisations
    foundOrgs.forEach((org, index) => {
        if (index < imageOrder.length) {
            const imageFile = imageOrder[index];
            const sourcePath = path.join(IMAGES_DIR, imageFile);
            
            if (fs.existsSync(sourcePath)) {
                // Générer le nom de fichier normalisé
                const normalizedName = org.name
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/'/g, '')
                    .replace(/[^a-z0-9-]/g, '');
                
                const ext = path.extname(imageFile);
                const targetName = `${normalizedName}${ext}`;
                const targetPath = path.join(IMAGES_DIR, targetName);
                
                matches.push({
                    org: org.name,
                    source: imageFile,
                    target: targetName,
                    sourcePath,
                    targetPath
                });
                
                console.log(`   ${index + 1}. ${org.name}`);
                console.log(`      📥 Source: ${imageFile}`);
                console.log(`      📤 Cible: ${targetName}`);
            }
        }
    });
    
    console.log('\n💾 Voulez-vous renommer les fichiers ?');
    console.log('   Les fichiers seront copiés avec les nouveaux noms (les originaux seront conservés)');
    
    // Copier les fichiers avec les nouveaux noms
    let copied = 0;
    matches.forEach(match => {
        try {
            if (!fs.existsSync(match.targetPath)) {
                fs.copyFileSync(match.sourcePath, match.targetPath);
                console.log(`   ✅ Copié: ${match.target} pour ${match.org}`);
                copied++;
            } else {
                console.log(`   ⚠️  Existe déjà: ${match.target}`);
            }
        } catch (e) {
            console.error(`   ❌ Erreur pour ${match.org}: ${e.message}`);
        }
    });
    
    console.log(`\n✨ ${copied} fichiers copiés avec succès!`);
    console.log('📂 Les fichiers originaux sont conservés dans le dossier');
    
} catch (e) {
    console.error(`❌ Erreur: ${e.message}`);
    console.error(e.stack);
    process.exit(1);
}
