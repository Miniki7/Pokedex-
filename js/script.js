/* Variavel Global */
const pokemonName = document.querySelector(".pokemon__name")
const pokemonNumber = document.querySelector(".pokemon__number")
const pokemonImage = document.querySelector(".pokemon__image")

const form = document.querySelector(".form")
const input = document.querySelector(".input__search")

const ButtonPrev = document.querySelector(".button_btn-prev")
const ButtonNext = document.querySelector(".button_btn-next")

let searchPokemon = 1
/* a API só busca se o nome estiver em lower case, pode utilizar dois casos de lower case no form.add com
renderPokemon(input.value.toLowerCase());
ou no  fetch pokemon
const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`)
não importa qual escolher vai funcionar os dois*/

/* Função para buscar o pokemon pelo numero ou nome na Api */
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )
  console.log(APIResponse)
  if (APIResponse.status == 200) {
    const data = await APIResponse.json()
    return data
  }
}

/*Faz as buscas dos dados, Função para pegar o nome,id, imagem do pokemon na resposta da API */
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading..."
  pokemonNumber.innerHTML = ""

  const data = await fetchPokemon(pokemon)

  if (data) {
    /* pode acessar as propriedades com . ou [] */
    pokemonImage.style.display = "block"
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    /* pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ]
    } */
    // Tenta usar a imagem animada
    const animatedSprite =
      data.sprites.versions["generation-v"]["black-white"]["animated"]["front_default"]

    // Verifica se a imagem animada existe, caso contrário, usa a imagem oficial
    pokemonImage.src = animatedSprite
      ? animatedSprite
      : data.sprites.other["official-artwork"]["front_default"]

    input.value = ""
    searchPokemon = data.id
  } else {
    pokemonImage.style.display = "none"
    pokemonName.innerHTML = "Not Found :c"
    pokemonNumber.innerHTML = ""
  }
}
/* O evento ouvido desse formulario, vai ser o submit, o que escrevermos no formalario no caso*/
/* passando uma arrow funcition por se tratar de uma função simples */
form.addEventListener("submit", (event) => {
  event.preventDefault()

  renderPokemon(input.value.toLowerCase())
})
/* Alerta para os botoes */
ButtonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})

ButtonNext.addEventListener("click", () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})
/* Renderiza quando a tela é executada */
renderPokemon(searchPokemon)
