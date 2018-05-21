class App {
    constructor(selectors) { // same as init: function(selectors)
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
    }

    removeFlick(flick, ev){
        //removes item from the DOM
        const item = ev.target.closest('.flick') //ev.target points to the button
        item.remove() 

        //removes item from the array
        const i = this.flicks.indexOf(flick)
        this.flicks.splice(i , 1)
    }

    favFlick(flick, ev){
        const item = ev.target.closest('.flick')
        //item.classList.toggle('fav')
        flick.fav = item.classList.toggle('fav')
    }

    toggleEditable(flick, ev) {
        const item = ev.target.closest('.flick')
        const btn = item.querySelector('.edit.button')
        const nameField = item.querySelector('.flickName')
    
        if (nameField.isContentEditable) {
          // make it no longer editable
          nameField.contentEditable = false
          btn.textContent = 'edit'
          btn.classList.remove('success')
    
          // save changes
          flick.name = nameField.textContent
        } else {
          // make it editable
          nameField.contentEditable = true
          nameField.focus()
          btn.textContent = 'save'
          btn.classList.add('success')
        }
      }

    saveOnEnter(flick, ev){
        if (ev.key === 'Enter'){
            this.toggleEditable(flick)
        }
    }

    renderListItem(flick){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = flick.id
        const nameSpan = item.querySelector('.flickName')
        nameSpan.textContent = flick.name
        nameSpan.addEventListener(
            'keypress', this.saveOnEnter.bind(this, flick)
        )

        item   
            .querySelector('.remove.button')
            .addEventListener('click', this.removeFlick.bind(this, flick))
            //"this" refers to the entire app object

        item   
            .querySelector('.fav.button')
            .addEventListener('click', this.favFlick.bind(this, flick))

        item
            .querySelector('.edit.button')
            .addEventListener(
              'click',
              this.toggleEditable.bind(this, flick)
            )
        return item
    }

    handleSubmit(ev){
        const f = ev.target
        const flick = {
            id: ++this.max, 
            name: f.flickName.value,
            fav: false,
        }

        this.flicks.unshift(flick) //push to array

        //adding it to the DOM
        const item = this.renderListItem(flick)
        //this.list.appendChild(item)
        this.list.insertBefore(item, this.list.firstElementChild)
        f.reset()
    }
}

const app = new App({
    formSelector: '#flickForm',
    listSelector: '#flickList',
    templateSelector: '.flick.template', //matches any class with both flick and template elements
})
