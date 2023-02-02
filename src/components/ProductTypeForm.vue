<template>
    <div class="border border-black p-6 flex flex-col items-start" :id="typeAttrs[type].idMapper">
        <div v-for="input in typeAttrs[type].inputs" :key="input" class="mb-6">
            <label :for="input.toLowerCase()">{{ input + ' (' + typeAttrs[type].unit + ')' }}</label>
            <input type="number" :id="input.toLowerCase()" @input="$emit('attribute-inputted', input, $event.target.value)" class="border border-black ml-6 p-1"/>
        </div>
    
        <h1 class="font-bold text-sm"> {{ typeAttrs[type].description }} </h1>
    </div>

</template>
<script setup>

const props = defineProps({
    type: {
        type: String,
        required: true,
    }
})

const typeAttrs = {
    'book': {
        unit: 'KG',
        inputs: ['Weight'],
        description: 'Please, provide weight',
        idMapper: 'Book',
    },
    'dvd': {
        idMapper: 'DVD',
        unit: 'MB',
        inputs: ['Size'],
        description: 'Please, provide size',
    },
    'furniture': {
        unit: 'CM',
        inputs: ['Height', 'Width', 'Length'],
        description: 'Please, provide dimensions',
        idMapper: 'Furniture',
    },
}

</script>