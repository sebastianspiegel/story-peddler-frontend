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
        if (dropdown.id === 'story-list') {
            dropdown.addEventListener('change', this.handleStorySelect)
        }
    }

    handleStorySelect = (event) => {
        let storyId = event.target.value
        for(const story of Story.all){
            if(story.id === storyId){
                story.showStory()
            }
        }
    }

    showStory(){
        document.querySelector('.jumbotron').removeAttribute('hidden')
        document.querySelector('#storyTitle').innerText = this.title
        document.querySelector('#storySummary').innerText = this.summary
        document.querySelector('#storyGenre').innerText = this.genre
    }
}

