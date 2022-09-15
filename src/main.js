import fs from "fs";
import { compile } from "./compiler.js";

const fileName = process.argv[process.argv.length - 1];

if (fileName.endsWith('.кзк2') || fileName.endsWith('.kzk2')) {
    const fileNameWithoutExt = fileName.split('.').slice(0, -1).join('.');

    fs.readFile(fileName, 'utf-8', (readError, source) => {
        if (readError) {
            console.error(readError);
            return;
        }

        const bytes = compile(source);

        fs.writeFile(fileNameWithoutExt, bytes, (writeError) => {
            if (writeError) {
                console.error(writeError);
                return;
            }

            fs.chmodSync(fileNameWithoutExt, 0o755);
        });
    });
} else {
    console.error('Please, provide valid file name.');
}
