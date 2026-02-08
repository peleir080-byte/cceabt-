const fs = require('fs');
const path = require('path');

const DIR = 'temp_docx';

function listDir(dir) {
    if (!fs.existsSync(dir)) {
        console.log(`Directory ${dir} does not exist`);
        return;
    }
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            console.log(`DIR: ${fullPath}`);
            listDir(fullPath);
        } else {
            console.log(`FILE: ${fullPath}`);
        }
    });
}

listDir(DIR);
