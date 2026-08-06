with open('src/App.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('src: /emoji//', 'src: /emoji//')
text = text.replace('`Addition Within ${maxVal}`', 'Addition Within ')
text = text.replace('`Subtraction Within ${maxVal}`', 'Subtraction Within ')
text = text.replace('`Number Bonds Within ${maxVal}`', 'Number Bonds Within ')
text = text.replace('`header_name_date_${pageIdx}`', 'header_name_date_')
text = text.replace('`header_title_${pageIdx}`', 'header_title_')
text = text.replace('`header_name_date_${newPageIdx}`', 'header_name_date_')
text = text.replace('`header_title_${newPageIdx}`', 'header_title_')
text = text.replace('`text_${Date.now()}_${Math.random()}`', '	ext__')
text = text.replace('`img_${Date.now()}_${Math.random()}`', 'img__')
text = text.replace('`prob_${Date.now()}_${Math.random()}`', 'prob__')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
print('Fixed with replace()!')
