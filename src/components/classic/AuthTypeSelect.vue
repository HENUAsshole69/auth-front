<template>
    <v-select
            :rules="rules"
            :value="value"
            @change="$emit('change', $event)"
            dense
            label="鉴定诉求"
            v-bind:items="items"
    ></v-select>
</template>

<script>
    export default {

        name: "AuthTypeSelect",
        props: {
            value: String,
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        data: () => ({
            items: [
                {text: '诉求1', value: '诉求1'},
                {text: '诉求2', value: '诉求2'},
                {text: '诉求3', value: '诉求3'}
            ],
            rules: [v => v !== undefined || '鉴定诉求不可不选']
        })
    }
</script>

<style scoped>

</style>
