const apikey='0abea9489ed312b36e60348284426b07';
const hash='d7c3aa115ee66a8e4081dd9325c0a7f9';
const ts=1;
let url=`http://gateway.marvel.com/v1/public/characters?ts=1&apikey=0abea9489ed312b36e60348284426b07&hash=d7c3aa115ee66a8e4081dd9325c0a7f9`;

url="https://akabab.github.io/superhero-api/api/all.json";
const favheroList = [];

let goto = 'Home';
const homeBtn = document.querySelector('.Btnhome');
const favBtn = document.querySelector('.Btnfav');
console.log("before clk event");
favBtn.addEventListener("click",()=>{
   goto = "Favourites";
   document.querySelector('.hero-container').innerHTML = "";
   fetchData();
});
homeBtn.addEventListener("click",()=>{
   goto = "Home";
   document.querySelector('.hero-container').innerHTML = "";
   fetchData();
});

const fetchData = async () => {
    try {
        // To get the data from the api.
        const response = await fetch(url);
        let data = await response.json();
    
        // If toShow is FAVORITES then favorites data is rendered on the dom
        if(goto === "Favourites"){
            data = favheroList;
        }
        const characters = data;
        
        // Iterate over the data and render one by one
        characters.forEach((character) => {
    
            // It creates the hero element
            const hero = document.createElement('div');
            hero.classList.add('hero');
    
            // Image element
            let image = `${character?.images?.lg}`;
            let img = document.createElement('img');
            img.classList.add("hero-img")
            img.src = image;
            img.alt = 'Charcter Cover';
            hero.appendChild(img);
    
            // Title element
            const title = document.createElement('div');
            title.classList.add('hero-title');
            let name = character?.biography?.fullName;
            if(!name || name?.length == 0){
                name = character?.name
            }
            title.textContent = name ;
            
            // Description Element
            const description = document.createElement('div');
            description.classList.add('hero-description');
            description.textContent = character?.work?.occupation;
    
            // Action buttons
            const actions = document.createElement('div');
            actions.classList.add('hero-actions');
            
            // show detail anchor link
            const link = document.createElement('a');
            link.textContent = 'More info';
            link.target = '_blank';
            
            // Favorite Button to add to favorites
            const favoriteButton = document.createElement('button');
            if(goto === "Home"){
                favoriteButton.textContent = 'Add to Favorites';
                favoriteButton.addEventListener('click', () => {
                    favheroList.push(character);
                    alert(`Character "${character.name}" has been added to your favorites.`);
                });
            } else {
                favoriteButton.textContent = 'Remove From Favorites';
                favoriteButton.addEventListener('click', () => {
                    
                    hero.remove();
                    alert(`Character "${character.name}" has been removed from the favorites.`);
                });
            }
            
            actions.appendChild(link);
            actions.appendChild(favoriteButton);
            
            hero.appendChild(title);
            hero.appendChild(description);
            hero.appendChild(actions);
            
            // It appends the hero to hero container
            document.querySelector('.hero-container').appendChild(hero);
            
        });
    } catch (error) {
        console.error(error);
    }
    };
    
    // fetchDate() will be called for the very first time to render the data
    fetchData();

   





