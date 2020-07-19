<template>
    <v-select
            v-model="values"
            :items="items"
            chips
            label="请选择审核权限"
            @change="$emit('change',values)"
            multiple
    ></v-select>
</template>

<script>
    import {StageSelectNameMap} from "../model/Verification";

    export default {
        name: "UserVerifiableSelect",
        props:{
            verifiable:Array
        },
        data:()=>({
            values:[],
            items:StageSelectNameMap
        }),
        mounted() {
            this.values.push(...this.verifiable)
        }
    }
</script>

<style scoped>

</style>
