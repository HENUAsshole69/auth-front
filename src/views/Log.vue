<template>
    <transition
            name="fade"
    ><div>
        <v-progress-linear
                indeterminate
                color="cyan"
                v-if="loading"
        ></v-progress-linear>
    <logging-table  @load="loading = true"
                    @loaded="loading = false" />
    </div>
    </transition>
</template>

<script>
    import LoggingTable from "../components/LoggingTable";
    export default {
        name: "Log",
        components: {LoggingTable},
        data:()=>({
            loading:false
        })
    }
</script>

<style scoped>

</style>
