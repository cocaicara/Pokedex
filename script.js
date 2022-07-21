const pokemonName  = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {  //acessa a url da API
const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)


if (APIResponse.status === 200) { //se o resultado da API foi verdadeiro, 200, vai continuar o fluxo de extração dos dados
  const data = await APIResponse.json() //extração de dados da API
  return data
}
}

const renderPokemon = async (pokemon) => { //acessa a API e muda os dados

  pokemonName.innerHTML = 'Loading...'
  pokemonNumber.innerHTML = ''
  const data = await fetchPokemon(pokemon)

  if (data) { //se a extração de dados for verdadeira
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = ''
    searchPokemon = data.id
  }else { //se for false
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = 'Not found'
    pokemonNumber.innerHTML = ''
    input.value = ''
}
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase()) //pega o valor, nome do pokemon, e vai acessar a API.
  });

buttonPrev.addEventListener('click', () => {
  if(searchPokemon > 1) {
    searchPokemon -= 1 //decrementa - 1 ao clicar no botão prevs
    renderPokemon(searchPokemon)
  }
})

buttonNext.addEventListener('click', () => {
  searchPokemon += 1 //incrementa + 1 ao clicar no botão next
  renderPokemon(searchPokemon)
})

  renderPokemon(searchPokemon)
