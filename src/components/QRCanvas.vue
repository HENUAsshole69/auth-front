<template>
    <canvas ref="qrCanvas"/>
</template>

<script>
    import QRCode from "qrcode";
    export default {
        name: "QRCanvas",
        props:{
            content:String
        },
        mounted() {
            QRCode.toCanvas(this.$refs['qrCanvas'], this.content, function (error) {
                if (error) console.error(error)
                console.log('success!');
            })
        }
    }
</script>

<style scoped>

</style>
