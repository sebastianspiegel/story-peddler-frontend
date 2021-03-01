const port = `http://localhost:3000`

const storyApi =  new StoryApi(port)
const characterApi = new CharacterApi(port)
const plotpointApi = new PlotPointApi(port)

const newStory = document.querySelector('#new-story-button');
const newStoryForm = document.querySelector('#new-story-form')
const newCharacter = document.querySelector('#new-character-button');
const newCharacterForm = document.querySelector('#new-character-form')
const newPP = document.querySelector('#new-pp-button')
const newPPForm = document.querySelector('#new-pp-form')

const jumbotron = document.querySelector('.jumbotron')
const storyInfo = document.querySelector('.storyInfo')
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
    newPPForm.addEventListener('submit', (event) => {
        handlePPSubmit(event)
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

function handlePPSubmit(pp){
    pp.preventDefault();
    newPPForm.setAttribute('hidden', '')
    plotpointApi.createPlotPoint()
    pp.target.reset()
}

// function sortPlotPoints(unsortedPP){  }

let _el;

function dragOver(e) {
  if (isBefore(_el, e.target))
    e.target.parentNode.insertBefore(_el, e.target);
  else
    e.target.parentNode.insertBefore(_el, e.target.nextSibling);
}

function dragStart(e) {
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", null); 
  _el = e.target;
}

function isBefore(el1, el2) {
  if (el2.parentNode === el1.parentNode)
    for (var cur = el1.previousSibling; cur && cur.nodeType !== 9; cur = cur.previousSibling)
      if (cur === el2)
        return true;
  return false;
}

storyApi.getStories();