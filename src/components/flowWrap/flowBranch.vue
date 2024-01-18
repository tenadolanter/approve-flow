<template>
  <div class="branch-wrap" ref="branchWrap">
    <div class="branch-box-wrap">
      <div class="branch-box">
        <button class="add-branch" v-if="!readonly" @click="handlerAddNode">添加条件</button>
        <div class="col-box" v-for="(item, index) in nodeConfig.conditionNodes" :key="index">
          <div class="condition-node">
            <div class="condition-node-box">
              <div class="auto-judge" :class="{ error: item.error, disabled: readonly }" @click="handlerEditNode(index)">
                <div class="node-inner">
                  <div class="title">
                    <i class="title-icon er-icon-filter-line"></i>
                    <div class="text">{{ nodeConfig.conditionNodes[index].nodeName }}</div>
                  </div>
                  <div class="desc">
                    {{ nodeConfig.conditionNodes[index].nodeDesc || "请设置条件" }}
                  </div>
                </div>
                <div class="operate-delete" v-if="!readonly" @click.stop="handlerDeleteNode(index)">
                  <div class="icon-wrap">
                    <i class="er-icon-delete-bin-line"></i>
                  </div>
                </div>
                <i class="error_tip er-icon-information-line" v-if="item.error"></i>
              </div>
              <addNode :nodeConfig="nodeConfig.conditionNodes[index]" :readonly="readonly" v-on="$listeners"></addNode>
            </div>
          </div>
          <nodeWrap v-if="item.childNode" :nodeConfig="item.childNode" v-on="$listeners"></nodeWrap>
          <!-- 覆盖多余的线条 -->
          <template v-if="index == 0">
            <div class="top-left-cover-line sup-line"></div>
            <div class="bottom-left-cover-line sup-line"></div>
          </template>
          <template v-if="index == nodeConfig.conditionNodes.length - 1">
            <div class="top-right-cover-line sup-line"></div>
            <div class="bottom-right-cover-line sup-line"></div>
          </template>
        </div>
      </div>
      <AddNode :nodeConfig="nodeConfig" :readonly="readonly" v-on="$listeners"></AddNode>
    </div>
  </div>
</template>

<script>
import uuid from "uuid-v4";
import { NODE_TYPES } from "../config.js";
import AddNode from "./flowAdd.vue";
export default {
  components: {
    AddNode,
    NodeWrap: () => import("./index.vue"),
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
  methods: {
    handlerAddNode() {
      if (this.readonly) return;
      let len = this.nodeConfig.conditionNodes.length + 1;
      this.nodeConfig.conditionNodes.push({
        nodeId: uuid(),
        nodeName: "条件" + len,
        nodeDesc: "",
        nodeType: NODE_TYPES.CONDITION,
        childNode: null,
      });
      this.$emit("on-change", this.nodeConfig);
    },
    handlerEditNode(index) {
      if (this.readonly) return;
      this.$emit("on-edit", this.nodeConfig?.conditionNodes?.[index]);
    },
    handlerDeleteNode(index) {
      if (this.readonly) return;
      this.$emit("on-delete-condition", this.nodeConfig, index);
    },
  },
};
</script>

<style scoped lang="scss">
.branch-wrap {
  display: inline-flex;
  width: 100%;
  background-color: inherit;
}
.branch-box-wrap {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  min-height: 270px;
  width: 100%;
  flex-shrink: 0;
}
.branch-box {
  display: flex;
  overflow: visible;
  min-height: 180px;
  height: auto;
  border-bottom: 2px solid #ccc;
  border-top: 2px solid #ccc;
  position: relative;
}

.branch-box .col-box {
  background: var(--backgroudOption);
}

.branch-box .col-box:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  margin: auto;
  width: 2px;
  height: 100%;
  background-color: #cacaca;
}

.add-branch {
  border: none;
  outline: none;
  user-select: none;
  justify-content: center;
  font-size: 12px;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  color: #3c6dfc;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: center center;
  cursor: pointer;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.add-branch:hover {
  transform: translateX(-50%) scale(1.1);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
}

.add-branch:active {
  transform: translateX(-50%);
  box-shadow: none;
}
.col-box {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.condition-node {
  min-height: 220px;
}

.condition-node,
.condition-node-box {
  display: inline-flex;
  flex-direction: column;
}
.condition-node-box {
  padding-top: 30px;
  padding-right: 50px;
  padding-left: 50px;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex-grow: 1;
  position: relative;
}

.condition-node-box:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 2px;
  height: 100%;
  background-color: #cacaca;
}
.auto-judge {
  position: relative;
  width: 192px;
  height: 80px;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box;
  &:hover {
    .operate-delete {
      display: flex;
      opacity: 0.8;
    }
  }
}

.auto-judge:after {
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

.auto-judge:hover:not(.disabled):after {
  border: 1px solid rgba(60, 109, 252, 0.6);
  box-shadow: 0 0 6px 0 rgba(50, 150, 250, 0.3);
}

.auto-judge.error:after {
  border: 1px solid #f25643;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.sup-line {
  background: var(--backgroudOption);
}

.top-left-cover-line {
  left: -1px;
}

.top-left-cover-line,
.top-right-cover-line {
  position: absolute;
  height: 8px;
  width: 50%;
  top: -4px;
}

.top-right-cover-line {
  right: -1px;
}

.bottom-left-cover-line {
  left: -1px;
}

.bottom-left-cover-line,
.bottom-right-cover-line {
  position: absolute;
  height: 8px;
  width: 50%;
  bottom: -4px;
}

.bottom-right-cover-line {
  right: -1px;
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
    color: #676879;
    display: flex;
    align-items: center;
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
}
</style>
