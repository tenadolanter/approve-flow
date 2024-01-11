## Button

1212121

:::demo

```html
<e2e-page-builder :config="config"></e2e-page-builder>
<script>
export default {
  data(){
    return {
      config: {
        type: "e2e-page",
        items: [
          {
            type: "e2e-button",
          },
          {
            type: "e2e-button",
          },
        ]
      }
    }
  },
}
</script>
```

:::
