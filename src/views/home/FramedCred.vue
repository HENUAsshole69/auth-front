<template>
    <table-frame>
        <template #default="{loading,search,date}">
            <cred-table :date="date" :key-word="search"
                        @load="loading = true" @loaded="loading = false" v-bind:key="search+date.toString()"/>
        </template>
    </table-frame>
</template>

<script>
    import TableFrame from "./TableFrame";
    import CredTable from "../../components/classic/CredTable";

    export default {
        name: "FramedCred",
        components: {CredTable, TableFrame}
    }
</script>

<style scoped>

</style>
