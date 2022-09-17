<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>影院管理</el-breadcrumb-item>
      <el-breadcrumb-item>影院列表</el-breadcrumb-item>
      <el-breadcrumb-item>放映厅列表</el-breadcrumb-item>
      <el-breadcrumb-item>排片计划列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 分割线 -->
    <el-divider></el-divider>
    <p>
      为
      <span style="color: #409eff; font-weight: bold">{{
        cinemaRoomInfo.cinema_name
      }}</span>
      的
      <span style="color: #409eff; font-weight: bold"
        >{{ cinemaRoomInfo.cinema_room_name }}({{
          cinemaRoomInfo.cinema_room_type
        }})</span
      >
      的排片计划列表
    </p>
    <el-divider></el-divider>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="电影名称"> </el-table-column>
      <el-table-column prop="showingon_date" label="放映时间" width="180">
      </el-table-column>
      <el-table-column prop="showingon_time" label="场次" width="120">
      </el-table-column>
      <el-table-column prop="price" label="票价" width="120"> </el-table-column>
      <el-table-column label="是否已发布" width="150">
        <template slot-scope="scope">
          <el-switch
            :active-value="1"
            :inactive-value="0"
            v-model="scope.row.status"
            @change="changeStatus(scope.row.plan_id, scope.row.status)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            title="删除该计划"
            @click="delPlan(scope.row.plan_id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return{
      cinema_room_id: this.$route.params.id,
      cinemaRoomInfo: {}, //存储放映厅的基本信息
      tableData: [], //排片计划
    };
  },
  methods: {
    changeStatus(id, status) {
      if (status == 1) {
        this.publish(id);
      } else {
        this.nopublish(id);
      }
    },
    nopublish(id) {
      this.$http.ShowingonplanApi.nopublish({ id }).then((res) => {
        console.log("未发布该排片计划", res);
        if (res.data.code == 200) {
          this.$message.warning("该排片计划已停止发布");
        }
      });
    },
    publish(id) {
      this.$http.ShowingonplanApi.publish({ id }).then((res) => {
        console.log("发布该排片计划", res);
        if (res.data.code == 200) {
          this.$message.success("该排片计划已发布");
        }
      });
    },
    // 删除排片计划方法
    delPlan(id) {
      this.$http.ShowingonplanApi.delete({ id }).then((res) => {
        console.log("删除排片计划", res);
        if (res.data.code == 200) {
          this.$message.success("删除该计划成功");
          this.loadShowingonPlans();
        }
      });
    },
    // 加载放映厅的基本信息
    loadCurrentCinemaRoom() {
      this.$http.CinemaRoomApi.queryById({ id: this.cinema_room_id }).then(
        (res) => {
          console.log("加载放映厅的基本信息", res);
          if (res.data.code == 200) {
            this.cinemaRoomInfo = res.data.data;
          }
        }
      );
    },
    // 加载当前放映厅的排片计划列表
    loadShowingonPlans() {
      this.$http.ShowingonplanApi.queryByRoomId({
        room_id: this.cinema_room_id,
      }).then((res) => {
        console.log("加载当前放映厅的排片计划列表", res);
        if (res.data.code == 200) {
          this.tableData = res.data.data;
        }
      });
    },
  },
  mounted() {
    this.loadCurrentCinemaRoom();
    // 加载当前放映厅的排片计划列表
    this.loadShowingonPlans();
  },
};
</script>

<style lang="scss" scoped></style>
