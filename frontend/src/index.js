const BASE_URL = "http://localhost:3000"
const ANIMAL_URL = `${BASE_URL}/animals`
const USERS_URL = `${BASE_URL}/users`
const FAVORITES_URL = `${BASE_URL}/comments`
const animal = document.querySelector('#animal-collection')
const favCollection = document.querySelector('#fav-collection')
const likeButton = document.querySelector('.like-btn')
const signupForm = document.querySelector('#signup-form')
const signupInputs = document.querySelectorAll(".signup-input")
const header = document.querySelector('.header-banner')
const logout = document.querySelector('.logout')


function fetchUsers(){
    fetch(`${BASE_URL}/users`)
    .then( resp => resp.json())
    .then(users => {
        for (const user of users){
            
            let u = new User(user.id, user.username, user.email, user.password)
            u.renderUser();
        }
    })
}





  function usersFormSubmission(){
      event.preventDefault();
      let username = document.getElementById("username").value
      let email = document.getElementById("email").value
      let password = document.getElementById("password").value
      console.log(username, email, password)

      let user = {
          username: username,
          email: email,
          password: password
      }

      fetch(`${BASE_URL}/users`, {
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'

          },
          body: JSON.stringify(user)
      })
      .then(resp => resp.json())
      .then(user => {
          let u = new User(user.id, user.username, user.email, user.password)
          u.renderUser();
      })
    }


function putanimalsOnDom(an){
    animal.innerHTML = `<h2 class="subheader">Animals</h2>
                                <h4 class="favorites-link">View My Favorites ♡</h4>`
    an.forEach(a => {
        
        let an= new Animal(a)
        animal.innerHTML += an.render()
    })
}

function putFavoritesOnDom(favArray){
    favCollection.innerHTML = `<h2 class="subheader">My Favorites</h2>
                               <h4 class="back-link">←Back</h4>`
    favArray.forEach(favorite => {
        favCollection.innerHTML += `<div class="card">
          <h2>${favorite.animal.age} ($${favorite.animal.breed})</h2>
          <img src=${favorite.animal.img_src} class="animal-image" /></a>
          <p>${favorite.animal.description}<p>
          <button data-animal-id=${favorite.animal.id} class="like-btn" style="color:red;">♡</button>
        </div>`
    })
}

function fetchAnimals(){
    fetch(ANIMAL_URL)
    .then(res => res.json())
    .then(animals => putanimalsOnDom(animals))
}

function fetchFavorites(){
    fetch(BASE_URL + '/users/' + currentUser.id + '/favorites')
    .then(res => res.json())
    .then(favorites => putFavoritesOnDom(favorites))
}

signupForm.addEventListener('submit', function(e){
    e.preventDefault()
    fetch(USERS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            user: {
                email: signupInputs[0].value,
                password: signupInputs[1].value
            }
        })
    })
    .then(res => res.json())
    .then(function(object){
        if (object.message) {
            alert(object.message)
        }
        else {
        loggedInUser(object)
        }
    }
    )
})

animal.addEventListener('click', function(e) {
    if (event.target.className == "favorites-link") {
        animal.style.display = 'none';
        fetchFavorites();
        favCollection.style.display = 'initial';
    }
})

favCollection.addEventListener('click', function(e) {
    if (event.target.className == "back-link") {
        favCollection.style.display = 'none';
        animalCollection.style.display = 'initial';
    }
})

function loggedInUser(object){
    currentUser = object
    signupForm.style.display = 'none'
    welcome.innerHTML = `<h3>Hello, <i>${currentUser.email}</i> !</h3>`
    logout.innerText = "Logout"
    fetchAnimals()
}

animal.addEventListener('click', function(e){
    if ((event.target.className == "like-btn") && (event.target.style.color !== 'red')) {
        let target = event.target
            fetch(FAVORITES_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                        user_id: `${currentUser.id}`,
                        animal_id: `${event.target.dataset.animalId}`
                })
        })
        .then( res => res.json())
        .then( res => target.dataset.favId = res.id);
        event.target.style.color = 'red';}
    else if ((event.target.className == "like-btn") && (event.target.style.color == 'red')) {
        event.target.style.color = 'black';
        fetch(FAVORITES_URL + '/' + event.target.dataset.favId, {
            method: "DELETE"
        })
    }
})









