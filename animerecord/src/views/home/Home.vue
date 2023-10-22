<template>
  <div id="home">
    <el-empty class="empty-center" description='暂无追番记录' v-if="anime_date.length == 0" />
    <CardItem v-else v-for="date in anime_date" :date="date" />
  </div>
</template>

<script>
// import Data from "@/data/data.json"
import CardItem from '@/components/Rightcontent/CardItem'
import { getAnimeDate } from "@/network/api";
export default {
  name: 'Home',
  components: { CardItem },
  data() {
    return {
      anime_date: []
    }
  },
  created() {
    // 获取所有的追番日期
    this.getData();
  },
  methods: {
    getData() {
      getAnimeDate().then(res => {
        let { status, msg, data } = res.data;
        if (status === 200) {
          this.anime_date = data;
        } else {
          this.$message.error(msg);
        }
      }).catch(err => {
        this.$message.error(err);
      });
    },
  }
}


</script>

<style scoped>
#home {
  width: 100%;
  display: flex;
  flex: 1;
  flex-wrap: wrap;

  .empty-center {
    margin: auto;
    width: 50%;
  }
}
</style>