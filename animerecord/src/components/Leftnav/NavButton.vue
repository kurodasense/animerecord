<template>
  <el-popover placement="right" trigger="click" @hide="hidePopover" :width="300">
    <el-input 
      v-model="date_name" 
      @keyup.enter.native="enterConfirm"
      placeholder="请输入追番日期" />
    <div style="text-align: right; margin-top: 10px">
      <el-button size="small" type="primary" @click="confirm">确认</el-button>
    </div>
    <template #reference>
      <div id="nav-item" style="cursor: pointer;" :class="{ active: isActive, nonActive: !isActive }" @click="itemClick">
        <div class="item">
          <div class="item-icon"><el-icon :size="25" :color="iconColor">
              <slot name="item-icon" />
            </el-icon></div>
          <div class="item-text" :style="textColor">{{ name }}</div>
        </div>
      </div>
    </template>

  </el-popover>
</template>

<script>
import {addNewAnimeDate} from "@/network/api";
export default {
  name: 'NavButton',
  inject: ['reload'],
  props: {
    name: String,
    activeColor: String
  },
  data() {
    return {
      isActive: false,
      date_name: '',
      visible: false
    }
  },
  computed: {
    iconColor() {
      return this.isActive ? this.activeColor : "black";
    },
    textColor() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      this.isActive = true;
      this.visible = true;
    },
    hidePopover() {
      this.isActive = false;
      this.date_name = '';
    },
    confirm(){
      addNewAnimeDate(this.date_name).then(res =>{
        let {status, msg, data} = res.data;
        if(status === 200){
          this.$message.success(`添加记录 ${this.date_name}`);
          this.date_name = '';
          this.reload();
        }else{
          this.$message.error(msg);
        }
      }).catch(err =>{
        this.$message.error(err);
      });
    },
    enterConfirm(){
      this.confirm();
    }
  }
}

</script>

<style scoped>
#nav-item {
  margin: 20px 20px 20px 10px;
  padding: 10px 20px 10px 10px;
  border-radius: 38px;
  transition: background-color .2s;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-content: flex-start;
}

.item {
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  margin-left: 25px;
}

.item-icon {
  position: relative;
  top: 2.5px;
}

.item-text {
  width: 100%;
}

.active {
  background-color: white;
}

.nonActive:hover {
  background-color: #dee2e3;
  transition: background-color .2s;
}
</style>