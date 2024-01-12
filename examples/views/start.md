
:::demo

```html
<template>
  <ApproveFlow :nodeConfig.sync="nodeConfig"></ApproveFlow>
</template>
<script>
export default {
  data(){
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
    }
  },
}
</script>
```

:::
