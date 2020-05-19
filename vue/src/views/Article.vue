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
                            <RightSlider :class="{fix:isFix}" :categories=categories
                                         class="hidden-md-and-down"></RightSlider>
                        </el-col>
                    </el-row>
                    <el-drawer class="drawer_rtl"
                               title="我是标题"
                               :visible.sync="drawer"
                               :with-header="false"
                               size="30%"

                    >
                        <!--                        这里放评论组件-->
                        <!--                        <BlogBody :article=article></BlogBody>-->
                        <Comment v-for="e in article.comments" :comment="e" :key="e.id"></Comment>
                        <el-pagination
                                @current-change="pageChange"
                                :current-page.sync="currentPage"
                                :page-size="9"
                                :hide-on-single-page="true"
                                layout="prev, pager, next, jumper"
                                :total="totalCommentNum"
                                :pager-count="5"
                        >
                        </el-pagination>
                        <div class="com_textarea" v-if="logined">
                            <textarea cols="80" name="msg" v-model="comment" rows="5"
                                      placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" class="ipt-txt"></textarea>
                            <el-button type="primary" style="height: 80px" @click="postComment">发表评论</el-button>
                        </div>
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
    import Comment from "../components/Comment";

    export default {
        name: "Article",
        components: {Comment, BlogBody, MyFooter, RightSlider, Banner},
        data() {
            return {
                comment: '',
                totalCommentNum: 50,
                currentPage: 1,
                drawer: false,
                isFix: true,
                flag: true,
                article: {
                    id: "",
                    title: "",
                    content: "",
                    time: "",
                    categories: '',
                    comments: []
                },
                categories: [],
                logined: 0
            }
        },
        methods: {
            pageChange() {
                //todo 评论分页
            },
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

            //发表评论
            async postComment() {
                let comment = {};
                let user = JSON.parse(localStorage.getItem("user"));

                comment.content = this.comment;
                comment.name = user.username;
                console.log(user, comment);
                await http.post("/api/users/u/postComment", {
                    content: this.comment,
                    user: user,
                    articleId: this.$route.params.id
                })
                    .then(res => {
                        if (res.status === 200) {
                            this.$message({
                                message: '发表成功，作者审核后可见',
                                type: 'success'
                            });
                        } else {
                            this.$message.error("发表失败");
                        }
                    })
                    .catch(err => {
                        this.$message.error("发表失败");
                        console.log(err);
                    })
            },
            //获取文章细节
            async getArticle() {
                await http.get("/api/article/detail/" + this.$route.params.id)
                    .then(res => {
                        this.article = res.data;
                        this.totalCommentNum = this.article.comments.height;
                        console.log(this.article)
                    })
                    .catch(err => {
                        console.log(err);
                    })
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
            this.getAllCategory();
            //获取登录状态
            let user = JSON.parse(localStorage.getItem('user'));
            console.log(user);
            if (user) {
                this.logined = 1;
            }
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll)
            || window.removeEventListener("DOMMouseScroll", this.handleScroll, false);
        }
    }
</script>

<style>
    .el-drawer.rtl {
        overflow: scroll;
        min-width: 558px;
        /*width: 420px;*/
    }
</style>
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

    .ipt-txt {
        width: 80%;
        left: 15px;
        float: left;
    }

    .com_textarea {
        padding-top: 15px;
        padding-left: 15px;
    }

</style>