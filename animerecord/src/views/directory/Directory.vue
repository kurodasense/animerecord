<template>
  <div class="directory" v-loading="directory_loading">
    <el-empty
      v-if="this.anime_date <= 0"
      class="empty-center"
      description="暂无追番记录"
    />
    <el-timeline v-else :reverse="true">
      <el-timeline-item
        class="el-timeline-item"
        v-for="date in sortedAnimeDates"
        :key="date.date_id"
        type="primary"
        :hollow="true"
        :timestamp="date.date_name"
        :hide-timestamp="true"
        placement="top"
        size="large"
      >
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
import gsap from "gsap";
export default {
  name: "Directory",
  components: { DirectoryItem },
  data() {
    return {
      anime_date: [],
      directory_loading: false,
    };
  },
  computed: {
    sortedAnimeDates() {
      return this.anime_date.toSorted((a, b) => {
        let [a_year, a_month] = a.date_name.split(".");
        let [b_year, b_month] = b.date_name.split(".");
        if (a_year > b_year) return 1;
        else if (a_year < b_year) return -1;
        else if (a_year == b_year) {
          return a_month < b_month;
        }
      });
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.directory_loading = true;
      getAnimeDate()
        .then((res) => {
          let { status, msg, data } = res.data;
          if (status === 200) {
            this.anime_date = data;
            this.directory_loading = false;
          } else {
            const { status, msg, data } = err.response.data;
            this.$message.error(msg);
            this.directory_loading = false;
          }
        })
        .catch((err) => {
          const { status, msg, data } = err.response.data;
          this.$message.error(msg);
          this.directory_loading = false;
        });
    },
  },
  mounted() {
    gsap.from(".directory", { y: "100%", duration: 1, ease: "none" });
  },
};
</script>

<style scoped lang="less">
.directory {
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
