
<template>
  <div class="footer">
    <div>Created by Tao</div>
    <div class="number">
      粤ICP备18141506号
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>
<style scoped lang="less">
.footer {
  text-align: center;
  padding: 20px;
  font-weight: bold;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  .number {
    color: #ada8a8;
  }
}
</style>

