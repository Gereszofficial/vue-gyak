import { defineStore } from 'pinia'

function load() {
  try {
    const raw = localStorage.getItem('virag_kosar_v1')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(items) {
  try {
    localStorage.setItem('virag_kosar_v1', JSON.stringify(items))
  } catch {}
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: load(), // [{id, qty}]
  }),
  getters: {
    count: (s) => s.items.reduce((a, it) => a + it.qty, 0),
  },
  actions: {
    add(id, qty = 1) {
      const found = this.items.find(x => x.id === id)
      if (found) found.qty += qty
      else this.items.push({ id, qty })
      save(this.items)
    },
    remove(id) {
      this.items = this.items.filter(x => x.id !== id)
      save(this.items)
    },
    setQty(id, qty) {
      const q = Math.max(1, Math.min(99, Number(qty) || 1))
      const found = this.items.find(x => x.id === id)
      if (found) found.qty = q
      save(this.items)
    },
    clear() {
      this.items = []
      save(this.items)
    },
  }
})
