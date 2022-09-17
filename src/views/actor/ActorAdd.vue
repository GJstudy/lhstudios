<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>演员管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增演员</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 添加演员表单 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="演员姓名">
        <el-input style="width: 300px" v-model="form.actorName"></el-input>
      </el-form-item>
      <el-form-item label="演员头像">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:9000/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-image fit="contain" v-if="form.actorAvatar" :src="form.actorAvatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即新增</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        //绑定表单数据
        actorName: "",
        actorAvatar: "",
      },
    };
  },
  methods: {
    // 提交表单
    onSubmit() {
      // 发送post请求，提交添加演员的参数，实现业务
      this.$http.ActorApi.add(this.form).then((res) => {
          console.log("添加演员请求", res);
          if (res.data.code == 200) {
            this.$message.success("添加成功");
            this.$router.push("/home/actor-list");
          }
        })
    },
    // 上传图像
    handleAvatarSuccess(res, file) {
      console.log(res);
      if (res.code == 200) {
        this.form.actorAvatar = res.data;
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
  },
};
</script>

<style soped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
