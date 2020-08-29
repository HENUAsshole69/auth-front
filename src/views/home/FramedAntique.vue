<template>
    <table-frame>
        <template #default="{loading,search,date}">
            <antique-table :date="date" :key-word="search"
                           @load="loading = true" @loaded="loading = false" v-bind:key="search+date.toString()"/>
        </template>
    </table-frame>
</template>

<script>
    import TableFrame from "./TableFrame";
    import AntiqueTable from "../../components/classic/AntiqueTable";

    export default {
        name: "FramedAntique",
        components: {AntiqueTable, TableFrame}
    }
</script>

<style scoped>

</style>
