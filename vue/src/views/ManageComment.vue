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
                            @click="publicComment(scope.$index, scope.row)">公开
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
        name: "ManageComment",
        data() {
            return {
                commentList: [],
                currentPage: 1,
                totalArticleNum: 1
            }
        },
        mounted() {

        },
        methods: {
            handleCurrentPageChange() {

            },
            deleteSelected() {
                //返回的是选中row的数组
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
                this.delete(ids);
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
        }
    }
</script>

<style scoped>

</style>