<template>
  <div class="flow-wrap">
    <FlowWrap :nodeConfig.sync="nodeConfig"></FlowWrap>
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
  data() {
    return {
      nodeConfig: {
        nodeName: "发起人",
        type: 0,
        childNode: {
          nodeName: "审核人",
          type: 1,
          childNode: {
            nodeName: "路由",
            type: 4,
            conditionNodes: [
              {
                nodeName: "条件1",
                type: 3,
                childNode: {
                  nodeName: "审核人",
                  type: 1,
                },
              },
              {
                nodeName: "条件2",
                type: 3,
              },
            ],
          },
        },
      },
    };
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
