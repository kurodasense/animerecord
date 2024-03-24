<template>
  <div
    class="nav-item"
    style="cursor: pointer"
    :class="{ active: isActive, nonActive: !isActive }"
    @click="itemClick"
  >
    <div class="item">
      <span class="item-icon">
        <el-icon :size="25" :color="iconColor">
          <slot name="item-icon" />
        </el-icon>
      </span>
      <span class="item-text" :style="textColor">{{ name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavItem",
  props: {
    path: String,
    name: String,
    activeColor: String,
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
    },
  },
  methods: {
    itemClick() {
      // 在按钮所对应的页面上，如果再次点击按钮，不跳转
      if (this.$route.path === this.path) return;
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped lang="less">
.nav-item {
  margin: 20px 20px 20px 10px;
  padding: 10px 20px 10px 10px;
  border-radius: 38px;
  transition: background-color 0.2s;
  white-space: nowrap;
  display: flex;
  align-content: flex-start;
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: var(--nav-font-size);
    font-weight: var(--nav-font-weight);
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
@media (max-width: 768px) {
  .nav-item {
    width: 100%;
    margin: 20px 10px;
    border-radius: 0px;
    .item {
      margin: 0px;
      .item-text {
        margin-left: 8px;
      }
    }
  }
}
.active {
  background-color: var(--nav-active-background-color);
}

.nonActive {
  &:hover {
    background-color: var(--nav-hover-background-color);
    transition: background-color 0.2s;
  }
}
</style>
