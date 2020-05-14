<template>
    <div id="banner">
        <div>
            <h2>个人博客</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Banner"
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