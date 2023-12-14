<template>
  <el-card>
    <el-empty v-if="record.length <= 0" description="暂无记录捏" />
    <el-table v-else :data="record" 
    border style="width: 100%" 
    :show-header="false" 
    :cell-style="cellStyle" v-loading="card_loading">
      <el-table-column prop="anime_name" label="anime_name" width="auto">
      </el-table-column>
      <el-table-column prop="watch_status" label="watch_status" width="90" align="center">
      </el-table-column>
      <el-table-column width="90" align="center">
        <template #default="scope">
          <el-popover placement="top" trigger="click">
            <template #reference>
              <el-button type="danger" text>删除</el-button>
            </template>
            <el-text tag="p" type="danger">确认删除?</el-text>
            <div style="text-align: right; margin-top: 10px">
              <el-button size="small" type="primary" @click="delAnime(scope.row)">确认</el-button>
            </div>
          </el-popover>
          
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getAnimeRecordByDateId, deleteAnime } from "@/network/api";
export default {
  name: 'DirectoryItem',
  props: {
    date: {}
  },
  data() {
    return {
      record: [],
      card_loading: false
    }
  },
  created() {
    this.getAnimeRecord();
  },
  methods: {
    getAnimeRecord() {
      this.card_loading = true;
      getAnimeRecordByDateId(this.date.date_id).then(res => {
        let { status, msg, data } = res.data;
        if (status === 200) {
          this.record = data;
          this.card_loading = false;
        } else {
          this.$message.error(msg);
          this.card_loading = false;
        }
      }).catch(err => {
        this.$message.error(err);
        this.card_loading = false;
      });
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      switch (row.watch_status) {
        case "待看":
          if (columnIndex === 1) return { "background": "yellow" };
        case "看完":
          if (columnIndex === 1) return { "background": "red", "color": "white" };
        default:
          if (columnIndex === 1) return { "background": "" };
      }
    },
    delAnime(row) {
      let { record_id, date_id, anime_name } = row;
      this.card_loading = true;
      deleteAnime(record_id, date_id, anime_name).then(res =>{
        let {status, msg, data} = res;
        if(status === 200){
          // todo
          this.record.splice(this.record.indexOf(row), 1);
          this.card_loading = false;
        }else{
          this.$message.error(msg);
          this.card_loading = false;
        }
      }).catch(err =>{
        this.$message.error(err);
        this.card_loading = false;
      });
    }
  }
}

</script>

<style scoped lang="less"></style>