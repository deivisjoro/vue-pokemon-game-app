<script setup>

  import PokemonPage from "./pages/PokemonPage.vue";

</script>

<template>
  <div class="main-container">
    <!-- <Suspense> -->
      <PokemonPage />
    <!-- </Suspense> -->
  </div>
</template>

<style scoped>

  #app {
    min-height: 100vh;
  }
  
  .main-container{
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
  }
  
</style>
