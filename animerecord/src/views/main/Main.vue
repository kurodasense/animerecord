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
    flex: 1;
    margin: 0 auto;
    align-items: flex-start;

    .left-nav {
      position: sticky;
      top: 0px;
      width: 500px;
      margin: 0 25px;
    }

    .right-content {
      width: 100%;
      height: 100%;
      margin: 0 25px 0 50px;
    }
  }
}

@media (max-width: 768px) {
  .left-nav {
    left: 0;
    bottom: 0;
    width: 100%;
    position: fixed;
    z-index: 999999;
    background-color: var(--color-background);
  }
  .right-content {
    width: 100%;
    height: 100%;
    padding-bottom: 90px;
  }
}
</style>
