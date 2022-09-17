<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>导演管理</el-breadcrumb-item>
      <el-breadcrumb-item>新增导演</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <!-- 添加导演表单 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="导演姓名">
        <el-input style="width: 300px" v-model="form.directorName"></el-input>
      </el-form-item>
      <el-form-item label="导演头像">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:9000/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-image fit="contain" v-if="form.directorAvatar" :src="form.directorAvatar" class="avatar" />
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
        directorName: "",
        directorAvatar: "",
      },
    };
  },
  methods: {
    // 提交表单
    onSubmit() {
      // 发送post请求，提交添加导演的参数，实现业务
      this.$http.DirectorApi.add(this.form).then((res) => {
          console.log("添加导演请求", res);
          if (res.data.code == 200) {
            this.$message.success("添加成功");
            this.$router.push("/home/director-list");
          }
        })
    },
    // 上传图像
    handleAvatarSuccess(res, file) {
      console.log(res);
      if (res.code == 200) {
        this.form.directorAvatar = res.data;
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
