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
                <div
                  class="sort-left"
                  v-if="index != 0"
                  @click="arrTransfer(index, -1)"
                >
                  &lt;
                </div>
                <div class="title-wrapper">
                  <input
                    v-if="isInputList[index]"
                    type="text"
                    class="ant-input editable-title-input"
                    @blur="blurEvent(index)"
                    @focus="$event.currentTarget.select()"
                    v-focus
                    v-model="item.nodeName"
                  />
                  <span
                    v-else
                    class="editable-title"
                    @click="clickEvent(index)"
                    >{{ item.nodeName }}</span
                  >
                  <span
                    class="priority-title"
                    @click="setPerson(item.priorityLevel)"
                    >优先级{{ item.priorityLevel }}</span
                  >
                  <i
                    class="anticon anticon-close close"
                    @click="delTerm(index)"
                  ></i>
                </div>
                <div
                  class="sort-right"
                  v-if="index != nodeConfig.conditionNodes.length - 1"
                  @click="arrTransfer(index)"
                >
                  &gt;
                </div>
                <div class="content" @click="setPerson(item.priorityLevel)">
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
      <AddNode :childNodeP.sync="nodeConfig.childNode"></AddNode>
    </div>
  </div>
</template>

<script>
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
      isInputList: [],
      isTried: false,
      bgcolor: "#f5f5f7",
    };
  },
  methods: {
    addTerm() {},
    clickEvent() {},
    setPerson() {},
    delTerm() {},
    arrTransfer() {},
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
  color: #3296fa;
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
  -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
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
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
}

.condition-node {
  min-height: 220px;
}

.condition-node,
.condition-node-box {
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-flex: 1;
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
  display: inline-block;
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

.auto-judge .sort-left,
.auto-judge .sort-right {
  position: absolute;
  top: 0;
  bottom: 0;
  display: none;
  z-index: 1;
}

.auto-judge .sort-left {
  left: 0;
  border-right: 1px solid #f6f6f6;
}

.auto-judge .sort-right {
  right: 0;
  border-left: 1px solid #f6f6f6;
}

.auto-judge:hover .sort-left,
.auto-judge:hover .sort-right {
  display: flex;
  align-items: center;
}

.auto-judge .sort-left:hover,
.auto-judge .sort-right:hover {
  background: #efefef;
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
