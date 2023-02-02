<template>
    <div class="flex flex-col">
        <div class="flex justify-between mb-2 items-center">
            <h1 class="text-2xl">Add Product</h1>
            <div class="flex space-x-2">
                <button class="p-2 border border-black text-sm" @click="submitForm">Save</button>
                <router-link :to="{name: 'ProductsView'}" class="p-2 border border-black text-sm">Cancel</router-link>
            </div>
        </div>
        <hr />
        <!-- Form -->
        <form id="product_form" class="self-start my-6 flex flex-col items-start" @submit.prevent>
            <h1 class="mb-6 text-red-500" v-if="error.length > 0"> {{ error }}</h1>

            <div class="mb-6">
                <label for="sku" class="">SKU</label>
                <input id="sku" type="text" class="border border-black ml-6 p-1" v-model="sku"/>
            </div>
            <div class="mb-6">
                <label for="name" class="">Name</label>
                <input id="name" type="text" class="border border-black ml-6 p-1" v-model="name"/>
            </div>
            <div class="mb-6">
                <label for="price" class="">Price ($)</label>
                <input id="price" type="text" class="border border-black ml-6 p-1" v-model="price"/>
            </div>
            <div class="mb-6">
                <label for="productType" class="">Type Switcher</label>
                <select id="productType" class="border border-black ml-6 p-1" v-model="productType" @change="typeChanged">
                    <option value="book">Book</option>
                    <option value="furniture">Furniture</option>
                    <option value="dvd">DVD</option>
                </select>
            </div>

            <ProductTypeForm :type="productType" @attribute-inputted="attributeInputted"/>
        </form>
    </div>
</template>
<script setup>
import ProductService from '@/services/ProductService'
import ProductTypeForm from '@/components/ProductTypeForm'
import { ref, onMounted } from 'vue'

let error = ref('')

let sku = ref('')
let name = ref('')
let price = ref('')
let productType = ref('book')

let existingSKUS = ref([])

onMounted(() => {
    ProductService.getProducts().then((resp) => {
        if(resp.data.message != 'failed') {
            for(let i = 0; i < resp.data.data.length; i++) {
                existingSKUS.value.push(resp.data.data[i].sku)
            }
        }
    })
})

function submitForm() {
    let inputFields = document.getElementsByTagName('input')
    for(let i = 0; i < inputFields.length; i++) 
    {
        if(!!inputFields[i].value === false) { 
            error.value = 'Please, submit required data'
            return false
        }
    }
    error.value = ''

}

function attributeInputted(attrName, attrValue) {
    console.log('attribute inputted (name, value):', attrName, attrValue)
}

function typeChanged() {
    console.log('type changed', productType.value)
}
</script>