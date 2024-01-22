<template>
  <div class="node-wrap">
    <div
      class="node-wrap-box"
      :class="{
        'start-node': nodeConfig.nodeType == NODE_TYPES.START,
        error: nodeConfig.error,
        'empty-start-node': isStartNodeEmpty,
        disabled: readonly,
      }"
      @click="handlerEditNode"
    >
      <div class="node-inner" v-if="!isStartNodeEmpty">
        <div class="title">
          <i class="title-icon" :class="nodeIcon" :style="{ color: iconColor }"></i>
          <div class="text">{{ nodeConfig.nodeName }}</div>
        </div>
        <div class="desc">
          {{ nodeDesc }}
        </div>
      </div>
      <div class="start-inner" v-else>
        <i class="start-icon tenado-add-fill"></i>
        <div class="desc">添加一个节点</div>
      </div>
      <div class="operate-delete" v-if="isDeleteShow && !readonly" @click.stop="handlerDeleteNode">
        <div class="icon-wrap">
          <i class="tenado-close-fill"></i>
        </div>
      </div>
      <i class="error_tip tenado-info-fill" v-if="nodeConfig.error"></i>
    </div>
    <AddNode :nodeConfig="nodeConfig" :readonly="readonly" v-on="$listeners" v-if="!isStartNodeEmpty"></AddNode>
  </div>
</template>

<script>
import { NODE_TYPES } from "../config.js";
import AddNode from "./flowAdd.vue";
export default {
  components: {
    AddNode,
  },
  props: {
    nodeConfig: {
      type: Object,
      default: () => {},
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isDeleteShow() {
      return (
        this.nodeConfig.nodeType !== NODE_TYPES.START ||
        (this.nodeConfig.nodeType === NODE_TYPES.START && !this.nodeConfig.childNode && this.nodeConfig.code)
      );
    },
    nodeIcon() {
      return this.nodeConfig?.icon?.icon;
    },
    iconColor() {
      return this.nodeConfig?.icon?.color || "#2b85fb";
    },
    nodeDesc() {
      return this.nodeConfig?.nodeDesc || "描述";
    },
    isStartNodeEmpty() {
      return this.nodeConfig?.nodeType === NODE_TYPES.START && !this.nodeConfig?.code;
    },
  },
  data() {
    return {
      NODE_TYPES,
    };
  },
  methods: {
    handlerDeleteNode() {
      if (this.readonly) return;
      this.$emit("on-delete-node", this.nodeConfig);
    },
    handlerEditNode() {
      if (this.readonly) return;
      this.$emit("on-edit", this.nodeConfig);
    },
  },
};
</script>

<style scoped lang="scss">
.node-wrap {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 50px;
  position: relative;
  box-sizing: border-box;
}
.node-wrap-box {
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: 192px;
  height: 80px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    .operate-delete {
      display: flex;
      opacity: 0.8;
    }
  }
}

.node-wrap-box:after {
  pointer-events: none;
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.node-wrap-box:hover:not(.empty-start-node):not(.disabled):after {
  border: 1px solid rgba(60, 109, 252, 0.6);
  box-shadow: 0 0 6px 0 rgba(50, 150, 250, 0.3);
}

.node-wrap-box.error:after {
  border: 1px solid #f25643;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.node-wrap-box:before {
  content: "";
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  border-style: solid;
  border-width: 8px 6px 4px;
  border-color: #cacaca transparent transparent;
  pointer-events: none;
  background: var(--backgroudOption);
}

.node-wrap-box.start-node:before {
  content: none;
}

.node-inner {
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    align-items: center;
    overflow: hidden;
    .title-icon {
      margin-right: 6px;
      font-size: 13px;
      color: #2b85fb;
      font-weight: bold;
      line-height: initial;
    }
    .text {
      height: 24px;
      max-width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      font-weight: 500;
      color: #323338;
    }
  }
  .desc {
    flex: 1 0 0;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
    color: #8f959e;
    display: flex;
    align-items: center;
  }
}
.start-inner {
  width: 100%;
  height: 100%;
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #d0d4e4;
  opacity: 0.8;
  &:hover {
    border-color: #3c6dfc;
    background: #fff;
    .start-icon {
      color: #3c6dfc;
    }
    .desc {
      color: #3c6dfc;
    }
  }
  .start-icon {
    font-size: 20px;
    color: #d0d4e4;
  }
  .desc {
    height: 28px;
    line-height: 28px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 12px;
    color: #8f959e;
  }
}
.operate-delete {
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(0, -100%);
  padding: 6px 3px;
  transition: opacity 0.5s;
  opacity: 0;
  .icon-wrap {
    display: flex;
    background: #3c6dfc;
    width: 20px;
    height: 20px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #fff;
    font-size: 12px;
    font-weight: 800;
  }
}
.error_tip {
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate(120%, 0px);
  font-size: 24px;
  color: #f25643;
}
</style>
