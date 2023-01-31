<template>
  <div class="flex flex-col">
    <div class="flex justify-between mb-2 items-center">
      <h1 class="text-2xl">Product List</h1>
      <div class="space-x-3">
        <button class="rounded-lg p-2 border border-black text-sm">ADD</button>
        <button class="rounded-lg p-2 border border-black text-sm">MASS DELETE</button>
      </div>
    </div>
    <hr />
    <div class="mt-3 flex gap-3 flex-wrap p-2 items-center justify-center">
      <ListedProduct v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ProductService from '../services/ProductService'
import ListedProduct from '@/components/ListedProduct'

let products = ref([])

onMounted(() => {
  ProductService.getProducts().then((resp) => {
    if(resp.data.message != 'failed')
      products.value = resp.data.data
  }).catch((err) => {
    console.log(err)
  })
})

</script>
