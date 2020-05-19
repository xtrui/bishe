<template>
    <div id="banner">
        <NavTop></NavTop>
        <div>
            <h2>个人博客</h2>
        </div>
    </div>
</template>

<script>
    import NavTop from "./NavTop";

    export default {
        name: "Banner",
        components: {NavTop},
        data() {
            return {
                username: ''
            }
        }
    }
</script>

<style scoped>
    #banner {
        width: 100%;
        height: 300px;
        overflow: hidden;
        background-image: url("../assets/2.jpg");
        background-position: center;
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    h2 {
        font-weight: 400;
        color: white;
        font-size: 40px;
        text-shadow: 2px 2px 2px #666;
    }
</style>