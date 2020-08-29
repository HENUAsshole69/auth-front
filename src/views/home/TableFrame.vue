<template>
    <transition
            name="fade"
    >
        <div>
            <v-progress-linear
                    color="cyan"
                    indeterminate
                    style="z-index: 1"
                    v-if="loading"
            ></v-progress-linear>
            <v-card flat>
                <v-card-title>

                    <v-spacer></v-spacer>

                    <v-text-field
                            dense
                            hide-details
                            label="搜索用户名或文物名称进行搜索"
                            single-line
                            v-model="search"
                    >
                        <template v-slot:prepend-inner>
                            <date-range-picker v-model="date"/>
                        </template>
                        <template v-slot:append>
                            <v-btn icon small>
                                <v-icon>
                                    mdi-magnify
                                </v-icon>
                            </v-btn>
                        </template>
                    </v-text-field>

                </v-card-title>
                <slot :date="date" :loading="loading" :search="search">

                </slot>

            </v-card>
        </div>
    </transition>
</template>

<script>
    import infiniteScroll from 'vue-infinite-scroll'

    import {ifRoleCanImport} from '../../accessControl';
    import DateRangePicker from "../../components/classic/DateRangePicker";

    export default {
        name: "TableFrame",
        components: {DateRangePicker},
        data: () => ({
            batchImportDialog: false,
            newAntiqueDialog: false,
            searchTest: false,
            loading: false,
            search: '',
            cards: [],
            busy: false,
            pageNo: 0,
            pageLen: 10,
            date: ['1970-01-01', new Date().toISOString().substr(0, 10)]
        }),
        directives: {
            infiniteScroll
        },
        watch: {},
        methods: {
            ifRoleCanImport
        }
    }
</script>

<style lang="scss" scoped>
    $animationDuration: 0.5s; // specify animation duration. Default value: 1s
    @import "~vue2-animate/src/sass/vue2-animate";
</style>
