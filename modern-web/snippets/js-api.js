document.body.innerHTML = '<h1>Hallo</h1>'
const h = document.querySelector('h1')
h.id = 'foo'
h.id
h.addEventListener('mouseover', console.log)

document.body.innerHTML = '<textarea>Hallo</textarea>'
document.querySelector('textarea').value