<template>
  <div id="home">
    <CardItem v-for="i in 7" />
  </div>
</template>

<script>
import CardItem from '@/components/Rightcontent/CardItem'
  export default{
    name: 'Home',
    components: {CardItem}
  }


</script>

<style scoped>
  #home{
    width: 100%;
    display: flex;
    flex: 1;
    flex-wrap: wrap;
  }
</style>