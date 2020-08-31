<template>
    <v-menu
            v-model="qrMenu"
            :close-on-content-click="false"
            offset-x
            offset-y
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
            >
                <v-icon>mdi-certificate</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-container fluid>
                <v-row no-gutters>
                <v-col>
                    <img :src="pic" />
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-menu>
</template>

<script>
    import QRCode from "qrcode";
    import QRCanvas from "@/components/QRCanvas";
    import {AntiqueClient} from "../../../client/AntiqueClient";

    export default {
        name: "CertDownloader",
        components: {},
        props:{
            antique:Object
        },
        data:()=>({
            qrMenu:false,
            pic:''
        }),
            mounted:async function () {
                this.pic ='data:image/jpeg;base64, '+ (await AntiqueClient.getAntiqueCert(this.antique.id)).data
            }
    }
</script>

<style scoped>

</style>
