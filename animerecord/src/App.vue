<template>
  <div style="height: 100%; position: relative">
    <RouterView v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  setup() {
    const debounce = (callback, delay) => {
      let tid;
      return function (...args) {
        const ctx = self;
        tid && clearTimeout(tid);
        tid = setTimeout(() => {
          callback.apply(ctx, args);
        }, delay);
      };
    };
    const _ = window.ResizeObserver;
    window.ResizeObserver = class ResizeObserver extends _ {
      constructor(callback) {
        callback = debounce(callback, 20);
        super(callback);
      }
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>

<style lang="less">
@import "assets/css/base.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
@media (prefers-color-scheme: dark) {
  html {
    filter: invert(1) hue-rotate(180deg);
    transition: color 300ms, background-color 300ms; // 添加过渡动画
  }
  img,
  svg,
  video {
    filter: invert(1) hue-rotate(180deg);
    transition: color 300ms, background-color 300ms; // 添加过渡动画
    opacity: 0.8; // 添加透明度
  }
}
</style>
