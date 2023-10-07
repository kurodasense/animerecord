<template>
  <div id="main">
    <!-- 左侧导航栏 -->
    <NavContent/>
    <!-- 右侧主要内容展示 -->
    <div id="right-content">
      <RouterView/>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
  import NavContent from '../../components/Leftnav/NavContent.vue';
  import CardItem from '../../components/Rightcontent/CardItem.vue';
  export default {
      components: { NavContent, CardItem }
  }
</script>
<style scoped>
  #main{
    display: flex;
    flex: 1 auto;
    margin: 0 auto;
    justify-content: center;
  }

</style>