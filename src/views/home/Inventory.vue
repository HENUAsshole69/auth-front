<template>
    <table-frame>
        <template #default="{loading,search,date}">
            <inventory-table :date="date" :key-word="search"
                             @load="loading = true" @loaded="loading = false" v-bind:key="search+date.toString()"/>
        </template>
    </table-frame>
</template>

<script>
    import TableFrame from "./TableFrame";
    import InventoryTable from "../../components/classic/InventoryTable";

    export default {
        name: "Inventory",
        components: {InventoryTable, TableFrame}
    }
</script>

<style scoped>

</style>
