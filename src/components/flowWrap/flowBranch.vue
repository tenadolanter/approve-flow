<template>
  <div class="branch-wrap" ref="branchWrap">
    <div class="branch-box-wrap">
      <div class="branch-box">
        <button class="add-branch" @click="addTerm">添加条件</button>
        <div
          class="col-box"
          v-for="(item, index) in nodeConfig.conditionNodes"
          :key="index"
        >
          <div class="condition-node">
            <div class="condition-node-box">
              <div
                class="auto-judge"
                :class="isTried && item.error ? 'error active' : ''"
              >
                <div class="title-wrapper">
                  <span class="editable-title">{{ item.nodeName }}</span>
                  <i
                    class="close tenado-close-fill"
                    @click="delTerm(index)"
                  ></i>
                </div>
                <div class="content" @click="setPerson(index)">
                  12121
                </div>
                <div class="error_tip" v-if="isTried && item.error">
                  <i class="anticon anticon-exclamation-circle"></i>
                </div>
              </div>
              <addNode :childNodeP.sync="item.childNode"></addNode>
            </div>
          </div>
          <nodeWrap
            v-if="item.childNode"
            :nodeConfig.sync="item.childNode"
          ></nodeWrap>
          <template v-if="index == 0">
            <div
              class="top-left-cover-line"
              :style="{ 'background-color': bgcolor }"
            ></div>
            <div
              class="bottom-left-cover-line"
              :style="{ 'background-color': bgcolor }"
            ></div>
          </template>
          <template v-if="index == nodeConfig.conditionNodes.length - 1">
            <div
              class="top-right-cover-line"
              :style="{ 'background-color': bgcolor }"
            ></div>
            <div
              class="bottom-right-cover-line"
              :style="{ 'background-color': bgcolor }"
            ></div>
          </template>
        </div>
      </div>
      <AddNode
        :childNodeP.sync="nodeConfig.childNode"
        :nodeConfig="nodeConfig"
        v-on="$listeners"
      ></AddNode>
    </div>
  </div>
</template>

<script>
import uuid from "uuid-v4";
import { NODE_TYPES } from "../config.js";
export default {
  components: {
    AddNode: () => import("./flowAdd.vue"),
    NodeWrap: () => import("./index.vue"),
  },
  props: {
    nodeConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isTried: false,
      bgcolor: "#f5f5f7",
    };
  },
  methods: {
    addTerm() {
      let len = this.nodeConfig.conditionNodes.length + 1;
      this.nodeConfig.conditionNodes.push({
        nodeId: uuid(),
        nodeName: "条件" + len,
        nodeType: NODE_TYPES.CONDITION,
        childNode: null,
      });
      this.$emit("on-change", this.nodeConfig);
    },
    setPerson(index) {
      this.$emit("on-edit", this.nodeConfig?.conditionNodes?.[index]);
    },
    delTerm(index) {
      this.nodeConfig.conditionNodes.splice(index, 1);
      this.nodeConfig.conditionNodes.map((item, index) => {
        item.nodeName = `条件${index + 1}`;
      });
      // this.resetConditionNodesErr();
      this.$emit("on-change", this.nodeConfig);
      if (this.nodeConfig.conditionNodes.length == 1) {
        if (this.nodeConfig.childNode) {
          if (this.nodeConfig.conditionNodes[0].childNode) {
            this.reData(
              this.nodeConfig.conditionNodes[0].childNode,
              this.nodeConfig.childNode
            );
          } else {
            this.nodeConfig.conditionNodes[0].childNode = this.nodeConfig.childNode;
          }
        }
        this.$emit("on-change", this.nodeConfig.conditionNodes[0].childNode);
      }
    },
    reData(data, addData) {
      if (!data.childNode) {
        data.childNode = addData;
      } else {
        this.reData(data.childNode, addData);
      }
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
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-height: 270px;
  width: 100%;
  -ms-flex-negative: 0;
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
  margin-top: 15px;
}

.branch-box .col-box {
  background: #f5f5f7;
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
  width: 220px;
  min-height: 72px;
  background: #fff;
  border-radius: 4px;
  padding: 14px 19px;
  cursor: pointer;
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

.auto-judge.active:after,
.auto-judge:active:after,
.auto-judge:hover:after {
  border: 1px solid #3296fa;
  box-shadow: 0 0 6px 0 rgba(50, 150, 250, 0.3);
}

.auto-judge.active .close,
.auto-judge:active .close,
.auto-judge:hover .close {
  display: block;
}

.auto-judge.error:after {
  border: 1px solid #f25643;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.auto-judge .title-wrapper {
  position: relative;
  font-size: 12px;
  color: #15bc83;
  text-align: left;
  line-height: 16px;
}

.auto-judge .title-wrapper .editable-title {
  display: inline-block;
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.auto-judge .title-wrapper .priority-title {
  display: block;
  float: right;
  margin-right: 10px;
  color: rgba(25, 31, 37, 0.56);
}

.auto-judge .placeholder {
  color: #bfbfbf;
}

.auto-judge .close {
  display: none;
  position: absolute;
  right: -10px;
  top: -10px;
  width: 20px;
  height: 20px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  z-index: 2;
}

.auto-judge .content {
  font-size: 14px;
  color: #191f25;
  text-align: left;
  margin-top: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
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
</style>
