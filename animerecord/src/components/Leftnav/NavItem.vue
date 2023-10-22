<template>
  <div id="nav-item" style="cursor: pointer;" :class="{ active: isActive, nonActive: !isActive }" @click="itemClick">
    <div class="item">
      <div class="item-icon">
        <el-icon :size="25" :color="iconColor">
          <slot name="item-icon" />
        </el-icon>
      </div>
      <div class="item-text" :style="textColor">{{ name }}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    path: String,
    name: String,
    activeColor: String
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    iconColor() {
      return this.isActive ? this.activeColor : "black";
    },
    textColor() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick() {
      // 在按钮所对应的页面上，如果再次点击按钮，不跳转
      if (this.$route.path === this.path) return;
      this.$router.replace(this.path);
    }
  }
}

</script>

<style scoped lang="less">
#nav-item {
  margin: 20px 20px 20px 10px;
  padding: 10px 20px 10px 10px;
  border-radius: 38px;
  transition: background-color .2s;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-content: flex-start;

  .item {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 20px;
    font-weight: 700;
    margin-left: 25px;

    .item-icon {
      position: relative;
      top: 2.5px;
    }

    .item-text {
      width: 100%;
    }
  }
}

.active {
  background-color: white;
}

.nonActive {
  &:hover {
    background-color: #dee2e3;
    transition: background-color .2s;
  }
}
</style>