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
                    @mouseleave="onLoad"
            >
                <v-icon>mdi-qrcode</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-container fluid>
                <v-row no-gutters>
                    <v-col>
                        <canvas ref="qrCanvas"/>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-menu>
</template>

<script>
    import QRCode from "qrcode";

    export default {
        name: "QRDisplay",
        props:{
           content:String
        },
        methods:{
            onLoad:function () {
                QRCode.toCanvas(this.$refs['qrCanvas'], this.content, function (error) {
                    if (error) console.error(error)
                    console.log('success!');
                })
            }
        }
    }
</script>

<style scoped>

</style>
