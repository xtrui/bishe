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
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, articleList)">删除
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
            <el-button @click="deleteSelected()">删除选中文章</el-button>
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
            }
        },
        mounted() {
            this.getArticleListByPage();
        },
        methods: {
            //删除所有文章
            deleteSelected() {
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
                this.$refs.multipleTable.selection.forEach(e => {
                    ids.push(e.id);
                })
                let indexs = [];
                this.articleList.forEach((value, index) => {
                    if (ids.indexOf(value.id) !== -1) {
                        indexs.push(index);
                    }
                })
                this.delete(ids, indexs);

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //修改文章
            handleEdit(index, row) {
                this.$router.push({path: '/admin/update/' + row.id});
                console.log(index, row);
            },
            //删除文章
            handleDelete(index, articleList) {
                let ids = [];
                let indexs = [];
                ids.push(articleList[index].id)
                indexs.push(index);
                this.delete(ids, indexs);
            },
            async delete(ids, indexs) {
                await http.post('/api/admin/deleteArticle', ids)
                    .then(res => {
                        if (res.data.status) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            indexs.forEach(e => {
                                this.articleList.splice(e, 1);
                            })

                        } else {

                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
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

</style>