class StoryApi {

    constructor(port){
        this.baseURL = `${port}/stories`
    }

    getStories(){
        // fetch(this.baseURL)
        fetch('http://localhost:3000/stories')
        .then(resp => resp.json())
        .then(json => {
            json["data"].forEach(element => {
                // console.log(element)
                const s = new Story({id: element.id, ...element.attributes})
                s.addToDropDown('#story-list')
                s.addToDropDown('#characterStoryInput')
                s.addToDropDown('#ppStoryInput')
            })
        })
    }

    createStory(){
        const storyInfo = {
            story: {
                title: titleInput.value,
                summary: summaryInput.value,
                genre: genreInput.value
            }
        }

        const configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(storyInfo)
        }

        fetch('http://localhost:3000/stories', configObj)
        .then(r => r.json())
        .then(json => {
            const s = new Story({id: json.data.id, ...json.data.attributes})
            s.addToDropDown('#story-list')
            s.addToDropDown('#characterStoryInput')
            s.addToDropDown('#ppStoryInput')
            s.showStory()
        })
    }

}