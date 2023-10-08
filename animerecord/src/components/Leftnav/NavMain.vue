<template>
  <div id="nav-main">
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
        <template #item-text>
          <div>归档</div>
        </template>
      </NavItem>
    </NavContent>
  </div>
</template>

<script>
import NavContent from "@/components/Leftnav/NavContent"
import NavItem from "@/components/Leftnav/NavItem"
export default {
  name: 'NavMain',
  components: { NavContent, NavItem },
}

</script>

<style scoped>
  #nav-main {
    width: 250px;
    height: 300px;
    margin: 0 auto;
    padding-top: 20px;
  }
</style>