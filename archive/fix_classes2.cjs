const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// Replace any backspace characters and corrupted template literals
code = code.replace(/\{[\x00-\x1F]*tn-icon(.*?)\}/g, '{\tn-icon \}');
code = code.replace(/btn-icon \\}/g, "btn-icon}");
code = code.replace(/btn-icon(.*?)\\}/g, "btn-icon }");
code = code.replace(/\}/g, '}');

// Let's just blindly replace them if they match  tn-icon with backspace
code = code.replace(/\x08tn-icon/g, 'tn-icon');

fs.writeFileSync('src/App.jsx', code);
