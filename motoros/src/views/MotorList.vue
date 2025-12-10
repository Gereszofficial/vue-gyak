<template>
  <div class="page">
    <h1 class="page-title">Prémium pályamotor</h1>
    <p class="page-subtitle">
      
    </p>

    <div v-if="store.loading" class="info">Betöltés...</div>
    <div v-else-if="store.error" class="info error">{{ store.error }}</div>

    <div class="grid">
      <article v-for="m in motors" :key="m.id" class="card">
        <div class="card-img-wrapper">
          <img :src="m.image" :alt="fullName(m)" />
        </div>
        <div class="card-body">
          <h2 class="card-title">{{ fullName(m) }}</h2>
          <div class="spec-row">
            <span>{{ m.year }}</span>
            <span>{{ m.hp }} LE</span>
            <span>{{ formatPrice(m.price) }}</span>
          </div>
          <p class="card-description">
            {{ m.description }}
          </p>
          <RouterLink class="btn-primary" :to="`/motors/${m.id}`">
            Részletek
          </RouterLink>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMotorsStore } from '../stores/motors'

const store = useMotorsStore()
const { motors } = storeToRefs(store)

onMounted(() => {
  if (!motors.value.length) {
    store.fetchMotors()
  }
})

const fullName = (m) => `${m.brand} ${m.model}`

const formatPrice = (price) =>
  new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF', maximumFractionDigits: 0 }).format(price)
</script>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  font-size: 2.1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 4px;
}

.page-subtitle {
  text-align: center;
  color: #9f9f9f;
  margin-bottom: 24px;
}

.info {
  text-align: center;
  margin-top: 30px;
}

.info.error {
  color: #ff4b6e;
}

.grid {
  display: grid;
  gap: 22px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.card {
  background:
    repeating-linear-gradient(
      135deg,
      #121416,
      #121416 4px,
      #101114 4px,
      #101114 8px
    );
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 0, 60, 0.35);
  box-shadow:
    0 0 0 1px rgba(255, 0, 60, 0.25),
    0 14px 35px rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 0, 90, 0.7);
  box-shadow:
    0 0 0 1px rgba(255, 0, 90, 0.7),
    0 20px 45px rgba(0, 0, 0, 0.95);
}

.card-img-wrapper {
  position: relative;
  padding: 10px 10px 0 10px;
}

.card-img-wrapper::after {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  pointer-events: none;
}

.card-img-wrapper img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 14px;
  display: block;
}

.card-body {
  padding: 14px 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.card-title {
  font-size: 1.1rem;
  color: #ff2f4f;
  text-shadow: 0 0 12px rgba(255, 0, 80, 0.75);
  margin: 0;
}

.spec-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  color: #c9c9c9;
}

.card-description {
  font-size: 0.9rem;
  color: #e0e0e0;
  line-height: 1.4;
  min-height: 52px;
}

.btn-primary {
  align-self: flex-start;
  margin-top: 6px;
  padding: 7px 16px;
  border-radius: 999px;
  border: none;
  outline: none;
  cursor: pointer;
  background: radial-gradient(circle at top left, #ff3355, #c40028);
  color: #fff;
  text-decoration: none;
  font-size: 0.88rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  box-shadow: 0 0 12px rgba(255, 0, 80, 0.75);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 18px rgba(255, 0, 100, 0.9);
}
</style>
