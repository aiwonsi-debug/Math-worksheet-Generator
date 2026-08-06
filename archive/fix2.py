import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = re.sub(r'src: /emoji//', r'src: /emoji//', text)
text = re.sub(r'titleText = operator === \'\+\' \? Addition Within  : Subtraction Within ;', r'titleText = operator === \'+\' ? Addition Within  : Subtraction Within ;', text)
text = re.sub(r'Number Bonds Within ', r'Number Bonds Within ', text)
text = re.sub(r'id: header_name_date_', r'id: header_name_date_', text)
text = re.sub(r'id: header_title_', r'id: header_title_', text)
text = re.sub(r'id: 	ext_', r'id: 	ext_', text)
text = re.sub(r'id: img_', r'id: img_', text)
text = re.sub(r'id: clip_', r'id: clip__', text)
text = re.sub(r'text_\+_\+', r'	ext__', text)
text = re.sub(r'img_\+_\+', r'img__', text)
text = re.sub(r'prob_\+_\+', r'prob__', text)

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
print('Fixed!')
