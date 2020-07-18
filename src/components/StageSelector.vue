<template>
    <v-select
            v-bind:items="items"
            v-model="value"
            label="审核阶段"
            @change="$emit('change', $event)"
            :rules="rules"
    ></v-select>
</template>

<script>
    import {StageSelectNameMap} from "@/model/Verification";

    export default {
        props:{
            verified:Array
        },
        name: "TypeSelector",
        data:()=>({
            value:undefined,
            items:[],
            rules:[v=>v !== undefined || '审核阶段不可不选']
        }),
        mounted() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const model = this
            this.items.push(...StageSelectNameMap.filter(function (value) {
                return model.$store.state.userObj.verifiable.includes(value.value) && !model.verified.includes(value.value)
            }))
        }
    }
</script>

<style scoped>

</style>
