class Character {
    static all = []

    constructor({id, name, description, story_id}){
        this.id = id
        this.name = name
        this.description = description
        this.story_id = story_id

        Character.all.push(this)
    }
}