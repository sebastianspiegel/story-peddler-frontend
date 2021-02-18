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
        option.id = this.id
        option.innerText = this.title
        dropdown.append(option)
    }

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
        let jumbotron = document.querySelector('.jumbotron')
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
        // document.querySelector('#storyTitle').innerText = this.title
        // document.querySelector('#storyTitle').dataset.id = this.id 

        let genre = document.createElement('h6')
        genre.id = "storyGenre"
        genre.innerText = this.genre 
        storyInfo.append(genre)
        storyInfo.append(lineBreak2)
        // document.querySelector('#storyGenre').innerText = this.genre

        let summary = document.createElement('h5')
        summary.id = "storySummary"
        summary.innerText = this.summary
        storyInfo.append(summary)
        storyInfo.append(lineBreak1)
        // document.querySelector('#storySummary').innerText = this.summary

        document.querySelector('#storyCharacters').innerHTML = ""
        characterApi.getCharacters(this.id); 

        editButton.addEventListener('click', () => {
            this.editStory();
        })
        deleteButton.addEventListener('click', () => {
            this.deleteStory();
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
        editButton.removeAttribute('hidden')
        saveButton.setAttribute('hidden', '')
        storyApi.sendPatch(this)
        this.showStory()
    }

    deleteStory(){
        console.log('in the delete funciton')
    }

}

