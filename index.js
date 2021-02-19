const port = `http://localhost:3000`

const storyApi =  new StoryApi(port)
const characterApi = new CharacterApi(port)

const newStory = document.querySelector('#new-story-button');
const newStoryForm = document.querySelector('#new-story-form')
const newCharacter = document.querySelector('#new-character-button');
const newCharacterForm = document.querySelector('#new-character-form')
const newPP = document.querySelector('#new-pp-button')

const jumbotron = document.querySelector('.jumbotron')
const buttons = document.querySelector('.buttons')

newStory.addEventListener('click', () => {
    document.querySelector('#new-story-form').removeAttribute('hidden')
    newStoryForm.addEventListener('submit', (event) => {
        handleStorySubmit(event);
    })
})

newCharacter.addEventListener('click', () => {
    document.querySelector('#new-character-form').removeAttribute('hidden')
    newCharacterForm.addEventListener('submit', (event) => {
        handleCharacterSubmit(event);
    })
})

newPP.addEventListener('click', () => {
    document.querySelector('#new-pp-form').removeAttribute('hidden')
    document.querySelector('#submit-new-pp').addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#new-pp-description').value = ""
        document.querySelector('#new-pp-form').setAttribute('hidden', '')
    })
})

function handleStorySubmit(story){
    story.preventDefault();
    newStoryForm.setAttribute('hidden', '');
    storyApi.createStory();
    story.target.reset()
}

function handleCharacterSubmit(character){
    character.preventDefault();
    newCharacterForm.setAttribute('hidden', '');
    characterApi.createCharacter()
    character.target.reset();
}

storyApi.getStories();