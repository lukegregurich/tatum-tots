const app = {
    init(selectors) { // same as init: function(selectors)
        this.max = 0;
        this.list = document.querySelector(selectors.listSelector)
        this.flicks = []
        this.template = document.querySelector(selectors.templateSelector)
        //console.log(this.delButton)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', (ev) => {
                ev.preventDefault()
                this.handleSubmit(ev)
            })
    },

    removeFlick(ev){
       const item = ev.target.closest('.flick')
       item.remove() //removes item from the DOM
    },

    renderListItem(flick){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        item
            .querySelector('.flickName')
            .textContent = flick.name

        item   
            .querySelector('.remove.button')
            .addEventListener('click', this.removeFlick)
        return item
    },

    handleSubmit(ev){
        const f = ev.target
        const flick = {
            id: ++this.max, 
            name: f.flickName.value,
        }

        this.flicks.unshift(flick) //push to array

        //adding it to the DOM
        const item = this.renderListItem(flick)
        //this.list.appendChild(item)
        this.list.insertBefore(item, this.list.firstElementChild)
        f.reset()
    },
}

app.init({
    formSelector: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template', //matches any class with both flick and template elements
})