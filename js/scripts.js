let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function getAll() {
      return pokemonList;
    }
    
    function addListItem(pokemon){
      let pokemonUnorderedList = document.querySelector('.list-group');
      let pokemonListItem = document.createElement('group-list-item');
      let pokemonButton = document.createElement('button');
        pokemonButton.innerText = pokemon.name;
        pokemonButton.classList.add('btn-primary');
        pokemonListItem.appendChild(pokemonButton);
        pokemonUnorderedList.appendChild(pokemonListItem);
        pokemonButton.addEventListener('click', function () {
          showDetails(pokemon)
        });
    }; 
    
    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }
//bs modal
function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    //let modalContainer = $("#modal-container")


//clear the modal content
modalHeader.empty();
modalTitle.empty();
modalBody.empty();

//creating element for the name
let titleElement = $("<h1>" + item.name + "</h1>");
//creating image 
let imageElement = $('<img class="modal-img" style="width:50%">');
imageElement.attr("src", item.imageUrl);
//creating element for height
let heightElement =$("<p>" + "height : " + item.height + "</p>");

//apending
modalTitle.append(titleElement);
modalBody.append(imageElement);
modalBody.append(heightElement);
//modalContainer.appendChild(modal);
      

}
//end modal


function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      //console.log(pokemon);
      showModal(pokemon);
    });
  }
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

//foreach function
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
});