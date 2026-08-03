import base64

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace('src = data:image/svg+xml;base64,;', 'src = data:image/svg+xml;base64,;')
text = text.replace('titleText = operator === \'+\' ? `Addition Within  ` : `Subtraction Within  `;', 'titleText = operator === \'+\' ? Addition Within  : Subtraction Within ;')
text = text.replace('titleText = `Number Bonds Within  `;', 'titleText = Number Bonds Within ;')
text = text.replace('{ id: `header_name_date_`', '{ id: header_name_date_')
text = text.replace('{ id: `header_title_`', '{ id: header_title_')
text = text.replace('newId = `text_`', 'newId = 	ext__')
text = text.replace('newId = `img_`', 'newId = img__')
text = text.replace('newId = `prob_`', 'newId = prob__')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(text)
print('Fixed!')
