<template>
  <el-card ref="cardItem" class="box-card" v-loading="card_loading">
    <template #header>
      <div class="card-header">
        <span v-if="isUpdateDateName" style="width: 80px">
          <el-input
            v-model="date.date_name"
            ref="dateNameInput"
            @blur="hideUpdateDateName"
            @change="updateDateName"
          ></el-input>
        </span>
        <span v-else @dblclick="dblClick">{{ date.date_name }}</span>
        <div style="text-align: right">
          <el-popover placement="top" trigger="click">
            <template #reference>
              <el-button class="button" type="danger" text
                >删除记录表</el-button
              >
            </template>
            <el-text tag="p" type="danger">确认删除?</el-text>
            <div style="text-align: right; margin-top: 10px">
              <el-button size="small" type="primary" @click="delRecord"
                >确认</el-button
              >
            </div>
          </el-popover>
          <el-button class="button" text @click="addRecord">添加追番</el-button>
        </div>
      </div>
    </template>
    <el-scrollbar height="300px">
      <el-empty v-if="record.length <= 0" description="暂无记录捏" />
      <el-table
        v-else
        :data="record"
        border
        style="width: 100%"
        :show-header="false"
        :cell-style="cellStyle"
        :row-class-name="tableRowClassName"
        @cell-dblclick="tabClick"
      >
        <el-table-column prop="anime_name" label="anime_name" width="auto">
          <template #default="scope">
            <span
              v-if="
                scope.row.index === tabClickIndex &&
                tabClickLabel === 'anime_name'
              "
            >
              <el-input
                v-model="scope.row.anime_name"
                autosize
                ref="elinput"
                @blur="inputBlur"
                @change="updateAnimeName(scope.row)"
              />
            </span>
            <span v-else>{{ scope.row.anime_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="watch_status"
          label="watch_status"
          width="80"
          align="center"
        >
          <template #default="scope">
            <span
              v-if="
                scope.row.index === tabClickIndex &&
                tabClickLabel === 'watch_status'
              "
            >
              <el-input
                v-model="scope.row.watch_status"
                ref="elinput"
                @blur="inputBlur"
                @change="updateWatchStatus(scope.row)"
              />
            </span>
            <span v-else>{{ scope.row.watch_status }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </el-card>
</template>

<script>
import {
  getAnimeRecordByDateId,
  updateNewAnimeRecord,
  deleteAnimeRecord,
  updateNewAnimeWatchStatus,
  updateRecordDateName,
} from "@/network/api";
import gsap from "gsap";
export default {
  name: "CardItem",
  inject: ["reload"],
  props: {
    date: {},
  },
  data() {
    return {
      record: [],
      tabClickIndex: null, // 当前点击的单元格
      tabClickLabel: "", // 当前点击的列名
      isUpdateDateName: false,
      card_loading: false, // 展示加载动画
    };
  },
  created() {
    this.getAnimeRecord();
  },
  methods: {
    getAnimeRecord() {
      getAnimeRecordByDateId(this.date.date_id)
        .then((res) => {
          let { status, msg, data } = res.data;
          if (status === 200) {
            this.record = data;
          } else {
            this.$message.error(msg);
          }
        })
        .catch((err) => {
          const { status, msg, data } = err.response.data;
          this.$message.error(msg);
        });
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      switch (row.watch_status) {
        case "待看":
          if (columnIndex === 1) return { background: "yellow" };
        case "看完":
          if (columnIndex === 1) return { background: "red", color: "white" };
        default:
          if (columnIndex === 1) return { background: "" };
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex;
    },
    tabClick(row, column, cell, event) {
      this.tabClickIndex = row.index;
      this.tabClickLabel = column.label;
      this.$nextTick(() => {
        this.$refs.elinput.focus();
      });
    },
    inputBlur() {
      this.tabClickIndex = null;
      this.tabClickLabel = "";
    },
    updateAnimeName(row) {
      this.tabClickIndex = null;
      this.tabClickLabel = "";
      // todo: 保存数据
      let record_id = row.record_id;
      if (record_id == null) {
        record_id = new Date().Format("yyyyMMddHHmmss");
      }
      this.card_loading = true;
      updateNewAnimeRecord(
        record_id,
        this.date.date_id,
        row.anime_name,
        row.watch_status
      )
        .then((res) => {
          let { status, msg, data } = res.data;
          if (status === 200) {
            // todo
            row.record_id = record_id;
            this.card_loading = false;
          } else {
            const { status, msg, data } = err.response.data;
            this.$message.error(msg);
            this.card_loading = false;
          }
        })
        .catch((err) => {
          const { status, msg, data } = err.response.data;
          this.$message.error(msg);
          this.card_loading = false;
        });
    },
    updateWatchStatus(row) {
      this.tabClickIndex = null;
      this.tabClickLabel = "";
      let { record_id, anime_name, watch_status } = row;
      this.card_loading = true;
      updateNewAnimeWatchStatus(
        record_id,
        this.date.date_id,
        anime_name,
        watch_status
      )
        .then((res) => {
          let { status, msg, data } = res.data;
          if (status === 200) {
            // todo
            this.card_loading = false;
          } else {
            const { status, msg, data } = err.response.data;
            this.$message.error(msg);
            this.card_loading = false;
          }
        })
        .catch((err) => {
          const { status, msg, data } = err.response.data;
          this.$message.error(msg);
          this.card_loading = false;
        });
    },
    addRecord() {
      this.record.push({ anime_name: "new anime", watch_status: "待看" });
    },
    delRecord() {
      this.card_loading = true;
      deleteAnimeRecord(this.date.date_id)
        .then((res) => {
          let { status, msg, data } = res.data;
          if (status === 200) {
            this.$message.success(`已删除记录 ${this.date.date_name}`);
            this.card_loading = false;
            this.reload();
          } else {
            const { status, msg, data } = err.response.data;
            this.$message.error(msg);
            this.card_loading = false;
          }
        })
        .catch((err) => {
          const { status, msg, data } = err.response.data;
          this.$message.error(msg);
          this.card_loading = false;
        });
    },
    dblClick() {
      this.isUpdateDateName = true;
      this.$nextTick(() => {
        this.$refs.dateNameInput.focus();
      });
    },
    hideUpdateDateName() {
      this.isUpdateDateName = false;
    },
    updateDateName() {
      this.card_loading = true;
      updateRecordDateName(this.date.date_id, this.date.date_name)
        .then((res) => {
          let { status, msg, data } = res.data;
          if (status === 200) {
            this.isUpdateDateName = false;
            this.card_loading = false;
          } else {
            const { status, msg, data } = err.response.data;
            this.$message.error(msg);
            this.card_loading = false;
          }
        })
        .catch((err) => {
          const { status, msg, data } = err.response.data;
          this.$message.error(msg);
          this.card_loading = false;
        });
    },
  },
  mounted() {
    gsap.to(".box-card", {
      y: "0",
      duration: 0.5,
      stagger: 0.1,
      ease: "none",
    });
  },
};
</script>
<style scoped lang="less">
.box-card {
  transform: translateY(100vh);
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
