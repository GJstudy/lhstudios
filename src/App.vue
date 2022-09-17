<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
*{
  margin: 0px;
  padding: 0px;
  text-decoration: none;
}
.scroll-container::webkit-scrollbar{
  width: 6px;
}
.scroll-container::webkit-scrollbar-track{
  background-color: #efefef;
  width: 6px;
}
.scroll-container::webkit-scrollbar-thumb{
  background: #bfbfbf;
  border-radius: 3px;
  width: 6px;
}
</style>
