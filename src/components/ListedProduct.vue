<template>
    <div v-if="product !== null" class="border border-black p-4 flex flex-col min-w-[250px] max-w-[250px] min-h-[200px] space-y-3">
        <div class="self-start">
            <input class="delete-checkbox" type="checkbox" :value="product.id"/>
        </div>
        <div class="self-center">
            <h1 class="text-sm">{{ product.sku }}</h1>
            <h1 class="text-sm">{{ product.name }}</h1>
            <h1 class="text-sm">{{ product.price }} $</h1>
            <h1 class="text-sm">{{ displayTypeData(product.type)}}</h1>
        </div>
    </div>
</template>
<script setup>

const props = defineProps({ 
    product: {
        type: Object,
        default: null
    }
})

function displayTypeData(productType) {
    if(productType.toLowerCase() == 'book') {
        return 'Weight: ' + props.product.weight + 'KG' 
    }
    else if(productType.toLowerCase() == 'dvd') {
        return 'Size: ' + props.product.size + ' MB'
    }
    else if(productType.toLowerCase() == 'furniture') {
        return props.product.height + 'X' + props.product.width + 'X' + props.product.length
    }
}
</script>