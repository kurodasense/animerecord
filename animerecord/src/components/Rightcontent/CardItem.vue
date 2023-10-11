<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{date.date_name}}</span>
        <el-button class="button" text @click="addRecord">添加</el-button>
      </div>
    </template>
    <el-scrollbar height="300px">
      <el-empty v-if="record[0] == null" description="暂无记录捏" />
      <el-table v-else 
        :data="record" 
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
                @blur="inputBlur(scope.row)"/>
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
              @blur="inputBlur(scope.row)"/>
            </span>
            <span v-else>{{ scope.row.watch_status }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </el-card>
</template>

<script>
import {getAnimeRecordByDateId} from "@/network/api";
export default {
  name: 'CardItem',
  props: {
    date: {}
  },
  data() {
    return {
      record: [],
      tabClickIndex: null, // 当前点击的单元格
      tabClickLabel: '', // 当前点击的列名
    }
  },
  created(){

  },
  methods: {
    getData(){
      getAnimeRecordByDateId(this.date.date_id).then(res =>{
        let {status, msg, data} = res.data;
        if(status === 200){
          this.record = data;
        }else{
          this.$message.error(msg);
        }
      }).catch(err =>{
        this.$message.error(err);
      });
    },
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
    inputBlur(row){
      this.tabClickIndex = null;
      this.tabClickLabel = '';
      // todo: 保存数据
      
    },
    addRecord(){
      this.record.push({anime_name: 'new anime', watch_status: '待看'});
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