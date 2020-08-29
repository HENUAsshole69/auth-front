<template>
    <table-frame>
        <template #default="{loading,search,date}">
            <wear-and-tear-table :date="date" :key-word="search"
                                 @load="loading = true" @loaded="loading = false" v-bind:key="search+date.toString()"/>
        </template>
    </table-frame>
</template>

<script>
    import TableFrame from "./TableFrame";
    import WearAndTearTable from "../../components/classic/WearAndTearTable";

    export default {
        name: "FramedWearAndTear",
        components: {WearAndTearTable, TableFrame}
    }
</script>

<style scoped>

</style>
