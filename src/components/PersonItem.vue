<template>
    <div class="actor-item">
      <el-avatar
        shape="square"
        fit="cover"
        :size="70"
        :src="avatar"
      ></el-avatar>
      <div>{{ name }}</div>
      <i class="el-icon-error" @click="deleteActor(id)"></i>
    </div>
</template>

<script>
  export default {
    props:['id','name','avatar'],
    methods: {
      // 删除演员
      deleteActor(id) {
        // 通知父组件，点击了删除,主动触发在父组件中监听的deleteSuccess事件
        this.$emit('delete')
      },
    },
  }
</script>

<style scoped>
.actor-item {
  display: inline-block;
  margin: 20px 20px 0 0;
  text-align: center;
  position: relative;
}
.actor-item div {
  font-size: 0.9em;
}
.actor-item i{
  position: absolute;
  top: -6px;
  right: -6px;
  display: none;
}
.actor-item:hover i{
  display: block;
}
.el-avatar>>>img{
  width: 100%;
}
</style>