var p=Object.defineProperty,m=Object.defineProperties;var N=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable;var _=(n,t,d)=>t in n?p(n,t,{enumerable:!0,configurable:!0,writable:!0,value:d}):n[t]=d,l=(n,t)=>{for(var d in t||(t={}))f.call(t,d)&&_(n,d,t[d]);if(c)for(var d of c(t))y.call(t,d)&&_(n,d,t[d]);return n},h=(n,t)=>m(n,N(t));import{n as g}from"./index-2ee6b343.js";const E={name:"component-doc",components:{"element-demo0":function(){var n=function(){var e=this,s=e.$createElement,o=e._self._c||s;return o("div",[[o("ApproveFlow",{attrs:{nodeConfig:e.nodeConfig,isStartEmptyFn:e.isStartEmptyFn},on:{"update:nodeConfig":function(i){e.nodeConfig=i},"update:node-config":function(i){e.nodeConfig=i},"on-add":e.handlerAdd,"on-edit":e.handlerEdit,"on-change":e.handlerChange}})]],2)},t=[];return l({render:n,staticRenderFns:t},{data(){return{uuid:1,nodeConfig:{nodeId:1,nodeName:"空节点",nodeDesc:"空节点",nodeType:"start"}}},methods:{isStartEmptyFn(e){return(e==null?void 0:e.nodeType)==="start"&&!(e!=null&&e.code)},handlerAdd(e){var a;const s=e==null?void 0:e.nodeId,o=this.utilCloneDeep(this.nodeConfig),i=this.utilGetAllNodes(o),r=this.utilGetNodeById(i,s),v=(a=r==null?void 0:r.childNode)!=null?a:null,u={nodeId:this.utilGetUuid(),nodeName:"新增了一个节点",nodeDesc:"新增节点的描述",nodeType:"node",childNode:v};r.childNode=u,this.nodeConfig=o},handlerEdit(e){console.log("handlerEdit",e),this.isStartEmptyFn(e)&&(console.log("isStartEmptyFn",e),this.nodeConfig=h(l({},e),{nodeName:"添加的起始节点",nodeDesc:"起始节点描述",code:1121}))},handlerChange(e){console.log("handlerChange",e)},utilCloneDeep(e){return JSON.parse(JSON.stringify(e))},utilGetAllNodes(e){var o;let s=[];if(s.push(e),e!=null&&e.childNode){const i=this.utilGetAllNodes(e==null?void 0:e.childNode);s.push(...i)}return e!=null&&e.conditionNodes&&((o=e==null?void 0:e.conditionNodes)!=null&&o.length)&&(e==null||e.conditionNodes.forEach(i=>{const r=this.utilGetAllNodes(i);s.push(...r)})),s},utilGetNodeById(e,s){var o;return(o=e==null?void 0:e.find(i=>i.nodeId===s))!=null?o:{}},utilGetUuid(){return this.uuid++}}})}()}};var b=function(){var t=this,d=t._self._c;return d("section",{staticClass:"content element-doc"},[d("demo-block",[d("template",{slot:"source"},[d("element-demo0")],1),d("template",{slot:"highlight"},[d("pre",{pre:!0},[d("code",{pre:!0,attrs:{class:"html"}},[t._v(`<template>
  <ApproveFlow
    :nodeConfig.sync="nodeConfig"
    :isStartEmptyFn="isStartEmptyFn"
    @on-add="handlerAdd"
    @on-edit="handlerEdit"
    @on-change="handlerChange"
  ></ApproveFlow>
</template>
<script>
  export default {
    data() {
      return {
        uuid: 1,
        nodeConfig: {
          nodeId: 1,
          nodeName: "空节点",
          nodeDesc: "空节点",
          nodeType: "start",
        },
      };
    },
    methods: {
      isStartEmptyFn(nodeConfig) {
        return nodeConfig?.nodeType === "start" && !nodeConfig?.code;
      },
      handlerAdd(nodeConfig) {
        const addNodeId = nodeConfig?.nodeId;
        const nodeData = this.utilCloneDeep(this.nodeConfig);
        const nodes = this.utilGetAllNodes(nodeData);
        const config = this.utilGetNodeById(nodes, addNodeId);
        const childNode = config?.childNode ?? null;
        const _nodeConfig = {
          nodeId: this.utilGetUuid(),
          nodeName: "新增了一个节点",
          nodeDesc: "新增节点的描述",
          nodeType: "node",
          childNode: childNode,
        };
        config.childNode = _nodeConfig;
        this.nodeConfig = nodeData;
      },
      handlerEdit(nodeConfig) {
        console.log("handlerEdit", nodeConfig);
        if (this.isStartEmptyFn(nodeConfig)) {
          console.log("isStartEmptyFn", nodeConfig);
          this.nodeConfig = {
            ...nodeConfig,
            nodeName: "添加的起始节点",
            nodeDesc: "起始节点描述",
            code: 1121,
          };
        }
      },
      handlerChange(nodeConfig) {
        console.log("handlerChange", nodeConfig);
      },
      utilCloneDeep(data) {
        return JSON.parse(JSON.stringify(data));
      },
      utilGetAllNodes(nodeConfig) {
        let result = [];
        result.push(nodeConfig);
        if (nodeConfig?.childNode) {
          const childs = this.utilGetAllNodes(nodeConfig?.childNode);
          result.push(...childs);
        }
        if (nodeConfig?.conditionNodes && nodeConfig?.conditionNodes?.length) {
          nodeConfig?.conditionNodes.forEach((item) => {
            const childs = this.utilGetAllNodes(item);
            result.push(...childs);
          });
        }
        return result;
      },
      utilGetNodeById(nodes, nodeId) {
        return nodes?.find((item) => item.nodeId === nodeId) ?? {};
      },
      utilGetUuid() {
        return this.uuid++;
      },
    },
  };
<\/script>
`)])])])],2),d("h3",{attrs:{id:"shu-xing",tabindex:"-1"}},[t._v("属性")]),t._m(0),d("h3",{attrs:{id:"options-shu-xing",tabindex:"-1"}},[t._v("options 属性")]),t._m(1),d("h3",{attrs:{id:"shi-jian",tabindex:"-1"}},[t._v("事件")]),t._m(2),d("h3",{attrs:{id:"shu-ju-jie-gou",tabindex:"-1"}},[t._v("数据结构")]),t._m(3),t._m(4)],1)},S=[function(){var n=this,t=n._self._c;return t("table",[t("thead",[t("tr",[t("th",[n._v("参数")]),t("th",[n._v("说明")]),t("th",[n._v("类型")]),t("th",[n._v("可选值")]),t("th",[n._v("默认值")])])]),t("tbody",[t("tr",[t("td",[n._v("nodeConfig.sync")]),t("td",[n._v("流程配置")]),t("td",[n._v("Object")]),t("td",[n._v("-")]),t("td",[n._v("{}")])]),t("tr",[t("td",[n._v("readonly")]),t("td",[n._v("是否只读，是的情况下只能查看")]),t("td",[n._v("Boolean")]),t("td",[n._v("-")]),t("td",[n._v("false")])]),t("tr",[t("td",[n._v("options")]),t("td",[n._v("配置选项")]),t("td",[n._v("Object")]),t("td",[n._v("-")]),t("td",[n._v("-")])]),t("tr",[t("td",[n._v("isStartEmptyFn")]),t("td",[n._v("判断开始节点是否为空的方法，参数为节点配置 nodeConfig")]),t("td",[n._v("Object")]),t("td",[n._v("-")]),t("td",[n._v("{}")])])])])},function(){var n=this,t=n._self._c;return t("table",[t("thead",[t("tr",[t("th",[n._v("参数")]),t("th",[n._v("说明")]),t("th",[n._v("类型")]),t("th",[n._v("可选值")]),t("th",[n._v("默认值")])])]),t("tbody",[t("tr",[t("td",[n._v("backgroud")]),t("td",[n._v("背景色")]),t("td",[n._v("String")]),t("td",[n._v("-")]),t("td",[n._v("#f5f5f7")])])])])},function(){var n=this,t=n._self._c;return t("table",[t("thead",[t("tr",[t("th",[n._v("参数")]),t("th",[n._v("说明")]),t("th",[n._v("参数")])])]),t("tbody",[t("tr",[t("td",[n._v("on-add")]),t("td",[n._v("添加节点")]),t("td",[n._v("-")])]),t("tr",[t("td",[n._v("on-edit")]),t("td",[n._v("编辑某个节点")]),t("td",[n._v("-")])]),t("tr",[t("td",[n._v("on-change")]),t("td",[n._v("配置发生改变")]),t("td",[n._v("-")])])])])},function(){var n=this,t=n._self._c;return t("p",[n._v("数据是一个 "),t("code",[n._v("NodeObject")]),n._v(" 对象，结构如下：")])},function(){var n=this,t=n._self._c;return t("table",[t("thead",[t("tr",[t("th",[n._v("字段名")]),t("th",[n._v("说明")]),t("th",[n._v("类型")]),t("th",[n._v("可选值")])])]),t("tbody",[t("tr",[t("td",[n._v("nodeId")]),t("td",[n._v("节点的唯一 id")]),t("td",[n._v("String")]),t("td",[n._v("-")])]),t("tr",[t("td",[n._v("nodeName")]),t("td",[n._v("节点的名称")]),t("td",[n._v("String")]),t("td",[n._v("-")])]),t("tr",[t("td",[n._v("nodeType")]),t("td",[n._v("节点的类型")]),t("td",[n._v("String")]),t("td",[n._v("start、route、condition、node")])]),t("tr",[t("td",[n._v("childNode")]),t("td",[n._v("子节点配置，是 NodeObject 对象")]),t("td",[n._v("Object")]),t("td",[n._v("-")])]),t("tr",[t("td",[n._v("conditionNodes")]),t("td",[n._v("子节点配置，NodeObject 数组")]),t("td",[n._v("Array")]),t("td",[n._v("-")])])])])}],I=g(E,b,S,!1,null,null,null,null);const G=I.exports;export{G as default};
