<template>
  <div class="flex flex-col">
    <div class="flex justify-between mb-2 items-center">
      <h1 class="text-2xl">Product List</h1>
      <div class="space-x-3">
        <router-link :to="{name: 'AddProductView'}" class="p-2 border border-black text-sm hover:text-white hover:bg-black">ADD</router-link>
        <button class="p-2 border border-black text-sm hover:text-white hover:bg-red-500" id="delete-product-btn" @click="massDelete">MASS DELETE</button>
      </div>
    </div>
    <hr />
    <div v-if="products.length > 0" class="mt-3 flex gap-3 flex-wrap p-2 items-center justify-center">
      <ListedProduct v-for="product in products" :key="product.id" :product="product" />
    </div>
    <div v-else class="my-8 flex items-center justify-center">
      <h1 class="italic">No products yet. Start adding products to show up here!</h1>
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
  let checkboxes = document.getElementsByClassName('delete-checkbox')
  
  let productsToDelete = []
  let currentProducts = products.value
  for(let i = 0; i < checkboxes.length; i++) 
  {
    if(checkboxes[i].checked) {
      // console.log(checkboxes[i].value, 'is to delete')
      productsToDelete.push(checkboxes[i].value)
      
      products.value = products.value.filter(function(prod) {
        if(prod.id != checkboxes[i].value) return prod
      })
    }
  }
  if(productsToDelete.length < 1) return false

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
