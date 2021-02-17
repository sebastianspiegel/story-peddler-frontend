const newStory = document.querySelector('#new-story-button');
const newCharacter = document.querySelector('#new-character-button');
const newPP = document.querySelector('#new-pp-button')

newStory.addEventListener('click', () => {
    document.querySelector('#new-story-form').removeAttribute('hidden')
    document.querySelector('#submit-new-story').addEventListener('click', (event) => {
        event.preventDefault();
        // handleStorySubmit(event);
        document.querySelector('#titleInput').value = ""
        document.querySelector('#summaryInput').value = ""
        document.querySelector('#new-story-form').setAttribute('hidden', '')
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
