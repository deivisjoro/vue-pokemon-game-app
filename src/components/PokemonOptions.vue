<script setup>

    import { ref, toRefs } from 'vue';

    const props = defineProps({
        pokemons: {
            type: Array,
            required: true
        },
        pokemonId: {
            type: Number,
            required: true
        },
        showPokemon: {
            type: Boolean,
            default: false
        }
    })

    const { pokemons, pokemonId, showPokemon } = toRefs(props);
    const pokemonIdSelect = ref(null);

    const emmits = defineEmits(['onSelected']);

    const fnSelected = ( id ) => {
        if(showPokemon.value) return;
        emmits('onSelected', id);
        pokemonIdSelect.value = id;
    }


</script>

<template>

    <div class="options-container">

        <ul>
            <li 
                v-for="pokemon in pokemons" 
                :key="pokemon.id"
                @click="fnSelected(pokemon.id)"
                :class="{ hover: !showPokemon, correct: (showPokemon && pokemon.id===pokemonId && pokemon.id===pokemonIdSelect), error: (showPokemon && pokemon.id!==pokemonId && pokemon.id===pokemonIdSelect), selected: showPokemon }"
            >
                {{ pokemon.name }}
            </li>
        </ul>

    </div>
  
</template>

<style scoped>
    .options-container{
        display: flex;
        justify-content: center;
    }

    li{
        background-color: #fff;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, .2);
        cursor: pointer;
        margin-bottom: 10px;
        width: 250px;
        padding: 5px;
    }

    .hover:hover{
        background-color: rgba(0, 0, 0, .05);
    }   

    .selected{
        cursor: default;
    }
    .correct{
        background-color: rgb(59, 121, 35);
        color: white;
        
    }

    .error{
        background-color: rgb(197, 78, 9);
        color: white;
    }

</style>