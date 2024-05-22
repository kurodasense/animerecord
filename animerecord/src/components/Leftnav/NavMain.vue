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
      <NavItem
        class="item"
        path="/main/directory"
        name="归档"
        activeColor="#2a5caa"
      >
        <template #item-icon>
          <Management />
        </template>
      </NavItem>
      <!-- 添加追番日期 -->
      <NavButton
        name="添加追番日期"
        activeColor="#2a5caa"
        placeholder="请输入追番日期"
        @handleConfirm="handleNewAnimeDate"
      >
        <template #item-icon>
          <Ticket />
        </template>
      </NavButton>
      <!-- 权限验证 -->
      <NavButton
        name="权限验证"
        activeColor="#2a5caa"
        placeholder="请输入权限指令"
        @handleConfirm="handlePermission"
      >
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
import { addNewAnimeDate, getPermission } from "@/network/api";

export default {
  name: "NavMain",
  inject: ["reload"],
  components: { NavContent, NavItem, NavButton },
  data() {
    return {
      date_name: "",
    };
  },
  methods: {
    handleNewAnimeDate(payload) {
      const { inputValue: date_name } = payload;
      addNewAnimeDate(date_name)
        .then((res) => {
          let { status, msg, data } = res.data;
          if (status === 200) {
            this.$message.success(`添加记录 ${date_name}`);
            this.date_name = "";
            this.reload();
          } else {
            this.$message.error(msg);
          }
        })
        .catch((err) => {
          const { status, msg, data } = err.response.data;
          this.$message.error(msg);
        });
    },
    handlePermission(payload) {
      const { inputValue: secret } = payload;
      getPermission(secret)
        .then((res) => {
          const { status, msg, data } = res.data;
          const { token } = data;
          this.$store.commit("setToken", data);
          this.$message.success(msg);
        })
        .catch((err) => {
          const { status, msg, data } = err.response.data;
          this.$message.error(msg);
        });
    },
  },
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
