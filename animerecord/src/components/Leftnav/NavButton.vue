<template>
  <el-popover trigger="click" @hide="hidePopover" :width="300">
    <el-input
      v-model="inputValue"
      @keyup.enter.native="enterConfirm"
      :placeholder="placeholder"
    />
    <div style="text-align: right; margin-top: 10px">
      <el-button size="small" type="primary" @click="confirm">确认</el-button>
    </div>
    <template #reference>
      <div
        class="nav-item"
        style="cursor: pointer"
        :class="{ active: isActive, nonActive: !isActive }"
        @click="itemClick"
      >
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
  </el-popover>
</template>
<script>
export default {
  name: "NavButton",
  emits: ["handleConfirm"],
  props: {
    name: String,
    activeColor: String,
    placeholder: String,
  },
  data() {
    return {
      isActive: false,
      visible: false,
      inputValue: "",
    };
  },
  computed: {
    iconColor() {
      return this.isActive ? this.activeColor : "black";
    },
    textColor() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.isActive = true;
      this.visible = true;
    },
    hidePopover() {
      this.isActive = false;
      this.value = "";
    },
    confirm() {
      const payload = { inputValue: this.inputValue };
      this.$emit("handleConfirm", payload);
    },
    enterConfirm() {
      this.confirm();
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
  flex-direction: row;
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
    max-width: fit-content;
    margin: 20px 10px;
    border-radius: 0px;
    box-sizing: border-box;

    .item {
      margin: 0px;
      .item-text {
        text-overflow: ellipsis;
        overflow: hidden;
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
