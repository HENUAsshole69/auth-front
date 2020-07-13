<template>
    <div  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0">
        <v-container fluid>
            <v-row no-gutters>
                <!--<v-col
                        v-for="card in cards"
                        :key="card.title">
                    &lt;!&ndash;:cols="card.flex"&ndash;&gt;
                    <AntiqueCard :antique="card"/>
                </v-col>-->
                <v-col>
                <v-list>
                    <v-list-group
                            v-for="item in cards"
                            :key="item.name"
                            v-model="item.active"
                            :prepend-icon="item.action"
                            no-action
                    >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <VerificationListGroup :antique="item"/>

                        <v-list-item
                                v-for="subItem in item.items"
                                :key="subItem.name"
                        >
                            <v-list-item-content>
                                <v-list-item-title v-text="subItem.title"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                </v-list>
                </v-col>
            </v-row>
        </v-container>
        <div style="position: absolute;bottom: 1em;right: 1em">
            <v-btn
                    dark
                    fab
                    color="pink"
                    v-on:click="$router.push('/newAntique'
                )"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
    import infiniteScroll from 'vue-infinite-scroll'
    import {VerClient} from "../../client/VerClient";
    import VerificationListGroup from "../../components/VerificationListGroup";
    export default {
        name: "Verification",
        components: {VerificationListGroup},
        data:()=>({
            cards: [
            ],
            busy:false,
            pageNo:0,
            pageLen:10
        }),
        directives:{
            infiniteScroll
        },
        methods: {
            loadMore: async function() {
                this.busy = true;
                const result = await VerClient.getAntiqueNeedVerification(this.pageNo,this.pageLen)
                console.log(result)
                this.cards.push(...result.content)
                if(!result.last) {
                    this.pageNo++
                    this.busy = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>
