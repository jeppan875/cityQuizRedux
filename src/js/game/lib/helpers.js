let replaceAll = function (str, target, replacement) {
  return str.split(target).join(replacement)
}

let recreateMain = function (template) {
  let main = document.querySelector('main')
  let wrapper = document.querySelector('#wrapper')
  wrapper.removeChild(main)
  let footer = document.querySelector('footer')
  wrapper.insertBefore(document.createElement('main'), footer)
  main = document.querySelector('main')
  main.appendChild(template.content.cloneNode(true))
}

exports.replaceAll = replaceAll
exports.recreateMain = recreateMain
