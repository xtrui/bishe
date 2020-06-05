<template>
    <div id="footer">
        <div class="footer_content">
            <span>{{beianInfo}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "my-footer",
        data() {
            return {
                beianInfo: JSON.parse(localStorage.getItem("setting")).beianInfo
            }
        }
    }
</script>

<style scoped>
    #footer {
        width: 100%;
        height: 150px;
        padding: 30px 0 30px;
        box-sizing: border-box;
        box-shadow: 0 1px 2px aliceblue;
        border-top: #ffffff solid;
        background-color: #999999;
    }

    .footer_content {
        text-align: center;
        color: #000000;
        margin-top: 30px;
    }

    span {
        font-size: 20px;
    }
</style>