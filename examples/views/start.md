## 开始使用E2E

E2E提供了两个组件，分别是 `e2e-page-editor` 和 `e2e-page-builder`。

:::demo

```html
<e2e-page-builder type="" title="页面" :config="config"></e2e-page-builder>
<script>
export default {
  data(){
    return {
      config: {
        type: "e2e-page",
        componentId: "kjdvhsbb23jjf",
        items: [
          {
            type: "e2e-button",
            componentId: "kjdvhsbb21jjf",
          },
          {
            type: "e2e-button",
            componentId: "kjdvhsbb22jjf",
          },
        ]
      }
    }
  },
}
</script>
```

:::
