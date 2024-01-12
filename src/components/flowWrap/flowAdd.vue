<template>
  <div class="add-node-btn-box">
    <div class="add-node-btn">
      <el-popover placement="right-start" v-model="visible" popper-class="add-node-popover-body-wrap">
        <div class="add-node-popover-body">
          <div class="add-node-popover-item" @click="addType(1)">
            <span class="iconfont tenado-action"></span>
            <span class="text">动作</span>
          </div>
          <div class="add-node-popover-item" @click="addType(4)">
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
  props: ["childNodeP"],
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    addType(type) {
      this.visible = false;
      if (type != 4) {
        var data;
        if (type == 1) {
          data = {
            nodeName: "审核人",
            error: true,
            type: 1,
            settype: 1,
            selectMode: 0,
            selectRange: 0,
            directorLevel: 1,
            examineMode: 1,
            noHanderAction: 1,
            examineEndDirectorLevel: 0,
            childNode: this.childNodeP,
            nodeUserList: [],
          };
        } else if (type == 2) {
          data = {
            nodeName: "抄送人",
            type: 2,
            ccSelfSelectFlag: 1,
            childNode: this.childNodeP,
            nodeUserList: [],
          };
        }
        this.$emit("update:childNodeP", data);
      } else {
        this.$emit("update:childNodeP", {
          nodeName: "路由",
          type: 4,
          childNode: null,
          conditionNodes: [
            {
              nodeName: "条件1",
              error: true,
              type: 3,
              priorityLevel: 1,
              conditionList: [],
              nodeUserList: [],
              childNode: this.childNodeP,
            },
            {
              nodeName: "条件2",
              type: 3,
              priorityLevel: 2,
              conditionList: [],
              nodeUserList: [],
              childNode: null,
            },
          ],
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
.add-node-btn-box {
  width: 240px;
  display: inline-flex;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
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
      // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
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
        width: 8px;
        height: 8px;
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
        // box-shadow: 0 13px 27px 0 rgba(0, 0, 0, 0.1);
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
        background: #F5F6F7;
      }
    }
  }
}
</style>
