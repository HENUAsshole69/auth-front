<template>
    <v-container>
        <v-row>
            <v-col
                    v-for="item in verifications"
                    :key="item.id">
                <v-card
                        dark
                >
                    <v-card-title class="headline">{{item.content}}</v-card-title>

                    <v-card-subtitle>{{item.stage}}</v-card-subtitle>

                    <!--<v-card-actions>
                        <v-btn text>Listen Now</v-btn>
                    </v-card-actions>-->
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "VerificationDisplay",
        props:{
            verifications:[]
        }
    }
</script>

<style scoped>

</style>
