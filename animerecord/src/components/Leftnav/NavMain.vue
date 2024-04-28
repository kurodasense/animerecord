<template>
  <div class="nav-main">
    <NavContent>
      <!-- 主页 -->
      <NavItem path="/main/home" name="首页" activeColor="#2a5caa">
        <template #item-icon>
          <HomeFilled />
        </template>
      </NavItem>
      <!-- 归档 -->
      <NavItem path="/main/directory" name="归档" activeColor="#2a5caa">
        <template #item-icon>
          <Management />
        </template>
      </NavItem>
      <!-- 添加追番日期 -->
      <NavButton name="添加追番日期" activeColor="#2a5caa">
        <template #item-icon>
          <Ticket />
        </template>
      </NavButton>
    </NavContent>
  </div>
</template>

<script>
import NavContent from "@/components/Leftnav/NavContent";
import NavItem from "@/components/Leftnav/NavItem";
import NavButton from "@/components/Leftnav/NavButton";
export default {
  name: "NavMain",
  components: { NavContent, NavItem, NavButton },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .nav-main {
    width: 250px;
    height: 300px;
    margin: 0 auto;
    padding-top: 20px;
  }
}
</style>
