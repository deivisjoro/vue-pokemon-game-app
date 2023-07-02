<script setup>

    import { onMounted, ref } from "vue";
    import PokemonImage from "@/components/PokemonImage.vue";
    import PokemonOptions from "@/components/PokemonOptions.vue";
    import getPokemonsOptions from '@/helpers/getPokemons';
    
    const showPokemon = ref(false);
    const pokemonsList = ref([]);
    const pokemon = ref(null);
    const message = ref("");
    const answerTrue = ref(false);

    async function mixPokemonsArray(){
        pokemonsList.value = await getPokemonsOptions();

        const randomNumber = Math.floor( Math.random() * 4); //entre 0 y 3
        pokemon.value = pokemonsList.value[randomNumber];
    }

    onMounted(()=>{
        mixPokemonsArray();
    })

    const checkAnswer = (selectedId) => {
        showPokemon.value = true;
        if(selectedId===pokemon.value.id){
            message.value = `Correcto, es ${pokemon.value.name}`;
            answerTrue.value = true;
        }
        else{
            message.value = `Oops!, era ${pokemon.value.name}`;
            answerTrue.value = false;
        }
    }

    const newGame = () => {
        showPokemon.value = false;
        pokemon.value = null;
        message.value = '';
        answerTrue.value = false;    
        mixPokemonsArray()
    }

</script>

<template>
    <div class="container-page">
        <h1>¿Quien es este pokemon?</h1>
        <div v-if="pokemon">
            <PokemonImage :pokemonId="pokemon.id" :showPokemon="showPokemon" />
            <PokemonOptions 
                :pokemons="pokemonsList" 
                @onSelected="checkAnswer($event)" 
                :pokemonId="pokemon.id" 
                :showPokemon="showPokemon" />
            <span class="alert fade-in" :class="{'alert-danger': !answerTrue, 'alert-success':answerTrue}" v-if="showPokemon">
                {{ message }}
            </span>            
        </div>
        <div v-else>
            <div class="spinner">
                <div class="cube1"></div>
                <div class="cube2"></div>
            </div>
            <span class="alert alert-warning">
                Por favor espere
            </span>
        </div>
        <div>
            <button @click="newGame" v-if="showPokemon">Nuevo juego</button>
        </div>
    </div>
  
</template>

<style>

    .container-page{
        text-align: center;
        margin-top: 20px;
        color:#2c3e50;
    }

    .alert{
        display: inline-block;
        margin: 10px;
        padding: 10px 20px;        
        border-radius: 10px;        
    }

    .alert-warning{
        color: #000;
        background-color: #faf873;
        border-color: #797837;
    }

    .alert-danger{
        color: #fff;
        background-color: #df4414;
        border-color: #550c03;
    }

    .alert-success{
        color: #130561;
        background-color: #8d8ef0;
        border-color: #130561;
    }

    button{
        padding: 8px 12px;
        font-weight: bold;
        border: none;
        cursor: pointer;
        background-color: rgb(80, 80, 192);
        color: white;
        box-shadow: 2px 2px 2px #ccc;
        border-radius: 5px;
    }

    button:hover{
        background-color: rgb(36, 36, 158);
    }

    .spinner {
    margin: 100px auto;
    width: 40px;
    height: 40px;
    position: relative;
    }

    .cube1, .cube2 {
    background-color: #333;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 0;
    left: 0;
    
    -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
    animation: sk-cubemove 1.8s infinite ease-in-out;
    }

    .cube2 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
    }

    @-webkit-keyframes sk-cubemove {
    25% { -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5) }
    50% { -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg) }
    75% { -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5) }
    100% { -webkit-transform: rotate(-360deg) }
    }

    @keyframes sk-cubemove {
    25% { 
        transform: translateX(42px) rotate(-90deg) scale(0.5);
        -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
    } 50% { 
        transform: translateX(42px) translateY(42px) rotate(-179deg);
        -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
    } 50.1% { 
        transform: translateX(42px) translateY(42px) rotate(-180deg);
        -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
    } 75% { 
        transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
        -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    } 100% { 
        transform: rotate(-360deg);
        -webkit-transform: rotate(-360deg);
    }
    }

</style>