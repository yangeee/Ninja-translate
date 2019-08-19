function Panel() {
    this.createPanel()
    this.bind()
}

Panel.prototype.createPanel = function () {
    let container = document.createElement('div')
    container.id = 'translate-panel'
    let html = `
    <header>
        <h1></h1><span class="close">X</span>
    </header>
    <main></main>
    `
    container.innerHTML = html
    document.body.appendChild(container)
    this.container = container
    this.source = container.querySelector('h1')
    this.close = container.querySelector('.close')
    this.target = container.querySelector('main')
}

Panel.prototype.bind = function () {
    this.close.onclick = ()=>{
        this.hide()
    }
}

Panel.prototype.moveTo = function (x,y) {
    this.container.style.left = x + 'px'
    this.container.style.top = y + 'px'
}

Panel.prototype.translate = function (str) {
    this.source.innerHTML = str
    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=t&q=${str}`)
    .then(res=>res.json())
    .then(result =>{
        console.log(result)
        this.target.innerText = result[0][0][0]
    })
}

Panel.prototype.show = function () {
    this.container.style.display = 'block'
}
Panel.prototype.hide = function () {
    this.container.style.display = 'none'
}

Panel.prototype.isShow = function () {
    return window.getComputedStyle(this.container).display = 'block'
}

let panel = new Panel()

document.onmouseup = function (e) {
    let str = document.getSelection().toString().trim()
    if(str === '') return 
    panel.translate(str)
    panel.moveTo(e.pageX,e.pageY)
    panel.show()
}