class Story{
    static all = []

    constructor({id, title, summary, genre}){
        this.id = id
        this.title = title
        this.summary = summary
        this.genre = genre

        Story.all.push(this)
    }

    addToDropDown(elementID){
        const dropdown = document.querySelector(elementID)
        const option = document.createElement('option')
        option.value = this.id
        option.id = this.title
        option.innerText = this.title
        dropdown.append(option)
    }

    // nav bar select story
    static addEL(){
        document.querySelector('#story-list').addEventListener('change', event => {
            let storyId = event.target.value
            for(const story of Story.all){
                if(story.id === storyId){
                    story.showStory()
                }
            }
        })
    }

    showStory(){
        //MAKE SEPERATE FUNCTIONS 
        jumbotron.removeAttribute('hidden')
        let lineBreak1 = document.createElement('hr')
        lineBreak1.className = "my-4"
        let lineBreak2 = document.createElement('hr')
        lineBreak2.className = "my-4"
        let storyInfo = document.querySelector('.storyInfo')

        storyInfo.innerHTML = ""

        let title = document.createElement('h1')
        title.className = "display-3"
        title.id = "storyTitle"
        title.innerText = this.title
        title.dataset.id = this.id 
        storyInfo.append(title)


        let genre = document.createElement('h6')
        genre.id = "storyGenre"
        genre.innerText = this.genre 
        storyInfo.append(genre)
        storyInfo.append(lineBreak2)

        let summary = document.createElement('h5')
        summary.id = "storySummary"
        summary.innerText = this.summary
        storyInfo.append(summary)
        storyInfo.append(lineBreak1)

        document.querySelector('#storyCharacters').innerHTML = ""
        characterApi.getCharacters(this.id); 

        let ppList = document.querySelector('#plot-points')
        ppList.innerHTML = ""
        let header = document.createElement('li')
        header.className = "list-group-item list-group-item-action active"
        header.innerText = "Plot Points:"
        ppList.append(header)
        plotpointApi.getPlotPoints(this.id)

        this.addButtons();
    }

    addButtons(){
        buttons.innerHTML = ""

        let editButton = document.createElement('button')
        editButton.className = "btn btn-outline-primary"
        editButton.id = "editButton"
        editButton.type = "button"
        editButton.innerText = "Edit"
        buttons.append(editButton)
        editButton.addEventListener('click', () => {
            this.editStory();
        })

        let saveButton = document.createElement('button')
        saveButton.className = "btn btn-outline-success"
        saveButton.id = "saveButton"
        saveButton.type = "button"
        saveButton.innerText = "Save"
        saveButton.setAttribute('hidden', '')
        buttons.append(saveButton)


        let deleteButton = document.createElement('button')
        deleteButton.className = "btn btn-outline-danger"
        deleteButton.id = "deleteButton"
        deleteButton.type = "button"
        deleteButton.innerText = "Delete"
        buttons.append(deleteButton)
        deleteButton.addEventListener('click', () => {
            if (window.confirm("Are you sure you want to delete this story and all related characters?")){
                this.deleteStory();
            }
        })
    }

    editStory(){
        editButton.setAttribute('hidden', '')
        saveButton.removeAttribute('hidden')
        document.querySelector('#storyTitle').outerHTML = `<input type="text" class="form-control" value="${this.title}" id="storyTitle">`
        document.querySelector('#storySummary').outerHTML = `<input type="text" class="form-control" rows="3" value="${this.summary}" id="storySummary">`
        document.querySelector('#storyGenre').outerHTML = `<input type="text" class="form-control" value="${this.genre}" id="storyGenre">`
        saveButton.addEventListener('click', () => {
            // this.showStory()
            let updateTitle = document.querySelector('#storyTitle').value
            let updateGenre = document.querySelector('#storyGenre').value
            let updateSummary = document.querySelector('#storySummary').value
            // console.log(updateTitle, updateGenre, updateSummary)
            this.saveEdit(updateTitle, updateGenre, updateSummary)
        })
    }

    saveEdit(title, genre, summary){
        this.title = title
        this.genre = genre
        this.summary = summary
        editButton.parentNode.removeChild(editButton)
        deleteButton.parentNode.removeChild(deleteButton)
        saveButton.parentNode.removeChild(saveButton)
        storyApi.sendPatch(this)
        this.showStory()
    }

    deleteStory(){
        document.querySelector('.storyInfo').innerHTML = ""

        this.removeFromDropdown('#story-list')
        this.removeFromDropdown('#characterStoryInput')
        this.removeFromDropdown('#ppStoryInput')
        storyApi.deleteStory(this.id)
        jumbotron.setAttribute('hidden', '')
    }

    removeFromDropdown(elementID){
        let dropdown = document.querySelector(elementID)
        for (let i = 0; dropdown.options.length > i; i++) {
            if(dropdown.options[i].id === this.title){
                dropdown.remove(i)
            }
        }
    }

}

