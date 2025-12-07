<script setup>
import gsap from 'gsap';
import { onMounted, onUnmounted, ref } from 'vue';
import { SplitText } from 'gsap/all';


const containerRef = ref(null)
let ctx;
onMounted(()=>{
  
  document.fonts.ready.then(()=>{
     ctx = gsap.context(()=>{
      const heroSplit = new SplitText('.title', {type: 'chars'})
      const paraSplit = new SplitText('.subtitle', {type: 'lines'})
     heroSplit.chars.forEach((c)=>c.classList.add('text-gradient'))
      gsap.from(heroSplit.chars,{
        yPercent:100,
        duration:1.8,
        ease: 'expo.out',
        stagger:0.05,
      })
        
    }, containerRef.value)
     

}).catch((err)=> console.log(err))
})
// onUnmounted(()=>{
//     ctx.clear
// })

</script>
<template>
<section id="hero" class="noisy">
    <h1 class="title">BEBIDA</h1>
    <img src="/images/hero-left-leaf.png" alt="leaf" class="left-leaf">
    <img src="/images/hero-right-leaf.png" alt="leaf" class="right-leaf">
    <div class="body">
        <div class="content">
            <div class="space-y-5 hidden md:block">
                <p>Cool. Crisp. Classic.</p>
                <p class="subtitle">
                    Sip the Spirit <br/> of Summer
                </p>
            </div>
            <div class="view-cocktails">
             <p className="subtitle">
				Every cocktail on our menu is a blend of premium ingredients,
				creative flair, and timeless recipes — designed to delight your
				senses.
			 </p>
			 <a href="#cocktails">View cocktails</a>
            </div>
        </div>
    </div>


</section>
</template>