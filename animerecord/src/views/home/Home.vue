<template>
  <div id="home" v-loading="home_loading">
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
      anime_date: [],
      home_loading: false
    }
  },
  created() {
    // 获取所有的追番日期
    this.getData();
  },
  methods: {
    getData() {
      this.home_loading = true;
      getAnimeDate().then(res => {
        let { status, msg, data } = res.data;
        if (status === 200) {
          this.anime_date = data;
          this.home_loading = false;
        } else {
          this.$message.error(msg);
          this.home_loading = false;
        }
      }).catch(err => {
        this.$message.error(err);
        this.home_loading = false;
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