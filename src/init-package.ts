import fs from "fs";

let installDir = import.meta.url.replace('init-package.js', '').replace('file://', '/');

export default function init(name: string) {
    fs.writeFileSync('./package.json', JSON.stringify({"name":name,"version":"1.0.0","description":"","license":"GPL-3.0","main":"dist/cjs/index.js","module":"dist/mjs/index.js","exports":{".":{"import":"./dist/mjs/index.js","require":"./dist/cjs/index.js"}},"scripts":{"build":"rimraf dist/* && tsc -p tsconfig.json && tsc -p build/tsconfig-cjs.json && node build/scripts/fixup"},"publishConfig":{"access": "public"},"keywords":[],"author":"","devDependencies":{"rimraf":"^5.0.1","tsc":"^2.0.4","typescript":"^5.1.6"}}, null, 4));
    fs.writeFileSync('./.gitignore', 'node_modules/\ndist/\nyarn-error.log');
    fs.writeFileSync('./.npmignore', '.gitignore\ntsconfig.json\nyarn.lock\nyarn-error.log\nbuild/\nsrc/');
    fs.writeFileSync('./tsconfig.json', JSON.stringify({"extends":"./build/tsconfig-base.json","compilerOptions":{"module":"es6","outDir":"dist/mjs","target":"esnext"}}, null, 4));

    fs.copyFileSync(`${installDir}../LICENSE`, './LICENSE');

    fs.mkdirSync('./src');
    fs.writeFileSync('./src/index.ts', '');

    fs.mkdirSync('./build');
    fs.writeFileSync('./build/tsconfig-base.json', JSON.stringify({"$schema":"https://json.schemastore.org/tsconfig","display":"Node 13.2.0","compilerOptions":{"allowJs":true,"allowSyntheticDefaultImports":true,"baseUrl":"../src","declaration":true,"esModuleInterop":true,"inlineSourceMap":false,"lib":["esnext"],"listEmittedFiles":false,"listFiles":false,"moduleResolution":"node","noFallthroughCasesInSwitch":true,"pretty":true,"resolveJsonModule":true,"rootDir":"../src","skipLibCheck":true,"strict":true,"traceResolution":false,"types":["node"],"forceConsistentCasingInFileNames":true},"exclude":["../build","../dist"],"include":["../src"]}, null, 4));
    fs.writeFileSync('./build/tsconfig-cjs.json', JSON.stringify({"extends":"./tsconfig-base.json","compilerOptions":{"module":"commonjs","outDir":"../dist/cjs","target":"es2015"}}, null, 4));

    fs.mkdirSync('./build/scripts');

    const fixup = "const fs = require('fs');\nfs.writeFileSync('./dist/cjs/package.json', '{\"type\": \"commonjs\"}');\nfs.writeFileSync('./dist/mjs/package.json', '{\"type\": \"module\"}');";

    fs.writeFileSync('./build/scripts/fixup.js', fixup);
}