<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{record_date}}</span>
        <el-button class="button" text @click="addRecord">添加</el-button>
      </div>
    </template>
    <el-scrollbar height="300px">
      <el-table 
        :data="tableData" 
        border 
        style="width: 100%" 
        :show-header="false" 
        :cell-style="cellStyle" 
        :row-class-name="tableRowClassName"
        @cell-dblclick="tabClick">
        <el-table-column prop="anime_name" label="anime_name" width="auto">
          <template #default="scope">
            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'anime_name'">
              <el-input 
                v-model="scope.row.anime_name" 
                type="textarea" 
                autosize
                ref="elinput"
                @blur="inputBlur(scope)"/>
            </span>
            <span v-else>{{ scope.row.anime_name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="watch_status" label="watch_status" width="80" align="center">
          <template #default="scope">
            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === 'watch_status'">
              <el-input 
              v-model="scope.row.watch_status"
              ref="elinput"
              @blur="inputBlur(scope)"/>
            </span>
            <span v-else>{{ scope.row.watch_status }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </el-card>
</template>

<script>
export default {
  name: 'CardItem',
  data() {
    return {
      record_date: '2023.10',
      tableData: [
        { anime_name: "因想当冒险者而前往大都市的女儿已经升到了S级", watch_status: "在看" },
        { anime_name: "葬送的芙莉莲", watch_status: "待看" },
        { anime_name: "我推是反派大小姐", watch_status: "在看" },
        { anime_name: "SHY 腼腆英雄", watch_status: "看完" },
      ],
      tabClickIndex: null, // 当前点击的单元格
      tabClickLabel: '', // 当前点击的列名
    }
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      switch (row.watch_status) {
        case "在看":
          if (columnIndex === 1) return { "background": "yellow" };
        case "看完":
          if (columnIndex === 1) return { "background": "red" };
        default:
          if (columnIndex === 1) return { "background": "" };
      }
    },
    tableRowClassName({row, rowIndex}){
      row.index = rowIndex;
    },
    tabClick(row, column, cell, event){
      this.tabClickIndex = row.index;
      this.tabClickLabel = column.label;
      this.$nextTick(() =>{
        this.$refs.elinput.focus();
      });
    },
    inputBlur(scope){
      this.tabClickIndex = null;
      this.tabClickLabel = '';
      // todo: 保存数据
      
    },
    addRecord(){
      this.tableData.push({anime_name: '/', watch_status: '/'});
    },
  }
}

</script>
<style scoped>
.box-card {
  width: 400px;
  height: 400px;
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