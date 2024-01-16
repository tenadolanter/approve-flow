<template>
  <div class="add-node-btn-box">
    <div class="add-node-btn">
      <el-popover
        placement="right-start"
        v-model="visible"
        popper-class="add-node-popover-body-wrap"
      >
        <div class="add-node-popover-body">
          <div class="add-node-popover-item" @click="handlerAddNode">
            <span class="iconfont tenado-action"></span>
            <span class="text">动作</span>
          </div>
          <div class="add-node-popover-item" @click="handlerAddRouter">
            <span class="iconfont tenado-condition"></span>
            <span class="text">条件</span>
          </div>
        </div>
        <button class="btn" type="button" slot="reference">
          <span class="circle"></span>
          <span class="iconfont tenado-add-fill"></span>
        </button>
      </el-popover>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 当前节点的配置
    nodeConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    handlerAddRouter() {
      this.visible = false;
      // const config = {
      //   nodeId: uuid(),
      //   nodeName: "路由",
      //   nodeType: NODE_TYPES.ROUTE,
      //   childNode: null,
      //   conditionNodes: [
      //     {
      //       nodeId: uuid(),
      //       nodeName: "条件1",
      //       nodeType: NODE_TYPES.CONDITION,
      //       childNode: this.childNodeP,
      //     },
      //     {
      //       nodeId: uuid(),
      //       nodeName: "条件2",
      //       nodeType: NODE_TYPES.CONDITION,
      //       childNode: null,
      //     },
      //   ],
      // };
      // this.$emit("update:childNodeP", config);
      this.$emit('on-router', this.nodeConfig)
    },
    handlerAddNode() {
      this.visible = false;
      this.$emit('on-add', this.nodeConfig);
    },
  },
};
</script>
<style scoped lang="scss">
.add-node-btn-box {
  width: 240px;
  display: inline-flex;
  flex-shrink: 0;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: #cacaca;
  }

  .add-node-btn {
    user-select: none;
    width: 240px;
    padding: 20px 0 32px;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    flex-grow: 1;

    .btn {
      outline: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      position: relative;
      border: none;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      user-select: none;
      background-color: initial;
      .circle {
        display: block;
        width: 12px;
        height: 12px;
        background: #3c6dfc;
        border-radius: 50%;
      }
      .iconfont {
        display: none;
        color: #fff;
        font-size: 14px;
        font-weight: 600;
      }

      &:hover {
        background: #3c6dfc;
        transform: scale(1.1);
        .circle {
          display: none;
        }
        .iconfont {
          display: block;
        }
      }

      &:active {
        transform: none;
        background: #3c6dfc;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
<style lang="scss">
.add-node-popover-body-wrap {
  padding: 0;
  min-width: initial;
  width: 120px;
  .add-node-popover-body {
    .add-node-popover-item {
      display: flex;
      align-items: center;
      height: 36px;
      padding: 0 12px;
      border-radius: 4px;
      user-select: none;
      cursor: pointer;
      .iconfont {
        margin-right: 8px;
      }
      .text {
        font-size: 14px;
      }
      &:hover {
        background: #f5f6f7;
        color: #3c6dfc;
      }
    }
  }
}
</style>
