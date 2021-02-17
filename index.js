// const port = 'http://localhost:3000'

const storyApi =  new StoryApi()

const newStory = document.querySelector('#new-story-button');
const newStoryForm = document.querySelector('#new-story-form')
const newCharacter = document.querySelector('#new-character-button');
const newPP = document.querySelector('#new-pp-button')

newStory.addEventListener('click', () => {
    document.querySelector('#new-story-form').removeAttribute('hidden')
    newStoryForm.addEventListener('submit', (event) => {
        handleStorySubmit(event);
    })
})

newCharacter.addEventListener('click', () => {
    document.querySelector('#new-character-form').removeAttribute('hidden')
    document.querySelector('#submit-new-character').addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#new-character-name').value = ""
        document.querySelector('#new-character-description').value = ""
        document.querySelector('#new-character-form').setAttribute('hidden', '')
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

storyApi.getStories();