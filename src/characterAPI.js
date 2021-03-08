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
                    // console.log(c)
                    c.showCharacters()
                    c.characterButtons()
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
            if(json.message){
                alert(json.message)
            } else {
                const c = new Character({id: json.data.id, ...json.data.attributes})
                if(parseInt(document.querySelector('#storyTitle').dataset.id) === c.story_id){ 
                    c.showCharacters()
                    c.characterButtons()
                }
            }
        })
    }

    sendPatch = (character) => {
        let {name, description, story_id} = character
        const characterInfo = {
            name,
            description,
            story_id
        }
        
        const configObj = {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(characterInfo)
        }

        fetch(`${this.baseURL}/${character.id}`, configObj)
        .then(resp => resp.json())
        .then(json => {
            if(json.message){
                alert(json.message)
            } 
        })
    }

    deleteCharacter = (id) => {

        const configObj = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        }

        fetch(`${this.baseURL}/${id}`, configObj)
        .then(resp => resp.json())
        .then(json => alert(json.message))
    }

}