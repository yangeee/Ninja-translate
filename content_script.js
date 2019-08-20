function Panel() {
  this.createPanel()
  this.bind()
}

Panel.prototype.createPanel = function() {
  let container = document.createElement('div')
  container.id = 'ninja-translate'
  container.style = ` position: fixed;z-index: 99999;left:0px;top:0px;`
  let html = `
    <div class="ninja_panel">
    <header>Ninja-translate <span class="ninja_translate_close">X</span></header>
    <main>
      <div class="ninja_translate_source">
        <div class="ninja_translate_title">英语</div>
        <div class="ninja_translate_content"></div>
      </div>
      <div class="ninja_translate_target">
        <div class="ninja_translate_title">简体中文</div>
        <div class="ninja_translate_content"></div>
      </div>
    </main>
  </div>
    `
  container.innerHTML = html
  document.body.appendChild(container)
  this.container = container
  this.panel = container.querySelector('.ninja_panel')
  this.sourceContent = container.querySelector('.ninja_translate_source .ninja_translate_content')
  this.close = container.querySelector('.ninja_translate_close')
  this.targetContent = container.querySelector('.ninja_translate_target .ninja_translate_content')
}

Panel.prototype.bind = function() {
  this.close.onclick = () => {
    this.panel.classList.remove('show')
    setTimeout(() => {
      this.hide()
    }, 400)
  }
}

Panel.prototype.moveTo = function(x, y) {
  this.container.style.transform = `translateX(${x}px) translateY(${y}px)`
}

Panel.prototype.translate = function(str) {
  this.sourceContent.innerHTML = str
  fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=${str}`
  )
    .then(res => res.json())
    .then(result => {
      this.targetContent.innerText = result[0][0][0]
    })
}

Panel.prototype.show = function() {
  this.container.style.display = 'block'
  setTimeout(() => {
    this.panel.classList.add('show')
  }, 0)
}
Panel.prototype.hide = function() {
  this.container.style.display = 'none'
}

Panel.prototype.isShow = function() {
  return (window.getComputedStyle(this.container).display = 'block')
}

let panel = new Panel()



document.onmouseup = function(e) {
  let str = document
    .getSelection()
    .toString()
    .trim()
  if (str === '') return
  panel.translate(str)
  panel.moveTo(e.clientX, e.clientY)
  panel.show()
}
