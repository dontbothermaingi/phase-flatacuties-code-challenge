// add the DOMcontentloader so that the HTML loads first
document.addEventListener("DOMContentLoaded",()=>{
    let button = document.getElementById("showListButton")
    let myList = document.getElementById("myList")
    let description = document.getElementById("dropDown")
    let addCharacterForm = document.getElementById("addCharacterForm")
  
  
    fetch('db.json')
    .then(response=>response.json())
    .then(data=>{
      
      //  access the data in the 'characters' Array
      const charactersArray = data.characters
    
      // get where the DOM content will be loaded
    
      const domSpace = document.getElementById("myList")
    
      // iterate over each element in the array
      charactersArray.forEach(character => {
        const listName = document.createElement("li")
        listName.innerText = character.name
  
        // Create an image element and set the src attribute
          const characterImage = document.createElement('img');
          characterImage.src = character.image;
          characterImage.alt = `Image of ${character.name}`; // Improve alt text
  
    
      // Add a click event for the button to show and hide the animals that will be voted for
      button.addEventListener("click",()=>{
        if(myList.style.display === "none"){
          myList.style.display = 'block'
        }else{
          myList.style.display = 'none'
        }
      })
  
      addCharacterForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const nameInput = document.getElementById("name");
        const imageInput = document.getElementById("image");
    
        const newCharacter = {
          name: nameInput.value,
          image: imageInput.value,
          votes: 0,
          voted: false
        };
    
        //addCharacterToList(newCharacter);
        //clearFormInputs();
      });
  
  // add event listener to the items in my list so as to display the name and picture and votes when clicked
      listName.addEventListener("click",()=>{showDetails(character)})
  
  
       //  add a voting button
      const votingButton = document.createElement("button")
      updateButtonLabel();
      votingButton.addEventListener("click",()=>{
        if(!character.voted){
          voteForCharacter(character)
        }else{
          unvoteForCharacter(character)
        }
      })
  
      function updateButtonLabel(){
        votingButton.innerText = character.voted ? 'Unvote' : 'vote'
       }
  
       domSpace.appendChild(listName);
       listName.appendChild(votingButton);
  
      
  
  
    })
  
     function showDetails(character){
      description.innerHTML=`
      <img src= ${character.image} alt = ${character.name}/>
      <h3>VOTES:${character.votes}</h3>`
     }
  
     function voteForCharacter(character){
      character.votes++;
      character.voted = true
      //showDetails();
      //updateButtonLabel();
     }
  
     function unvoteForCharacter(character){
      character.votes--;
      character.voted = false
      //showDetails();
      //updateButtonLabel()
      
     }
  
  
    
    });
    
      
  })
  