<template>
  <div class="container">
    <h1 class="page-title">Kosár</h1>

    <div v-if="rows.length === 0" class="empty">
      <p class="muted">A kosarad üres.</p>
      <RouterLink to="/viragok" class="btn primary">Virágok megtekintése</RouterLink>
    </div>

    <div v-else class="cart-panel">
      <div class="cart-header">
        <div class="muted">Tételek: <b>{{ cart.count }}</b></div>
        <button class="btn ghost small" @click="cart.clear()">Kosár ürítése</button>
      </div>

      <div class="cart-list">
        <div v-for="r in rows" :key="r.id" class="cart-item">
          <img class="cart-thumb" :src="r.image" :alt="r.name" />
          <div class="cart-meta">
            <div class="cart-name">{{ r.name }}</div>
            <div class="muted small">{{ r.latin }} • {{ r.sku }}</div>
            <div class="cart-actions">
              <label class="qty">
                <span class="muted small">Mennyiség</span>
                <input type="number" min="1" max="99" :value="r.qty" @input="cart.setQty(r.id, $event.target.value)" />
              </label>
              <button class="btn secondary small" @click="goDetails(r.id)">Részletek</button>
              <button class="btn danger small" @click="cart.remove(r.id)">Törlés</button>
            </div>
          </div>
        </div>
      </div>

      <div class="cart-footer">
        <RouterLink to="/viragok" class="btn secondary">Tovább nézelődök</RouterLink>
        <button class="btn primary" @click="fakeCheckout">Tovább a fizetéshez</button>
      </div>

      <div v-if="checkoutMsg" class="toast" role="status">
        {{ checkoutMsg }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { flowers } from '../data/flowers'

const router = useRouter()
const cart = useCartStore()

const rows = computed(() => {
  return cart.items
    .map(it => {
      const f = flowers.find(x => x.id === it.id)
      return f ? { ...f, qty: it.qty } : null
    })
    .filter(Boolean)
})

const coverFor = (id) => new URL(`../assets/flowers/${id}.svg`, import.meta.url).href
const goDetails = (id) => router.push(`/viragok/${id}`)

const checkoutMsg = ref('')
let tt = null
function fakeCheckout() {
  checkoutMsg.value = 'Demo: itt jönne a fizetés (backend nélkül).'
  clearTimeout(tt)
  tt = setTimeout(() => (checkoutMsg.value = ''), 1800)
}
</script>
