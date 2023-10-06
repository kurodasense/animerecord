<template>
  <div id="main">
    <!-- 左侧导航栏 -->
    <NavContent />
    <!-- 右侧主要内容展示 -->
    <CardItem />
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
  
</style>