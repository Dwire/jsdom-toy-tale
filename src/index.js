getAllToys().then(displayAllToys)

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


// ******************* Our Code ****************** 

const toyCollection = document.querySelector("#toy-collection")
const toyForm = document.querySelector(".add-toy-form")

toyForm.addEventListener('submit', collectFormData)
toyCollection.addEventListener('click', handleClick)

function getAllToys(){
  return fetch("http://localhost:3000/toys")
  .then(res => res.json())
  // .then(displayAllToys)
}

function createToy(toyObj){
 return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  // .then(toy => addToyToPage(toy))
}

function updateLikeCount(toyId, likeObj){
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(likeObj)
  })
}


function handleClick(e){
  if (e.target.className === 'like-btn'){
    grabAndIncreaseLikeCount(e)
  }
}

function grabAndIncreaseLikeCount(e){
  let likesSpan = e.target.previousElementSibling.querySelector('span')
  let currentLikes = parseInt(likesSpan.innerText)
  let toyId = e.target.parentElement.dataset.id

  currentLikes++

  likesSpan.textContent = currentLikes

  updateLikeCount(toyId, {likes: currentLikes})

}


function displayAllToys(toys){
  toys.forEach(toy => {
    addToyToPage(toy)
  })
}

function addToyToPage(toy){
  const div = document.createElement('div')
  div.className = 'card'
  div.dataset.id = toy.id
  
  div.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p><span>${toy.likes}</span> Likes </p>
    <button class="like-btn">Like <3</button> 
  `


  toyCollection.append(div)
}


function collectFormData(e){
  e.preventDefault()

  const name = e.target.name.value
  const image = e.target.image.value
  const likes = 0

  
  // const toyObj = {name: name, image: image, likes: likes}
  const toyObj = {name, image, likes}
  
  
  createToy(toyObj).then(addToyToPage)
  
}
