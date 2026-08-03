const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

code = code.replace(/className=\{ tn-icon /g, 'className={tn-icon ');
code = code.replace(/className=\{ tn-icon/g, 'className={tn-icon');
code = code.replace(/showGrid \? 'active' : ''\}/g, "showGrid ? 'active' : ''}}");
code = code.replace(/showAnswers \? 'active text-danger' : ''\}/g, "showAnswers ? 'active text-danger' : ''}}");
code = code.replace(/selectedText.isBold \? 'active' : ''\}/g, "selectedText.isBold ? 'active' : ''}}");
code = code.replace(/selectedText.isItalic \? 'active' : ''\}/g, "selectedText.isItalic ? 'active' : ''}}");
code = code.replace(/selectedText.isUnderline \? 'active' : ''\}/g, "selectedText.isUnderline ? 'active' : ''}}");
code = code.replace(/selectedText.align === 'left' \? 'active' : ''\}/g, "selectedText.align === 'left' ? 'active' : ''}}");
code = code.replace(/selectedText.align === 'center' \? 'active' : ''\}/g, "selectedText.align === 'center' ? 'active' : ''}}");
code = code.replace(/selectedText.align === 'right' \? 'active' : ''\}/g, "selectedText.align === 'right' ? 'active' : ''}}");
code = code.replace(/selectedImage.grayscale \? 'active' : ''\}/g, "selectedImage.grayscale ? 'active' : ''}}");

fs.writeFileSync('src/App.jsx', code);
