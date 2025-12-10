<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { allCocktails } from '../../data'

const activeCocktailIndex = ref(0)
const selectedCocktail = ref(null)
const nextCocktail = ref(null)
const prevCocktail = ref(null)

const menuRef = ref(null)

const totalCocktails = allCocktails.length

// ref for the animated element
const titleRef = ref(null)

const isActive = (name) => {
  return name === selectedCocktail.value.name
}


const getCocktailAt = (offset) => {
  const index = (activeCocktailIndex.value + offset + totalCocktails) % totalCocktails
  return allCocktails[index]
}

const setActiveCocktail = (index) => {
  const newIndex = (index + totalCocktails) % totalCocktails
  activeCocktailIndex.value = newIndex

  selectedCocktail.value = getCocktailAt(0)
  prevCocktail.value = getCocktailAt(-1)
  nextCocktail.value = getCocktailAt(1)
}

// initialize state
selectedCocktail.value = getCocktailAt(0)
prevCocktail.value = getCocktailAt(-1)
nextCocktail.value = getCocktailAt(1)

let ctx

onMounted(() => {
  ctx = gsap.context(() => {}, menuRef.value) // scope to this component
})

// animate on activeCocktailIndex change
watch(activeCocktailIndex, async () => {
  await nextTick() // ensures the new title DOM exists

  ctx.add(() => {
    gsap.fromTo(
      titleRef.value,
      { opacity: 0 },
      { opacity: 1, duration: 1}
    )
    gsap.fromTo('.cocktail img',{
        opacity: 0, xPercent:-100,
    },{
        opacity: 1, xPercent:0, duration: 1, ease:'power1.inOut',
    })
    gsap.fromTo('.details',{
      yPercent: 100,
      opacity: 0,
    },{
      yPercent: 0,
      opacity: 1,
      ease:'power1.inOut',
    })
    gsap.fromTo('#m-right-leaf',{
      scale: 1.2,
      xPercent:-20,
      ease:'power1.inOut',
  },{
      scale: 1,
      xPercent: 0,
      duration: 1,
  })
  gsap.fromTo('#m-left-leaf',{
      scale: 1.2,
      xPercent:20,
      ease:'power1.inOut',
  },{
      scale: 1,
      xPercent: 0,
      duration: 1,
  })
  })
})

onBeforeUnmount(() => ctx?.revert())
</script>


<template>
  <section id="menu" ref="menuRef" aria-labelledby="menu-heading">
     <img src="/images/slider-left-leaf.png" alt="left-leaf" id="m-left-leaf" />
	   <img src="/images/slider-right-leaf.png" alt="right-leaf" id="m-right-leaf" />

    <h2 id="menu-heading" class="sr-only">Cocktail Menu</h2>

    <nav class="cocktail-tabs"> 
       <button v-for="(cocktail, index) in allCocktails" :key="index" @click="setActiveCocktail(index)" :class="isActive(cocktail.name) ? 'text-white border-white' : 'text-white/50 border-white/50'">
        {{ cocktail.name }}
       </button>
    </nav>
    <div class="content">
        <div class="arrows">
            <button class="text-left" @click="setActiveCocktail(activeCocktailIndex-1)">
                <span>{{ prevCocktail.name }}</span>
                <img src="/images/right-arrow.png" alt="right arrow" aria-hidden="true">
            </button>

            <button class="text-left" @click="setActiveCocktail(activeCocktailIndex +1)">
                <span>{{ nextCocktail.name  }}</span>
                <img src="/images/left-arrow.png" alt="right arrow" aria-hidden="true">
            </button>
        </div>
        <div class="cocktail">
            <img :src="selectedCocktail.image" class="object-contain">
        </div>
        <div class="recipe">
		 <div  class="info">
			<p>Recipe for:</p>
            <p ref="titleRef" id="title" :key="selectedCocktail.name">{{ selectedCocktail.name }}</p>
		 </div>
		 
		 <div class="details">
			<h2>{{selectedCocktail.title}}</h2>
			<p>{{selectedCocktail.description}}</p>
		 </div>
		</div>
    </div>
  </section>
</template>
