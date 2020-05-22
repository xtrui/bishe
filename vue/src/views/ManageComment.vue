<template>
    <div>
        <el-table
                ref="multipleTable"
                :data="commentList"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="日期"
                    width="170">
                <template slot-scope="scope">{{ scope.row.time }}</template>
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="ID"
                    width="40">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="name"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="内容"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    label="isPublic"
                    width="80">
                <template slot-scope="scope">{{ scope.row.public }}</template>
            </el-table-column>
            <el-table-column
                    prop="articleId"
                    label="对应文章ID"
                    width="100">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            v-if="!scope.row.public"
                            @click="publicComment(scope.$index, scope.row)">公开
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, commentList)">删除
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
            <el-button @click="deleteSelected()">删除选中评论</el-button>
            <el-button @click="publicSelected()">公开选中评论</el-button>
        </div>
    </div>
</template>

<script>
    import http from "axios";

    export default {
        name: "ManageComment",
        data() {
            return {
                commentList: [],
                currentPage: 1,
                totalArticleNum: 1
            }
        },
        mounted() {
            this.getCommentByPage();

        },
        methods: {
            async getCommentByPage() {
                await http.get('/api/admin/getCommentByPage', {params: {page: this.currentPage}})
                    .then(res => {
                        this.commentList = res.data.comments;
                        this.totalCommentNum = res.data.totalPage * 20;
                        console.log(res.data);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            handleCurrentPageChange() {

            },
            //公开单个
            publicComment(index, row) {
                let ids = [];
                let indexs = [];
                ids.push(row.id);
                indexs.push(index);
                this.public(ids, indexs);
            },
            //删除单个
            handleDelete(index, commentList) {
                this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = [];
                    let indexs = [];
                    indexs.push(index);
                    ids.push(commentList[index].id);
                    this.delete(ids, indexs);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            deleteSelected() {
                //返回的是选中row的数组
                let ids = [];
                let indexs = [];
                this.$confirm('此操作将永久删除选中评论, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$refs.multipleTable.selection.forEach(e => {
                        ids.push(e.id);
                    })
                    this.commentList.forEach((value, index) => {
                        if (ids.indexOf(value.id) !== -1) {
                            indexs.push(index);
                        }
                    })
                    this.delete(ids, indexs);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            publicSelected() {
                let ids = [];
                let indexs = [];
                this.$refs.multipleTable.selection.forEach(e => {
                    ids.push(e.id);
                })
                this.commentList.forEach((value, index) => {
                    if (ids.indexOf(value.id) !== -1) {
                        indexs.push(index);
                    }
                })
                this.public(ids, indexs);
            },
            async delete(ids, indexs) {
                await http.post('/api/admin/deleteComment', ids)
                    .then(res => {
                        if (res.data.status) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getCommentByPage();
                        } else {
                            this.$message.error("删除失败,请查看控制台");
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            async public(ids, indexs) {
                console.log(ids)
                await http.post('/api/admin/publicComment', ids)
                    .then(res => {
                        if (res.data.status) {
                            this.$message({
                                message: '公开成功',
                                type: 'success'
                            });
                            indexs.forEach(e => {
                                this.commentList[e].public = true;
                            })

                        } else {
                            this.$message.error("公开失败,请查看控制台");
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        }
    }
</script>

<style scoped>

</style>