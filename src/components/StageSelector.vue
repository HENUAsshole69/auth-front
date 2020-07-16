<template>
    <v-select
            v-bind:items="items"
            v-model="value"
            label="审核阶段"
            @change="$emit('change', $event)"
    ></v-select>
</template>

<script>
    import {StageSelect} from "@/model/Verification";

    export default {

        name: "TypeSelector",
        data:()=>({
            value:undefined,
            items:StageSelect
        })
    }
</script>

<style scoped>

</style>
