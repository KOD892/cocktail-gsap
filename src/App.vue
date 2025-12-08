<script setup>
  import gsap from 'gsap';
  import { ScrollTrigger, SplitText } from 'gsap/all';
  import Hero from './components/Hero.vue';
  import NavBar from './components/NavBar.vue';
  gsap.registerPlugin(ScrollTrigger, SplitText);

</script>

<template>
  <main>
    <NavBar/>
    <Hero/>
    <div class="h-dvh bg-black"></div>
  </main>
</template>

<style scoped></style>
