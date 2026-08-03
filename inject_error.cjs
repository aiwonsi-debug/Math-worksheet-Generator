const fs = require('fs');
let index = fs.readFileSync('index.html', 'utf8');
index = index.replace('<body>', '<body>\n    <div id="error-boundary" style="color:red;font-family:monospace;padding:20px;white-space:pre-wrap;z-index:9999;position:relative;"></div>\n    <script>\n      window.onerror = function(msg, src, lineno, colno, err) {\n        document.getElementById("error-boundary").innerText += "\\nERROR: " + msg + "\\n" + (err && err.stack ? err.stack : "");\n      };\n      window.onunhandledrejection = function(e) {\n        document.getElementById("error-boundary").innerText += "\\nPROMISE REJECTION: " + e.reason;\n      };\n    </script>');
fs.writeFileSync('index.html', index);
