<template>
    <v-select
            v-bind:items="items"
            v-model="value"
            label="文物类型"
            @change="$emit('change', $event)"
    ></v-select>
</template>

<script>
    export default {

        name: "TypeSelector",
        data:()=>({
            value:undefined,
            items:[
                {text:'瓷器',value:'PORCELAIN'},
                {text:'玉器',value:'JADE'},
                {text:'书画',value:'PAINTING_CALLIGRAPHY'},
                {text:'金属器',value:'METAL'},
                {text:'其他',value:'MISC'}
            ]
        })
    }
</script>

<style scoped>

</style>
