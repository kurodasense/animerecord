<template>
  <div id="nav-content">
    <slot></slot>
  </div>
</template>

<script>
  export default{
    name: 'NavContent',
    
  }

</script>

<style scopoed>
  #nav-content{
    width: auto;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: 0 7px 10px 5px rgba(134,140,146,.3);
  }
</style>