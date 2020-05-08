<template>
    <div class="home">
        <img alt="Vue logo" src="../../public/logo.png">
        <img alt=" logo" src="2.jpg">
        <img alt=" logo" src="../assets/2.jpg">

        <!--        <img alt="gif logo" :src="BGImage">-->
        <!--        <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <right-slider></right-slider>
    </div>

</template>

<script>
    // @ is an alias to /src
    // import BGImage from  "2.jpg"
    import HelloWorld from '@/components/HelloWorld.vue'
    import RightSlider from "../components/RightSlider";


    export default {
        name: 'home',
        components: {
            RightSlider,
            HelloWorld
        },
        data() {
            return {
                // BGImage: BGImage,
            }
        }
    }
</script>

<style scoped>
    .home {
        background-color: #5fc036;
        background-image: url("https://blog.xtrui.cn//wp-content/uploads/2017/03/zhi.gif");
        height: 100%;
    }
</style>