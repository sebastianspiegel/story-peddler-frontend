class Story{
    static all = []

    constructor({id, title, summary, genre}){
        this.id = id
        this.title = title
        this.summary = summary
        this.genre = genre

        Story.all.push(this)
    }

    addToMainDropdown(){
        const mainDropdown = document.querySelector('#story-list')
        const option = document.createElement('option')
        option.value = this.id
        option.innerText = this.title
        mainDropdown.append(option)
    }
}

