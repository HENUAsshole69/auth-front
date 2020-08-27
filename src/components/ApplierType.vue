<template>
    <v-select
            :rules="rules"
            :value="value"
            @change="$emit('change', $event)"
            label="申请类型"
            v-bind:items="items"
    ></v-select>
</template>

<script>
    export default {

        name: "ApplierType",
        props: {
            value: Boolean
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        data: () => ({
            items: [
                {text: '个体', value: true},
                {text: '企业', value: false}
            ],
            rules: [v => v !== undefined || '不可不选']
        })
    }
</script>

<style scoped>

</style>
