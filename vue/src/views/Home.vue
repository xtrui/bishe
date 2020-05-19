<template>
    <div class="home">
<!--        头部导航-->
        <nav-top></nav-top>
        <section id="section1">
            <div id="main_post">
                <div class="blog_welcome">
                    <h2 class="h2">个人博客</h2>
                    <p class="p">你好啊</p>
                </div>
                <div class="i">
                    <a href="#blog_list"><i class="el-icon-s-promotion"></i></a>
                </div>
            </div>
        </section>
        <section id="blog_list">
            <div class="article_card_container">
                <el-card v-for="e in articleList" v-bind:key="e.id" shadow="hover" class="article_card">
                    <a :href='"/articles/"+e.id'><h3 class="article_title">{{e.title}}</h3></a>
                    <h4 class="article_time">{{e.time}}</h4>
                </el-card>
            </div>
            <div>
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="20"
                        :hide-on-single-page="true"
                        layout="prev, pager, next, jumper"
                        :total="totalArticleNum">
                </el-pagination>
            </div>

        </section>
        <section id="footer">
            <MyFooter></MyFooter>
        </section>
        <el-backtop target=""></el-backtop>
    </div>

</template>

<script>
    // @ is an alias to /src
    import RightSlider from "../components/RightSlider";
    import NavTop from "../components/NavTop";
    import http from "axios";
    import MyFooter from "../components/Footer";


    export default {
        name: 'home',
        components: {
            MyFooter,
            RightSlider,
            NavTop
        },
        data() {
            return {
                // BGImage: BGImage,
                currentPage: 1,
                totalArticleNum: 1,
                articleList: [],
                totalPage: 1,
                username: ''
            }
        },
        mounted() {
            this.getArticleListByPage();
        },
        methods: {
            handleCurrentChange() {
                this.getArticleListByPage();
            },
            async getArticleListByPage() {
                await http.get('/api/article/page/' + this.currentPage)
                    .then(res => {
                        this.totalPage = res.data.totalPage;
                        this.articleList = res.data.articleIdAndTitleList;
                        this.totalArticleNum = this.totalPage * 20;
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
</script>

<style scoped>
    .home {
    }

    #section1 {
        background-image: url("../assets/post.jpg");
        background-position: center;
        min-height: 1010px;
        width: 100%;
    }

    #main_post {
        text-align: center;
        position: relative;
    }

    #blog_list {
        background-image: url("../assets/zhi.gif");
        width: 100%;
        min-height: 1010px;
        padding-top: 35px;
    }

    .blog_list {
        margin: auto;
        width: 75%;
        box-shadow: rgba(0, 0, 0, 0.05) 3px 3px;
        border: groove white;
        height: 900px;
    }

    .article_card_container {
        overflow: hidden;
    }

    .article_card {
        width: 70%;
        height: 55px;
        background-color: white;
        margin: 10px auto;
        border-radius: 5px;
        display: block;
        border: 1px solid rgba(0, 0, 0, .22);
    }

    .article_card:hover {
        background-color: #f1f1f1;
        transition: width 1s, height 1s;
        top: -6px;
        border-radius: 30px;
        position: relative;
        box-shadow: 0 3px 12px #666;
    }

    .article_time {
        float: right;
        display: block;
        width: 40%;
    }

    .article_title {
        float: left;
        display: block;
        width: 40%;
    }

    .h2 {
        margin: auto;
        font-size: 50px;
    }

    .p {
        margin: auto;
        font-size: 18px;
    }

    .blog_welcome {
        width: 100%;
        position: relative;
        height: 90px;
        top: 400px;
        color: white;
    }

    .i {
        position: relative;
        top: 600px;
    }

    i {
        font-size: 30px;
        color: white;
    }

</style>