import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r'/emoji//', r'/emoji//', text)
text = re.sub(r'src: /emoji/\$\{style\}/\$\{filename\}', r'src: /emoji//', text)
text = re.sub(r'Addition Within  : Subtraction Within ', r'Addition Within  : Subtraction Within ', text)
text = re.sub(r'Number Bonds Within ', r'Number Bonds Within ', text)
text = re.sub(r'header_name_date_', r'header_name_date_', text)
text = re.sub(r'header_title_', r'header_title_', text)
text = re.sub(r'id: 	ext_', r'id: 	ext__', text)
text = re.sub(r'id: img_', r'id: img__', text)
text = re.sub(r'id: prob_', r'id: prob__', text)
text = re.sub(r'	ext_', r'	ext_', text)
text = re.sub(r'img_', r'img_', text)
text = re.sub(r'prob_', r'prob_', text)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
print('Fixed!')
