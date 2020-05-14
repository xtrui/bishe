<template>
    <div class='nav_top'>
        <div class="container">
            <div class="index">
                <a href="/" class="homeLink">主页</a>
            </div>
            <div class="otherNav">
                <div class="li"><a href="/category">分类</a></div>
                <div class="li"><a href="/admin">后台</a></div>
                <div class="li"><a href="/articles">登录</a></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NavTop"
    }
</script>

<style scoped>
    .nav_top {
        width: 100%;
        position: fixed;
        z-index: 100;
        height: 70px;
        overflow: hidden;
    }

    .container {
        height: 70px;
    }

    .homeLink {
        font-size: 30px;
        font-weight: bold;
        color: #ffffff;
        padding: 15px 50px 15px;

    }

    a {
        text-decoration: none;
        background-color: transparent;
        display: block;
        color: #ffffff;
    }

    .index {
        text-align: left;
        width: 30%;
        height: 100%;
        float: left;
        margin: 0;
    }

    .otherNav {
        float: left;
        width: 70%;
        height: 100%;
    }

    .li {
        float: right;
        height: 100%;
        width: 15%;
        padding-right: 15px;
        padding-top: 15px;
        font-size: 30px;
        font-weight: bold;
    }

</style>