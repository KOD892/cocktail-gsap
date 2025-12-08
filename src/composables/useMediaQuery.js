import {ref, onMounted, onUnmounted } from 'vue'


export function useMediaQuery(query) {
  const matches = ref(false)

  function listener() {
    matches.value = window.matchMedia(query).matches
  
  }

  onMounted(() => {
    window.matchMedia(query).addEventListener('change', listener)
    listener()
  })

  onUnmounted(() => window.matchMedia(query).removeEventListener('change', listener))

  return matches
}