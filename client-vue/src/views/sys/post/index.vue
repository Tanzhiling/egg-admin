<template>
  <VCard icon="s-promotion" title="岗位管理">
    <template slot="extra">
      <el-button type="success" icon="el-icon-plus" @click="handleView('add')">新增</el-button>
    </template>
    <VForm slot="form" :data="form.data" :model="form.model" @on-ok="handleSearch" />
    <el-table ref="table" :data="data" border>
      <el-table-column prop="postCode" label="岗位编号" />
      <el-table-column prop="postName" label="岗位名称" />
      <el-table-column prop="category" label="岗位类型" />
      <el-table-column prop="sort" label="排序" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="status" label="状态" width="100" align="center">
        <template slot-scope="{row}">
          <el-tag v-if="row.status==='1'" type="success" effect="dark">启用</el-tag>
          <el-tag v-else type="danger" effect="dark">停用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="{row}">
          <el-button
            type="text"
            icon="el-icon-view"
            size="small"
            @click="handleView('info',row.id)"
          >查看</el-button>
          <el-button
            type="text"
            icon="el-icon-edit"
            size="small"
            @click="handleView('edit',row.id)"
          >编辑</el-button>
          <el-button type="text" icon="el-icon-delete" size="small" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </VCard>
</template>
<script>
import { ApiGetPostList, ApiPostDelete } from "@/api/sys/post"
export default {
  data() {
    return {
      form: {
        model: {
          postName: "",
        },
        data: [
          {
            component: "Input",
            label: "岗位名称",
            field: "postName"
          },
        ],
      },
      data: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    handleView(view, id) {
      this.$emit("on-view", view, id)
    },
    handleSearch(payload) {
      this.getList(payload)
    },
    handleDelete(id) {
      this.$confirm('确定将选择数据删除?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ApiPostDelete({ id }).then(res => {
          if (res.success) {
            this.$message.success(res.msg)
            this.getList()
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    getList(payload) {
      ApiGetPostList(payload).then(res => {
        if (res.success) {
          this.data = res.data
        }
      })
    }
  }
}
</script>