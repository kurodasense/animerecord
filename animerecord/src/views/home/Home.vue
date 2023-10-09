<template>
  <div id="home">
    <CardItem v-for="i in 7" />
  </div>
</template>

<script>
import CardItem from '@/components/Rightcontent/CardItem'
  export default{
    name: 'Home',
    components: {CardItem},
    data(){
      return {
        anime_record: []
      }
    },
    created(){
      // this.getAnimeRecord();
    },
    methods: {
      getAnimeRecord(){
        const data = fs.readFileSync('data.json','utf8');	//读取json文件
        let temp = JSON.parse(data)	//将数据解析为json对象
        console.log(temp);
      }
    }
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