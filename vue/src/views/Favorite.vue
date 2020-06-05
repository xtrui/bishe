<template>
    <div>
        <el-table
                ref="multipleTable"
                :data="articleList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="日期"
                    width="200">
                <template slot-scope="scope">{{ scope.row.time }}</template>
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="ID"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="标题"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="gotoArticle(scope.$index, scope.row)">查看
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleCancel(scope.$index, articleList)">取消收藏
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <el-pagination
                    @current-change="handleCurrentPageChange"
                    :current-page.sync="currentPage"
                    :page-size="20"
                    :hide-on-single-page="true"
                    layout="prev, pager, next, jumper"
                    :total="totalArticleNum">
            </el-pagination>
        </div>
        <div style="margin-top: 20px">
            <el-button @click="cancelSelected()">取消收藏选中选中文章</el-button>
            <!--            <el-button @click="toggleSelection()">取消选择</el-button>-->
        </div>
    </div>
</template>

<script>
    import http from "axios";

    export default {
        name: "ManageArticle",
        data() {
            return {
                currentPage: 1,
                totalArticleNum: 1,
                articleList: [],
                totalPage: 1,
                userId: null,
            }
        },
        mounted() {
            let user = JSON.parse(localStorage.getItem('user'));
            this.userId = user.id;
            this.getArticleListByPage();
        },
        methods: {
            //删除所有文章
            cancelSelected() {
                // if (rows) {
                //     rows.forEach(row => {
                //         //选择某一项
                //         this.$refs.multipleTable.toggleRowSelection(row);
                //     });
                // } else {
                //     //取消选择
                //     this.$refs.multipleTable.clearSelection();
                // }

                //返回的是选中row的数组
                let ids = [];


                this.$confirm('取消收藏选中文章, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '放弃',
                    type: 'warning'
                }).then(() => {
                    let user = JSON.parse(localStorage.getItem('user'));
                    this.$refs.multipleTable.selection.forEach(e => {
                        this.cancel(user.id, e.id);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //删取消收藏文章
            async handleCancel(index, articleList) {
                let user = JSON.parse(localStorage.getItem('user'));
                await this.cancel(user.id, articleList[index].id);
            },
            async cancel(userId, articleId) {
                await http.post("/api/users/u/cancelCollection", {
                    userId: userId,
                    articleId: articleId
                })
                    .then(res => {
                        if (res.data) {
                            this.isFavorite = 0;
                            this.$notify({
                                title: "OK",
                                message: "取消收藏成功",
                                type: "success",
                                duration: 0
                            });
                        } else {
                            this.$notify.error("取消收藏失败")
                        }
                    })
                    .catch(e => {
                        this.$notify.error("取消收藏出错，请查看控制台")
                        console.log(e);
                    })
                await this.getArticleListByPage()
            },
            //跳转到文章页面
            gotoArticle(index, row) {
                this.$router.push({path: '/articles/' + row.id});
            },
            handleCurrentPageChange() {
                this.getArticleListByPage();
            },
            //分页获取文章
            async getArticleListByPage() {
                await http.get('/api/users/u/getFavoriteByPage', {
                    params: {
                        page: this.currentPage,
                        userId: this.userId
                    }
                })
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

</style>