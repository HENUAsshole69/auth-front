<template>
    <v-select
            :rules="rules"
            :value="value"
            @change="$emit('change', $event)"
            dense
            label="文物年代"
            v-bind:items="items"
    ></v-select>
</template>

<script>
    export default {

        name: "EraSelect",
        props: {
            value: String,
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        data: () => ({
            items: [
                {text: '年代1', value: '诉求1'},
                {text: '年代2', value: '年代2'},
                {text: '年代3', value: '年代3'}
            ],
            rules: [v => v !== undefined || '文物年代不可不选']
        })
    }
</script>

<style scoped>

</style>
