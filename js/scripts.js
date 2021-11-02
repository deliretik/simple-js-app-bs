let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    
    
    function add(pokemon) {
      if (typeof pokemon === 'object') {
        pokemonList.push(pokemon);
      } else {
        document.write('not a pokemon')
      };
    }  
    function getAll() {
      return pokemonList;
    };
  
    function addListItem(pokemon) {
      let poList = document.querySelector('.pokemon-list');
      let ListItem = document.createElement('li');
      let button = document.createElement('button');
      button.addEventListener('click', function () {
          showDetails(pokemon);
        });
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#poModal');
        ListItem.classList.add('list-group-item')
        ListItem.appendChild(button);
        poList.appendChild(ListItem);
      };
      
      
      function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          showModal(pokemon)
          console.log(pokemon);
        });
      }  
    
    
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
    };
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight
      }).catch(function (e) {
        console.error(e);
      });
    };
//bs modal
function showModal(pokemon) {
  let modalTitle = document.querySelector('.modal-title');
  let modalBody = document.querySelector('.modal-body');
  let theMap = pokemon.types;
  let map = theMap.map(function(x){
    return x.type.name;
  });
  
  modalTitle.innerHTML = '';
  modalBody.innerHTML = '';

  let title = document.createElement('h5');
  title.innerHTML = pokemon.name;

  let poHeight = document.createElement('p');
  poHeight.innerHTML = 'Height: ' + pokemon.height;

  let poTypes = document.createElement('p');
  poTypes.innerHTML = 'Type: ' + map;

  let poWeight = document.createElement('p');
  poWeight.innerHTML = 'Weight: ' + pokemon.weight;

  let poPic = document.createElement('img');
  poPic.src = pokemon.imageUrl;

  modalTitle.append(title);
  modalBody.append(poPic);
  modalBody.append(poHeight);
  modalBody.append(poWeight);
  modalBody.append(poTypes);
}
//end modal

  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

//foreach function
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
  pokemonRepository.addListItem(pokemon);
});
});