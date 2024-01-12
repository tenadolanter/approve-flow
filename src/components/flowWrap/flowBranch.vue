<template>
  <div class="branch-wrap">
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
                  {{ $func.conditionStr(nodeConfig, index) }}
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
            <div class="top-left-cover-line"></div>
            <div class="bottom-left-cover-line"></div>
          </template>
          <template v-if="index == nodeConfig.conditionNodes.length - 1">
            <div class="top-right-cover-line"></div>
            <div class="bottom-right-cover-line"></div>
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
};
</script>

<style scoped lang="scss"></style>
