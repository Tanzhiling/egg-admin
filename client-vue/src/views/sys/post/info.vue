<template>
  <VCard icon="back" :title="auth.title" @on-back="handleCancel">
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="岗位编号" prop="postCode">
        <el-input v-model="form.postCode" style="width:300px" />
      </el-form-item>
      <el-form-item label="岗位名称" prop="postName">
        <el-input v-model="form.postName" style="width:300px" />
      </el-form-item>
      <el-form-item label="岗位类型" prop="category">
        <Select v-model="form.deptCategory" dict-type="sys_post_type" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" style="width:300px" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio label="1">启用</el-radio>
          <el-radio label="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input v-model="form.remarks" :autosize="{ minRows: 3, maxRows: 6}" type="textarea" />
      </el-form-item>
      <el-form-item v-if="!auth.readonly" label=" ">
        <el-button :loading="loading" type="primary" icon="el-icon-check" @click="handleSubmit">保存</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </VCard>
</template>
<script>
import { ApiPostAdd, ApiPostUpdate, ApiGetPostDetail } from "@/api/sys/post"
export default {
  props: {
    view: {
      type: String,
      default: ""
    },
    id: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      form: {
        postCode: "",
        postName: "",
        category: "",
        sort: "",
        remark: "",
        status: ""
      },
      rules: {
        postCode: [
          { required: true, message: '岗位编号为必填项', trigger: 'blur' },
        ],
        postName: [
          { required: true, message: '岗位名称为必填项', trigger: 'blur' },
        ],
        category: [
          { required: true, message: '岗位类型为必填项', trigger: 'blur' },
        ],
        status: [
          { required: true, message: '状态为必填项', trigger: 'blur' },
        ],
        sort: [
          { required: true, message: '排序为必填项', trigger: 'blur' },
        ],
      },
      loading: false,
    }
  },
  computed: {
    auth: function () {
      let title = "查看", readonly = true
      if (this.view === "add") {
        title = "新增"
        readonly = false
      } else if (this.view === "edit") {
        title = "编辑"
        readonly = false
      }
      return { title, readonly }
    },
  },
  mounted() {
    if (this.id) {
      this.getDetail({ id: this.id })
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.view === 'edit') {
            this.update()
          } else if (this.view === 'add') {
            this.add()
          }
        }
      });
    },
    handleCancel() {
      this.$emit("on-view", 'index')
    },
    add() {
      ApiPostAdd(this.form).then(res => {
        this.loading = false
        if (res.success) {
          this.$message.success(res.msg)
          this.handleCancel()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    update() {
      ApiPostUpdate(this.form).then(res => {
        this.loading = false
        if (res.success) {
          this.$message.success(res.msg)
          this.handleCancel()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getDetail(id) {
      ApiGetPostDetail(id).then(res => {
        if (res.success) {
          const { id, category, postCode, postName, sort, remark, status } = res.data
          this.form = { id, category, postCode, postName, sort, remark, status }
        }
      })
    }
  }
}
</script>