<template>
  <div class="main">
    <!-- 左侧导航栏 -->
    <div class="left-nav">
      <NavMain />
    </div>
    <!-- 右侧主要内容展示 -->
    <div class="right-content">
      <RouterView />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import NavMain from "../../components/Leftnav/NavMain.vue";
import CardItem from "../../components/Rightcontent/CardItem.vue";
export default {
  name: "Main",
  components: { NavMain, CardItem },
};
</script>

<style scoped lang="less">
@media (min-width: 768px) {
  .main {
    display: flex;
    margin: 0 auto;
    align-items: flex-start;

    .left-nav {
      position: sticky;
      margin-left: 10px;
      top: 0px;
      width: 500px;
    }

    .right-content {
      box-sizing: border-box;
      padding-right: 100px;
      width: 100%;
      height: 100%;
    }
  }
}

@media (max-width: 768px) {
  .main {
    position: relative;
    width: 100%;
    .left-nav {
      bottom: 0;
      width: 100%;
      height: 90px;
      position: fixed;
      z-index: 99;
      background-color: var(--color-background);
    }
    .right-content {
      width: 100%;
      height: 100%;
      padding-bottom: 90px;
    }
  }
}
</style>
