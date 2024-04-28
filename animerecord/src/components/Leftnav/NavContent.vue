<template>
  <div class="nav-content">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "NavContent",
};
</script>

<style scopoed lang="less">
@media (min-width: 768px) {
  .nav-content {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 7px 10px 5px rgba(134, 140, 146, 0.3);
  }
}

@media (max-width: 768px) {
  .nav-content {
    width: 100%;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    flex-wrap: nowrap;
  }
}
</style>
