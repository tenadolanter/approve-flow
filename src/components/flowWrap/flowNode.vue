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
            <i class="anticon anticon-close close" @click="delNode"></i>
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
import AddNode from "./flowAdd.vue"
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
};
</script>

<style scoped lang="scss"></style>
