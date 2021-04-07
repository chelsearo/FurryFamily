class User{
     constructor(username, email, password){
         this.username = username;
         this.email = email;
         this.password = password;
         this.id = id;
     }

     renderUser(){
         let usersDiv = document.getElementById("users-container")

         usersDiv.innerHTML += 
         `
         <ul>
         <li>username: ${this.username} - email: ${this.email} - passwprd: ${this.password}</li>
         </ul>
         <button class="delete-button" data-id=${this.id}>Delete User</button>
         `
        }
    }