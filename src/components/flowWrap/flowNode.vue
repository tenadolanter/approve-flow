<template>
  <div class="node-wrap">
    <div
      class="node-wrap-box"
      :class="
        (nodeConfig.type == 0 ? 'start-node ' : '') +
          (isTried && nodeConfig.error ? 'active error' : '')
      "
    >
      <div>
        <div class="title" :style="`background: rgb(${bgColor});`">
          <span v-if="nodeConfig.type == 0">{{ nodeConfig.nodeName }}</span>
          <template v-else>
            <span class="iconfont">{{ nodeConfig.type == 1 ? "" : "" }}</span>
            <input
              type="text"
              v-if="isInput"
              class="ant-input editable-title-input"
              @blur="blurEvent()"
              @focus="$event.currentTarget.select()"
              v-focus
              v-model="nodeConfig.nodeName"
              :placeholder="defaultText"
            />
            <span v-else class="editable-title" @click="clickEvent()">{{
              nodeConfig.nodeName
            }}</span>
            <i class="close tenado-close-fill" @click="delNode"></i>
          </template>
        </div>
        <div class="content" @click="setPerson">
          <div class="text">
            <span class="placeholder" v-if="!showText"
              >请选择{{ defaultText }}</span
            >
            {{ showText }}
          </div>
          <i class="anticon anticon-right arrow"></i>
        </div>
        <div class="error_tip" v-if="isTried && nodeConfig.error">
          <i class="anticon anticon-exclamation-circle"></i>
        </div>
      </div>
    </div>
    <AddNode :childNodeP.sync="nodeConfig.childNode"></AddNode>
  </div>
</template>

<script>
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
  },
  computed: {
    bgColor() {
      return ["87, 106, 149", "255, 148, 62", "50, 150, 250"][
        this.nodeConfig.type
      ];
    },
    defaultText() {
      return this.placeholderList[this.nodeConfig.type];
    },
    showText() {
      return "所有人";
    },
  },
  data() {
    return {
      placeholderList: ["发起人", "审核人", "抄送人"],
      isInput: false,
      isTried: false,
    };
  },
  methods: {
    delNode() {
      this.$emit("on-config-change", this.nodeConfig.childNode);
    },
    setPerson() {},
    blurEvent() {},
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
}
.node-wrap-box {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  width: 220px;
  min-height: 72px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
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

.node-wrap-box.active:after,
.node-wrap-box:active:after,
.node-wrap-box:hover:after {
  border: 1px solid #3296fa;
  box-shadow: 0 0 6px 0 rgba(50, 150, 250, 0.3);
}

.node-wrap-box.active .close,
.node-wrap-box:active .close,
.node-wrap-box:hover .close {
  display: block;
}

.node-wrap-box.error:after {
  border: 1px solid #f25643;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
}

.node-wrap-box .title {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 30px;
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  color: #fff;
  text-align: left;
  background: #576a95;
  border-radius: 4px 4px 0 0;
}

.node-wrap-box .title .iconfont {
  font-size: 12px;
  margin-right: 5px;
}

.node-wrap-box .placeholder {
  color: #bfbfbf;
}

.node-wrap-box .close {
  display: none;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  font-size: 14px;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
}

.node-wrap-box .content {
  position: relative;
  font-size: 14px;
  padding: 16px;
  padding-right: 30px;
}

.node-wrap-box .content .text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.node-wrap-box .content .arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 14px;
  font-size: 14px;
  color: #979797;
}

.start-node.node-wrap-box .content .text {
  display: block;
  white-space: nowrap;
}

.node-wrap-box:before {
  content: "";
  position: absolute;
  top: -12px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  width: 0;
  height: 4px;
  border-style: solid;
  border-width: 8px 6px 4px;
  border-color: #cacaca transparent transparent;
  background: #f5f5f7;
}

.node-wrap-box.start-node:before {
  content: none;
}
</style>
