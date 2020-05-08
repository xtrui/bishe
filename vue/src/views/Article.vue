<template>
    <div>
        <Banner></Banner>
        <div class="background">
            <div class="blog_post">
                <div class="post_main">
                    <el-row>
                        <el-col :span="15">
                            <BlogBody :article=article></BlogBody>
                            <button @click="drawer = true"><i class="el-icon-s-comment"></i></button>
                        </el-col>
                        <el-col :span="6">
                            <RightSlider :class="{fix:isFix}" class="hidden-md-and-down"></RightSlider>
                        </el-col>
                    </el-row>
                    <el-drawer
                            title="我是标题"
                            :visible.sync="drawer"
                            :with-header="false">
                        <BlogBody :article=article></BlogBody>
                    </el-drawer>
                </div>
            </div>
            <MyFooter></MyFooter>
        </div>
    </div>
</template>

<script>
    import Banner from "../components/Banner";
    import RightSlider from "../components/RightSlider";
    import MyFooter from "../components/Footer";
    import BlogBody from "../components/BlogBody";
    import 'element-ui/lib/theme-chalk/display.css';
    import http from 'axios';

    export default {
        name: "Article",
        components: {BlogBody, MyFooter, RightSlider, Banner},
        data() {
            return {
                drawer: false,
                isFix: true,
                flag: true,
                article: {
                    id: "",
                    title: "",
                    content: "",
                    time: "",
                    categories: '',
                    comments: ''
                },
            }
        },
        methods: {
            handleScroll() {
                let scrollTop = window.pageYOffset;
                let eTop = document.getElementsByClassName("hidden-md-and-down").item(0);
                // let footer = document.getElementsByClassName('footer').item(0);
                let flag = this.flag;
                if (scrollTop > 332 && flag) {
                    // eTop.style.top = scrollTop - 332 + "px";
                    eTop.classList.add("affix");
                    this.flag = false;
                } else if (scrollTop < 332 && !flag) {
                    eTop.classList.remove("affix");
                    eTop.style.top = "0px";
                    this.flag = true;
                }
            },
            //获取文章细节
            async getArticle() {
                await http.get("/api/article/detail/" + this.$route.params.id)
                    .then(res => {
                        this.article = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
        },
        mounted() {
            // 监听鼠标滚动事件
            window.addEventListener('mousewheel', this.handleScroll, true)
            || window.addEventListener("DOMMouseScroll", this.handleScroll, true);
            // setInterval(this.handleScroll, 200);
            // 默认求情一篇文章
            // http.get("/api/getName")
            //     .then(res => {
            //         console.log(res.data)
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     })
            this.getArticle();
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll)
            || window.removeEventListener("DOMMouseScroll", this.handleScroll, false);
        }
    }
</script>

<style scoped>
    .blog_post {
        width: 1310px;
        padding-top: 32px;
        margin-left: auto;
        margin-right: auto;

        /*float: right;*/
    }

    .post_main {
        margin: 0 60px;
        /*height: 1500px;*/
        text-align: center;
    }

    .background {
        background-image: url("../assets/zhi.gif");
    }

    i {
        font-size: 40px;
    }

    .fix {
        /*position: fixed;*/
        /*top: 100px;*/
        /*position: absolute;*/
    }

    .affix {
        position: fixed;
        top: 50px;
    }

</style>