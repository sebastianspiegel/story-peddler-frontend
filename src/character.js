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
        // debugger
        let characterList = document.querySelector('#storyCharacters')
        characterList.reset

        let newLi = document.createElement('li')
        newLi.className = "list-group-item flex-column align-items-start"

        let newDiv = document.createElement('div')
        newDiv.className = "d-flex w-100 justify-content-between"

        let charName = document.createElement('h5')
        charName.className = "mb-1"
        charName.innerText = this.name

        let charDes = document.createElement('p')
        charDes.className = "mb-1"
        charDes.innerText = this.description
        
        characterList.append(newLi)
        newLi.append(newDiv)
        newDiv.append(charName)
        newLi.append(charDes)
    }
}