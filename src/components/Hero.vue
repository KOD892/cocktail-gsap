<script setup>
import gsap from 'gsap';
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue';
import { useMediaQuery } from '@vueuse/core'
import { SplitText } from 'gsap/all';


let ctx;
const videoRef = ref(null)
const isMobile = useMediaQuery('(max-width: 450px)')
const videoSrc = ref(null)

videoSrc.value = isMobile.value ? "/videos/output-mobile.mp4" : "/videos/output.mp4";

console.log(isMobile.value)
onMounted(()=>{
  
  document.fonts.ready.then(()=>{
     ctx = gsap.context(async()=>{
      const heroSplit = new SplitText('.title', {type: 'chars'})
      const paraSplit = new SplitText('.subtitle', {type: 'lines'})
     heroSplit.chars.forEach((c)=>c.classList.add('text-gradient'))
      gsap.from(heroSplit.chars,{
        yPercent:100,
        duration:1.8,
        ease: 'expo.out',
        stagger:0.06,
        autoAlpha:1
      })
      gsap.from(paraSplit.lines,{
        opacity:0,
        yPercent:100,
        duration:1.8,
        ease: 'expo.out',
        stagger:0.06,
        delay: 1
      })
      gsap.timeline({
        scrollTrigger:{
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub:true,
        }
      }).to('.right-leaf',{y:200},0)
      .to('.left-leaf',{y:-200},0)
       

      const startValue = isMobile.value ? 'top 50%' : 'center 60%';
      const endValue = isMobile.value ? '150% top' : 'bottom top';
      await nextTick();
      
      videoRef.value.onloadedmetadata = () => {
        // Once the video metadata is loaded, we know the duration.
        // Now it's safe to create the timeline that scrubs the video.
        gsap.timeline({
          scrollTrigger: {
              trigger: videoRef.value,
              start: startValue,
              end: endValue,
              scrub: true,
              pin: true,
          }
        }).to(videoRef.value, { currentTime: videoRef.value.duration , pin: true });
        // videoRef.value.addEventListener('loadeddata', () => {
        //     ScrollTrigger.refresh()
        //     })
      };
    })
     

}).catch((err)=> console.log(err))
})
onBeforeUnmount(()=>{
    ctx?.revert()
})

</script>
<template>
<div ref="containerRef">
    <section id="hero" class="noisy">
        <h1 class="title">BEBIDA</h1>
        <img src="/images/hero-left-leaf.png" alt="leaf" class="left-leaf">
        <img src="/images/hero-right-leaf.png" alt="leaf" class="right-leaf">
        <div class="absolute top-[-20] right-1 md:right-10">
                    <img src="/images/arrow.png" alt="arrow">
                    </div>
        <div class="body">
            
            <div class="content">
                <div class="space-y-5 hidden md:block">
                    <p>Cool. Crisp. Classic.</p>
                    <p class="subtitle">
                        Sip the Spirit <br/> of Summer
                    </p>
                </div>
                
                <div class="view-cocktails">
                <p class="subtitle">
                    Every cocktail on our menu is a blend of premium ingredients,
                    creative flair, and timeless recipes — designed to delight your
                    senses.
                </p>
                <a href="#cocktails">View cocktails</a>
                </div>
            </div>
        </div>


    </section>
    <div class="video absolute inset-0">
        <video ref="videoRef" src="/videos/output-mobile.mp4" looppreload="auto" muted playsinline webkit-playsinline />
    </div>
</div>
</template>
<style>

</style>