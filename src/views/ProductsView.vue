<template>
  <div v-for="prod in products" :key="prod.id">{{ prod }}</div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ProductService from '../services/ProductService'

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
