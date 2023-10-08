<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>追番日期</span>
        <el-button class="button" text>Operation button</el-button>
      </div>
    </template>
    <el-scrollbar height="200px">
      <el-table :data="tableData" border style="width: 100%" :show-header="false" :cell-style="cellStyle">
        <el-table-column prop="anime_name" label="anime_name" width="auto" />
        <el-table-column prop="watch_status" label="watch_status" width="60" align="center" />
      </el-table>
    </el-scrollbar>
  </el-card>
</template>

<script>
export default {
  name: 'CardItem',
  data() {
    return {
      tableData: [
        { anime_name: "因想当冒险者而前往大都市的女儿已经升到了S级", watch_status: "在看" },
        { anime_name: "葬送的芙莉莲", watch_status: "待看" },
        { anime_name: "我推是反派大小姐", watch_status: "在看" },
        { anime_name: "SHY 腼腆英雄", watch_status: "看完" },
      ]
    }
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      switch (row.watch_status) {
        case "在看":
          if (columnIndex === 1) return { "background": "yellow" }
        case "待看":
          if (columnIndex === 1) return { "background": "" }
        case "看完":
          if (columnIndex === 1) return { "background": "red" }
      }
    }
  }
}

</script>
<style scoped>
.box-card {
  width: 400px;
  height: 300px;
  margin: 10px 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>