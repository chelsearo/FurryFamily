class Animal {
    constructor(animalAttributes) {
        this.img_src = animalAttributes.img_src;
        this.age = animalAttributes.age;
        this.gender = animalAttributes.gender;
        this.breed = animalAttributes.breed;
        this.description = animalAttributes.description;
        this.id = animalAttributes.id;
    }

    render() {
        return `<div class="card">
                  <h2> ($${this.age})</h2>
                  <h4 class="animal-breed">${this.breed}</h4>
                  <img src=${this.img_src} class="animal-image" /></a>
                  <p>${this.description}<p>
                  <button data-animal-id=${this.id} class="like-btn">♡</button>
                </div>`
    }
}