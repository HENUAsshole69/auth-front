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
            items:[]
        }),
        mounted() {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const model = this
            this.items.push(...StageSelect.filter(function (value) {
                return model.$store.state.userObj.verifiable.includes(value.value)
            }))
        }
    }
</script>

<style scoped>

</style>
