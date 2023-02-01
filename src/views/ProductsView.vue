<template>
  <div class="flex flex-col">
    <div class="flex justify-between mb-2 items-center">
      <h1 class="text-2xl">Product List</h1>
      <div class="space-x-3">
        <router-link :to="{name: 'AddProductView'}" class="rounded-lg p-2 border border-black text-sm">ADD</router-link>
        <button class="rounded-lg p-2 border border-black text-sm" id="delete-product-btn" @click="massDelete">MASS DELETE</button>
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

function massDelete() {
  let selectedProducts = document.getElementsByClassName('delete-checkbox')
  if(selectedProducts.length < 1) return false

  let productsToDelete = []
  let currentProducts = products.value
  for(let i = 0; i < selectedProducts.length; i++) 
  {
    if(selectedProducts[i].checked) {
      // console.log(selectedProducts[i].value, 'is to delete')
      productsToDelete.push(selectedProducts[i].value)

      products.value = products.value.filter(function(prod) {
        if(prod.id != selectedProducts[i].value) return prod
      })
    }
  }

  ProductService.massDelete(productsToDelete).then((resp) => {
    if(resp.data.message == 'failed') {
      products.value = currentProducts
    }
  }).catch((err) => {
    console.log('err is', err)
    products.value = currentProducts
  })
}

</script>
