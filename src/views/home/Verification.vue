<template>
    <transition
            name="fade"
    ><div>
        <v-progress-linear
                indeterminate
                color="cyan"
                v-if="loading"
        ></v-progress-linear>
        <v-card flat>
            <v-card-title>

                <v-spacer></v-spacer>
                <v-text-field
                        v-model="search"
                        label="搜索用户名或文物名称进行搜索"
                        single-line
                        hide-details
                >
                    <template v-slot:prepend-inner>
                        <date-range-picker v-model="date"/>
                    </template>
                    <template v-slot:append>
                        <v-btn icon>
                            <v-icon>
                                mdi-magnify
                            </v-icon>
                        </v-btn>
                    </template>
                </v-text-field>
            </v-card-title>
            <verification-table @load="loading = true"
                                :date="date" :key="search+date.toString()" :key-word="search"
                                @loaded="loading = false"/>
        </v-card>
    </div>
    </transition>
</template>

<script>
    import infiniteScroll from 'vue-infinite-scroll'
    import {AntiqueClient} from "../../client/AntiqueClient";
    import AntiqueCard from "../../components/AntiqueCard";
    import BatchImportDialog from "../../components/BatchImportPage";
    import NewAntiqueDialog from "../../components/NewAntiqueDialog";
    import SearchResultDialog from "../../components/SearchResultDialog";
    import {ifRoleCanImport} from '../../accessControl';
    import AntiqueTable from "../../components/classic/AntiqueTable";
    import VerificationTable from "../../components/classic/VerificationTable";
    import DateRangePicker from "../../components/classic/DateRangePicker";
    export default {
        name: "Verification",
        components: {VerificationTable, DateRangePicker},
        data: () => ({
            batchImportDialog: false,
            newAntiqueDialog: false,
            searchTest: false,
            loading: false,
            search: '',
            cards: [],
            busy: false,
            pageNo: 0,
            pageLen:10,
            date: ['1970-01-01', new Date().toISOString().substr(0, 10)]
        }),
        directives:{
            infiniteScroll
        },
        watch:{
        },
        methods: {
            loadMore: async function() {
                this.busy = true;
                const result = await AntiqueClient.getAntique(this.pageNo,this.pageLen)
                this.cards.push(...result.content)
                if(!result.last) {
                    this.pageNo++
                    this.busy = false;
                }
            },
            ifRoleCanImport
        }
    }
</script>

<style scoped lang="scss">
    $animationDuration: 0.5s; // specify animation duration. Default value: 1s
    @import "~vue2-animate/src/sass/vue2-animate";
</style>
