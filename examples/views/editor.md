## e2e-page-editor

通过拖拽生成页面

:::demo

```html
<e2e-page-editor type="" title="页面" :config="config" :style="{ height: '680px' }"></e2e-page-editor>
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
