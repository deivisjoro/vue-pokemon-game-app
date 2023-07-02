<script setup>
    import { computed, ref, toRefs } from "vue";

    const props = defineProps({
        pokemonId: {
            type: Number,
            required: true
        },
        showPokemon: {
            type: Boolean,
            default: false
        }
    })
    
    const { pokemonId, showPokemon } = toRefs(props);

    const imgSrc = computed(()=>{
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemonId.value }.svg`;
    })

</script>

<template>
    <div class="image-container">
        <img :src="imgSrc" alt="imagen del pokemon" class="apply-alfha">
        <img 
            v-if="showPokemon"
            :src="imgSrc" 
            alt="imagen del pokemon" 
            class="fade-in">
    </div>
  
</template>

<style scoped>

    .image-container{
        height: 200px;
        margin: 20px;
        display: flex;
        justify-content: center;
    }

    img{
        height: 200px;
        position: absolute;
        user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-drag: none;
        -webkit-user-select: none;

    }
    .apply-alfha{
        filter: brightness(0);
    }
</style>