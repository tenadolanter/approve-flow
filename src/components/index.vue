<template>
  <div class="flow-wrap">
    <FlowWrap :nodeConfig.sync="nodeConfig" v-on="$listeners"></FlowWrap>
    <FlowEnd></FlowEnd>
  </div>
</template>

<script>
import "../assets/font/index.min.css";
export default {
  name: "ApproveFlow",
  components: {
    FlowWrap: () => import("./flowWrap/index.vue"),
    FlowEnd: () => import("./flowWrap/flowEnd.vue"),
  },
  props: {
    nodeConfig: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
.flow-wrap {
  background-color: #f5f5f7;
  padding: 54.5px 0;
  min-width: min-content;
  transform: scale(1);
}
</style>
