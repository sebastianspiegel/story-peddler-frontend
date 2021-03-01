class Character {
    static all = []

    constructor({id, name, description, story_id}){
        this.id = id
        this.name = name
        this.description = description
        this.story_id = story_id

        Character.all.push(this)
    }

    showCharacters(){
        let characterList = document.querySelector('#storyCharacters')
        characterList.reset

        let newLi = document.createElement('li')
        newLi.className = "list-group-item flex-column align-items-start"
        newLi.id = `${this.name}-${this.story_id}`

        let newDiv = document.createElement('div')
        newDiv.className = "d-flex w-100 justify-content-between"

        let charName = document.createElement('h5')
        charName.className = "mb-1"
        charName.id = `${this.id}-editName`
        charName.innerText = this.name

        let charDes = document.createElement('p')
        charDes.className = "mb-1"
        charDes.id = `${this.id}-editDes`
        charDes.innerText = this.description

        characterList.append(newLi)
        newLi.append(newDiv)
        newDiv.append(charName)
        newLi.append(charDes)

    }

    characterButtons(){
        let char = document.getElementById(`${this.name}-${this.story_id}`)


        let charEdit = document.createElement('button')
        charEdit.className = "btn btn-outline-primary btn-sm"
        charEdit.type = "button"
        charEdit.id = `${this.id}-edit`
        charEdit.value = "Edit"
        charEdit.innerText = "Edit"
        charEdit.setAttribute('hidden', '')
        charEdit.addEventListener('click', (event) => {
            this.editCharacter(event)
        })

        let charDelete = document.createElement('button')
        charDelete.className = "btn btn-outline-danger btn-sm"
        charDelete.type = "button"
        charDelete.id = `${this.id}-delete`
        charDelete.innerText = "Delete"
        charDelete.setAttribute('hidden', '')
        charDelete.addEventListener('click', () => {
            console.log(`deleted ${this.name}`)
            this.deleteCharacter();
        })

        char.append(charEdit)
        char.append(charDelete)

        //glitch: this function is only being called the first time before reappending the dom? 
        let editButton = document.getElementById('editButton')
        editButton.addEventListener('click', () => {
            if (editButton.innerText === "Save") {
                this.showButtons();
                console.log('show character edit')
            } else {
                this.hideButtons();
                console.log('hide character edit')
            }
        })
    }

    editCharacter(event){
        let charEdit = event.target
        let name = document.getElementById(`${this.id}-editName`) 
        let des = document.getElementById(`${this.id}-editDes`)

        if (charEdit.innerText === "Edit") {
            charEdit.innerText = "Save"
            charEdit.className = "btn btn-outline-success btn-sm"
            name.outerHTML = `<input type="text" class="mb-1" id="${this.id}-editName" value="${this.name}">`
            des.outerHTML = `<input size="75" type="text" id="${this.id}-editDes" value="${this.description}">`
            // des.outerHTML = `<textarea rows="3" type="text" id="${this.id}-editDes">`
            // des.innerHTML = this.description
        } else {
            charEdit.className = "btn btn-outline-primary btn-sm"
            charEdit.innerText = "Edit"
            this.name = name.value
            this.description = des.value
            name.outerHTML = `<h5 class="mb-1" id="${this.id}-editName">`
            des.outerHTML = `<p class="mb-1" id="${this.id}-editDes">`
            characterApi.sendPatch(this);
            this.updateCharacter();
        }
    }

    updateCharacter(){
        let newName = document.getElementById(`${this.id}-editName`) 
        let newDes = document.getElementById(`${this.id}-editDes`)

        newName.textContent = this.name
        newDes.textContent = this.description
    }

    showButtons(){
        let char = document.getElementById(`${this.name}-${this.story_id}`)
        char.children[2].removeAttribute('hidden')
        char.children[3].removeAttribute('hidden')
    }

    hideButtons(){
        let char = document.getElementById(`${this.name}-${this.story_id}`)
        char.children[2].setAttribute('hidden', '')
        char.children[3].setAttribute('hidden', '')
    }

    deleteCharacter(){
        let char = document.getElementById(`${this.name}-${this.story_id}`)
        let chars = document.getElementById('storyCharacters')
        chars.removeChild(char)
        characterApi.deleteCharacter(this.id)
    }

}