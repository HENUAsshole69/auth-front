<template>
    <div style="height:100%">
       <user-management-table/>
    </div>
</template>

<script>
    import UserManagementTable from "../components/UserManagementTable";
    import LoggingTable from "../components/LoggingTable";
    export default {
        name: "Admin",
        components: { UserManagementTable},
        data:()=>({
            tab : null
        })
    }
</script>

<style scoped>

</style>
