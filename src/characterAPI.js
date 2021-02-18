class CharacterApi {

    constructor(port){
        this.baseURL = `${port}/characters`
    }

    getCharacters(){
        fetch('http://localhost:3000/characters')
        .then(resp => resp.json())
        .then(json => {
            console.log(json)
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

        fetch('http://localhost:3000/characters', configObj)
        .then(resp => resp.json())
        .then(json => {
            const c = new Character({id: json.data.id, ...json.data.attributes})
        })
    }

}