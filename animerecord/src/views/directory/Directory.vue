<template>
  <div id="directory">
    <el-empty v-if="this.anime_date <= 0" class="empty-center" description='暂无追番记录' />
    <el-timeline v-else :reverse="true">
      <el-timeline-item v-for="date in anime_date" type="primary" :hollow="true" :timestamp="date.date_name"
        :hide-timestamp="true" placement="top" size="large">
        <div class="timestamp">
          {{ date.date_name }}
        </div>
        <DirectoryItem :date="date" />
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import { getAnimeDate } from "@/network/api";
import DirectoryItem from "@/components/Rightcontent/DirectoryItem.vue";
export default {
  name: 'Directory',
  components: { DirectoryItem },
  data() {
    return {
      anime_date: []
    }
  },
  created() {
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

<style scoped lang="less">
#directory {
  margin-top: 20px;

  .timestamp {
    text-align: left;
    font-size: var(--timestamp-title-font-size);
    font-weight: var(--font-weight);
    color: var(--timestamp-title-color);
    margin-bottom: 8px;
    padding-top: 4px;
  }

}
</style>