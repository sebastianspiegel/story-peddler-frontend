class CharacterApi {

    constructor(port){
        this.baseURL = `${port}/characters`
    }

    getCharacters(storyId){
        fetch(this.baseURL)
        .then(resp => resp.json())
        .then(json => {
            json["data"].forEach(element => {
                const c = new Character({id: element.id, ...element.attributes})
                if(c.story_id === parseInt(storyId)){
                    console.log(c)
                    c.showCharacters()
                }
            })
        })
    }

    createCharacter(){
        const characterInfo = {
            name: nameInput.value,
            description: descriptionInput.value,
            story_id: characterStoryInput.value
        }

        const configObj = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(characterInfo)
        }

        fetch(this.baseURL, configObj)
        .then(resp => resp.json())
        .then(json => {
            const c = new Character({id: json.data.id, ...json.data.attributes})
            // if(document.querySelector('#storyTitle') === c.story_id){
            //     c.showCharacters()
            // }
        })
    }

}