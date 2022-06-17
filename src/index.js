
document.addEventListener("DOMContentLoaded", () => {
    
    const imagesDiv = document.getElementById("dog-image-container");
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then((r) => r.json())
    .then((data) => {
        for (const key in data.message){
            const imgElement = document.createElement("img");
            imgElement.src = data.message[key];
            imagesDiv.appendChild(imgElement);
            imgElement.style.width = 'auto';
            imgElement.style.maxWidth = '400px';
            imgElement.style.maxHeight = '600px';
        }
    });

    fetch("https://dog.ceo/api/breeds/list/all")
    .then ((r) => r.json())
    .then ((data) => {
        const dogNames = [];
        for (const key in data.message) {
            if (data.message[key].length === 0) {
                dogNames.push(upperCase(key));
            }
            
            for (const subname of data.message[key]) {
                dogNames.push(upperCase(subname) + " " + upperCase(key));
            }
        }
        for (const key of dogNames){
            appendLi(key);
        }

        const doglist = document.getElementsByTagName("li");
        const selectElement = document.querySelector("#breed-dropdown");
        selectElement.addEventListener('change', function() {
            const selectValue = this.value.toUpperCase();
            for (const li of doglist){
                if (selectValue != li.innerText[0]){
                    li.hidden = true;
                }
                else {
                    li.hidden = false;
                }
            }
        })

        for (const li of doglist){
            li.addEventListener('click', () => {
            li.style.color = 'red';
            });
        }
    })
})

function appendLi (name) {
    const ul = document.getElementById("dog-breeds");
    let li = document.createElement("li");
    li.className = "dog-entry";
    li.innerText = name;
    ul.appendChild(li);
}

function upperCase(name){
    return name.charAt(0).toUpperCase() + name.slice(1);
}