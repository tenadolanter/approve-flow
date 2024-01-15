import ApproveFlow from "./components/index.vue";

const components = [ApproveFlow];

const install = function(Vue){
  components.forEach(component => {
    const name = component.options?.name || component.name;
    Vue.component(name, component);
  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
ApproveFlow.install = install;
export default ApproveFlow;