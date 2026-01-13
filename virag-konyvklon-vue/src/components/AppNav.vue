<template>
  <header class="nav">
    <div class="container nav-inner">
      <div class="brand">VIRÁG</div>

      <nav class="nav-links">
        <RouterLink class="nav-link" :class="{active: route.name==='home'}" to="/">Kezdőlap</RouterLink>
        <RouterLink class="nav-link" :class="{active: route.name==='flowers'}" to="/viragok">Virágok</RouterLink>
      </nav>

      <RouterLink class="cart" to="/kosar" aria-label="Kosár">
        <span class="cart-label">Kosár</span>
        <span class="cart-pill" v-if="count > 0">{{ count }}</span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cart = useCartStore()
const count = computed(() => cart.count)
</script>
