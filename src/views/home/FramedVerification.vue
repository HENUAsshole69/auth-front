<template>
    <table-frame>
        <template #default="{loading,search,date}">
            <verification-table :date="date" :key-word="search"
                                @load="loading = true" @loaded="loading = false" v-bind:key="search+date.toString()"/>
        </template>
    </table-frame>
</template>

<script>
    import TableFrame from "./TableFrame";
    import VerificationTable from "../../components/classic/VerificationTable";

    export default {
        name: "FramedVerification",
        components: {VerificationTable, TableFrame}
    }
</script>

<style scoped>

</style>
