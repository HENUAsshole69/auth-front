<template>
    <div  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0">
    <v-container fluid>
        <v-row dense>
            <v-col
                    v-for="card in cards"
                    :key="card.title">
                    <!--:cols="card.flex"-->
                <AntiqueCard :antique="card"/>
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
    import {AntiqueClient} from "../../client/AntiqueClient";
    import AntiqueCard from "../../components/AntiqueCard";
    export default {
        name: "Antique",
        components: {AntiqueCard},
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
                const result = await AntiqueClient.getAntique(this.pageNo,this.pageLen)
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
