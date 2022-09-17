<template>
  <div>
    <el-row>
      <el-col :span="12">
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>电影管理</el-breadcrumb-item>
          <el-breadcrumb-item>电影列表</el-breadcrumb-item>
          <el-breadcrumb-item>修改电影</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <el-form :rules="rules" ref="form" :model="form" label-width="80px">
          <el-form-item label="封面图片" prop="cover">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:9000/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <el-image
                fit="contain"
                v-if="form.cover"
                :src="form.cover"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="电影类别" prop="category_id">
            <el-radio-group v-model="form.category_id">
              <el-radio :label="1">热映</el-radio>
              <el-radio :label="2">待映</el-radio>
              <el-radio :label="3">经典</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="电影名称" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="电影类别" prop="type">
            <el-select
              v-model="form.type"
              multiple
              placeholder="请选择电影类型"
            >
              <el-option
                v-for="item in movieTypes"
                :key="item.id"
                :label="item.typename"
                :value="item.typename"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电影主演" prop="star_actor">
            <el-select
              v-model="form.star_actor"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入主演名称"
              :remote-method="loadActorsByName"
              :loading="loadingActors"
            >
              <el-option
                v-for="item in actorList"
                :key="item.id"
                :label="item.actor_name"
                :value="item.actor_name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上映时间" prop="showingon">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
              v-model="form.showingon"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="电影评分" prop="score">
            <el-input v-model="form.score"></el-input>
          </el-form-item>
          <el-form-item label="电影时长" prop="duration">
            <el-input v-model="form.duration"></el-input>
          </el-form-item>
          <el-form-item label="电影简介" prop="description">
            <el-input type="textarea" v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即更新</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

   
  </div>
</template>
<script>
export default {
  data() {
    return {
      
      actorList: null, //绑定演员列表
      loadingActors: false, //绑定是否正在加载演员列表
      movieTypes: null,
      form: {
        id: this.$route.params.id,
        //封装表单数据
        cover: "",
        category_id: 1, //默认选中1
        title: "",
        type: "",
        star_actor: "",
        showingon: "",
        score: "",
        duration: "",
        description: "",
      },
      rules: {
        cover: [{ required: true, message: "请选择图片", trigger: "blur" }],
        title: [{ required: true, message: "请填写电影标题", trigger: "blur" }],
        type: [{ required: true, message: "请填写电影类型", trigger: "blur" }],
        star_actor: [
          { required: true, message: "请填写主演", trigger: "blur" },
        ],
        showingon: [
          { required: true, message: "请选择上映时间", trigger: "blur" },
        ],
        score: [{ required: true, message: "请填写评分", trigger: "blur" }],
        duration: [
          { required: true, message: "请填写电影时长", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请填写电影简介", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
   
    // 通过名称模糊查询演员列表
    loadActorsByName(query) {
      this.$http.ActorApi.listByName({ name: query }).then((res) => {
        console.log("通过名称模糊查询列表", res);
        this.actorList = res.data.data;
        this.loadingActors = false;
      });
    },
    onSubmit() {
      this.form.type = this.form.type.join("/");
      this.form.star_actor = this.form.star_actor.join("/");
      console.log("submit!", this.form);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$http.MovieApi.update(this.form).then((res) => {
            console.log("新增电影请求", res);
            if (res.data.code == 200) {
              this.$message.success("修改/更新成功");
              this.$router.push("/home/movie-list");
            }
          });
        } else {
          this.$message.warning("请完善表单！");
        }
      });
    },
    // 上传图像
    handleAvatarSuccess(res, file) {
      console.log(res);
      if (res.code == 200) {
        this.form.cover = res.data; //将返回的图片路径，赋值给cover属性
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    // 加载所有的电影类型
    loadAllMovieTypes() {
      this.$http.MovieApi.listAllMovieTypes().then((res) => {
        console.log("电影类型", res);
        this.movieTypes = res.data.data;
      });
    },
    // 加载当前电影的详细信息
    loadMovieInfo() {
      this.$http.MovieApi.queryById({ id: this.form.id }).then((res) => {
        console.log("加载当前电影详细信息", res);
        this.form = res.data.data;
        // 重新整理star_actor
        this.form.star_actor = this.form.star_actor.split("/");
        this.form.type = this.form.type.split("/");
      });
    },
  },
  mounted() {
    // 加载所有的电影类型
    this.loadAllMovieTypes();
    // 加载当前电影的详细信息，回填表单
    this.loadMovieInfo();
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
