<template>
  <div class="landing-root">
    <div class="parallax-layer bg-carbon"></div>
    <div class="parallax-layer bike" :style="bikeStyle"></div>

    <section class="content">
      <p class="label"></p>
      <h1 class="title"></h1>
      <p class="subtitle">
        
      </p>

      <button class="btn-enter" @click="goToCatalog">
        Belépés a katalógusba
      </button>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const offset = ref(0)

const handleScroll = () => {
  offset.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

const bikeStyle = computed(() => ({
  transform: `translate3d(0, ${offset.value * 0.2}px, 0) scale(1.02)`
}))

const goToCatalog = () => {
  router.push('/motors')
}
</script>

<script>
import { computed } from 'vue'
export default {}
</script>

<style scoped>
.landing-root {
  /* ez a nagy karbon kártya, amiben középre tesszük a gombot */
  min-height: calc(100vh - 80px);
  border-radius: 24px;
  background:
    radial-gradient(circle at top, #1b0509 0, #050608 55%),
    repeating-linear-gradient(135deg,#101114,#101114 4px,#07080b 4px,#07080b 8px);
  box-shadow:
    0 0 0 1px rgba(255, 0, 70, 0.5),
    0 30px 80px rgba(0, 0, 0, 0.95);

  /* KÖZÉPRE HOZÁS 👇 */
  display: flex;
  align-items: center;     /* függőlegesen közép */
  justify-content: center; /* vízszintesen közép */
}

/* a nagy neon gomb */
.btn-enter {
  padding: 16px 80px;
  border-radius: 999px;
  border: none;
  outline: none;
  cursor: pointer;
  background: radial-gradient(circle at top left, #ff3355, #b80024);
  color: #fff;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  box-shadow:
    0 0 0 1px rgba(255, 0, 80, 0.7),
    0 0 22px rgba(255, 0, 100, 0.95);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn-enter:hover {
  transform: translateY(-3px);
  box-shadow:
    0 0 0 1px rgba(255, 0, 100, 1),
    0 0 30px rgba(255, 0, 120, 1);
}

.parallax-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-carbon {
  background-image:
    linear-gradient(135deg, rgba(255,0,80,0.25), transparent 60%),
    repeating-linear-gradient(
      135deg,
      #101114,
      #101114 4px,
      #07080b 4px,
      #07080b 8px
    );
  opacity: 0.9;
  animation: drift 18s linear infinite;
}

.bike {
  background-image: url('https://images.unsplash.com/photo-1601049676869-702ea24c5ae3?auto=format&fit=crop&w=1400&q=80');
  background-size: cover;
  background-position: center right;
  mix-blend-mode: screen;
  opacity: 0.9;
  transform-origin: center;
  transition: transform 0.2s ease-out;
}

.content {
  position: relative;
  z-index: 2;
  padding: 70px 60px;
  max-width: 520px;
}

.label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #ffb5c2;
  margin-bottom: 12px;
}

.title {
  font-size: 2.7rem;
  margin: 0 0 10px;
  text-shadow: 0 0 22px rgba(255,0,80,0.9);
}

.subtitle {
  color: #f3dde3;
  max-width: 420px;
  line-height: 1.5;
  margin-bottom: 26px;
}

.btn-enter {
  padding: 16px 60px;              /* nagyobb */
  border-radius: 999px;
  border: none;
  outline: none;
  cursor: pointer;
  background: radial-gradient(circle at top left, #ff3355, #b80024);
  color: #fff;
  font-size: 1.1rem;               /* nagyobb betű */
  text-transform: uppercase;
  letter-spacing: 0.18em;
  box-shadow:
    0 0 0 1px rgba(255, 0, 80, 0.7),
    0 0 22px rgba(255, 0, 100, 0.95);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn-enter:hover {
  transform: translateY(-3px);
  box-shadow:
    0 0 0 1px rgba(255, 0, 100, 1),
    0 0 30px rgba(255, 0, 120, 1);
}


.btn-enter:hover {
  transform: translateY(-3px);
  box-shadow:
    0 0 0 1px rgba(255,0,100,1),
    0 0 30px rgba(255,0,120,1);
}

@keyframes drift {
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 0 0, 200px 200px; }
}

@media (max-width: 900px) {
  .content {
    padding: 40px 26px;
  }
  .title {
    font-size: 2.1rem;
  }
}
</style>
