<template>
    <v-menu
            :close-on-content-click="false"
            offset-y

            ref="menu"
            transition="scale-transition"
            v-model="menu"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn small
                   icon
                   style="margin: 0;padding: 0"
                   v-bind="attrs"
                   v-on="on"
            >
                <v-icon>mdi-calendar</v-icon>
            </v-btn>
        </template>
        <v-date-picker
                :max="new Date().toISOString().substr(0, 10)"
                :value="value[0]"
                @input="$emit('change',[$event,value[1]])"
                locale="zh-cn"
                min="1970-01-01"
                no-title
        >
            <v-btn @click="$emit('change',['1970-01-01',value[1]])" text>清空</v-btn>
        </v-date-picker>
        <v-date-picker
                :max="new Date().toISOString().substr(0, 10)"
                :value="value[1]"
                @input="$emit('change',[value[0],$event])"
                locale="zh-cn"
                min="1970-01-01"
                no-title
        >
            <v-btn @click="$emit('change',[value[0],new Date().toISOString().substr(0, 10)])" text>清空</v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script lang="ts">
    import Vue from "vue";

    export default Vue.extend({
        name: "DateRangePicker",
        data: () => ({
            menu: false
        }),
        props: {
            value: Array,
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        methods: {}
    })
</script>

<style scoped>

</style>
