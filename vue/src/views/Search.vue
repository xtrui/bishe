<template>
    <div>
        <Banner></Banner>
        <div class="background">
            <div class="blog_post">
                <div class="post_main">
                    <el-row>
                        <el-col :span="15" class="main_body">
                            <h1>search: {{this.$route.params.key}}</h1>
                            <!--                            这里放文章列表-->
                            <el-row v-for="index in row" :key="index" class="row">
                                <el-col :span="6" v-for="(o, i) in 3" :key="o" :offset="i > 0 ? 2 : 0"
                                        v-if="articleNum > (index-1) *3 + i"
                                >
                                    <transition name="el-zoom-in-center">
                                        <el-card v-show="show" :body-style="{ padding: '0px' }"
                                                 shadow="hover">
                                            <a :href='"/articles/"+articles[(index-1)*3+i].id'>
                                                <img src='../assets/default.jpg' class="image" alt="picture">
                                                <div style="padding: 0 14px;">
                                                    <span class="article_title">{{articles[(index-1)*3+i].title}}</span>
                                                    <!--                                                    <span class="article_title">{{(index-1) *3 + i}}</span>-->
                                                    <div class="bottom clearfix">
                                                        <time class="article_time">{{articles[(index-1)*3+i].time }}
                                                        </time>
                                                    </div>
                                                </div>
                                            </a>
                                        </el-card>
                                    </transition>
                                </el-col>
                            </el-row>
                            <el-pagination
                                    @current-change="handleCurrentChange"
                                    :current-page.sync="currentPage"
                                    :page-size="9"
                                    :hide-on-single-page="true"
                                    layout="prev, pager, next, jumper"
                                    :total="totalArticleNum">
                            </el-pagination>
                        </el-col>

                        <el-col :span="6">
                            <RightSlider :class="{fix:isFix}" :categories=categories
                                         class="hidden-md-and-down"></RightSlider>
                        </el-col>
                    </el-row>

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
                isFix: true,
                flag: true,
                categories: [],
                articles: [],
                show: false,
                categoryName: "",
                articleNum: 0,
                row: 0,
                col: 0,
                currentPage: 1,
                totalArticleNum: 0,
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
            //获取目录
            async getAllCategory() {
                await http.get("/api/article/category/All")
                    .then(res => {
                        this.categories = res.data;
                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            //根据关键字查找文章
            async getArticlesBySearch() {
                let key = this.$route.params.key;
                await http.get("/api/article/search", {params: {key: key, page: this.currentPage}})
                    .then(res => {

                        let articleNum = res.data.articleIdAndTitleList.length;
                        this.articleNum = articleNum;
                        if (articleNum % 3 === 0) {
                            this.row = articleNum / 3;
                        } else if (articleNum < 3) {
                            this.row = 1;
                        } else {
                            this.row = Math.ceil(articleNum / 3);
                        }
                        this.totalArticleNum = 9 * res.data.totalPage;
                        this.articles = res.data.articleIdAndTitleList;


                    })
                    .catch(err => {
                        console.log(err);
                    })

            },

            // 处理页面变化
            handleCurrentChange() {
                this.getArticlesBySearch();
                let thisLink = this;
                this.show = false;
                setTimeout(function () {
                    thisLink.show = true;
                }, 1000)
            }

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
            this.getAllCategory();
            // this.getCategoryArticleByPage(this.$route.params.id, 1);
            // this.getCategoryArticlesTotalNum(this.$route.params.id);
            // console.log(this.$route.params);
            let thisLink = this;
            this.getArticlesBySearch();
            setTimeout(function () {
                thisLink.show = true;
            }, 1000)
            // this.show=!this.show;
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

    .main_body {
        border: groove;
        height: 800px;

    }

    .post_main {
        margin: 0 60px;
        min-height: 800px;
        text-align: center;
    }

    .background {
        background-image: url("../assets/sang.jpg");
    }

    i {
        font-size: 40px;
    }

    .row {
        margin-bottom: 25px;
        margin-left: 50px;
        margin-top: 40px;
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

    a {
        text-decoration: none;
    }


    .image {
        width: 100%;
        height: 50%;
        display: block;
    }

    h1 {
        font-size: 40px;
        color: gray;
        font-weight: 400;
        margin: 15px 0 15px;

    }

    .article_title {
        font-size: 22px;
        font-weight: 300;
        margin-bottom: 8px;
    }

    .bottom {
        margin-top: 9px;
    }
</style>