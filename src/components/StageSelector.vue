<template>
    <v-select
            v-bind:items="items"
            v-model="value"
            label="审核阶段"
            @change="$emit('change', $event)"
    ></v-select>
</template>

<script>
    export default {

        name: "TypeSelector",
        data:()=>({
            value:undefined,
            items:[
                {text:'第一步',value:'STAGE_ONE'},
                {text:'第二步',value:'STAGE_TWO'},
                {text:'第三步',value:'STAGE_THREE'},
            ]
        })
    }
</script>

<style scoped>

</style>
