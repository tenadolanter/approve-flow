## 开始使用E2E

E2E提供了两个组件，分别是 `e2e-page-editor` 和 `e2e-page-builder`。

### 拖拽生成配置

用于拖拽生成页面，拖拽的配置会生成json，最终这段json会被保存到数据库中(组件只向外提供了json和保存事件)。

使用方法：

```vue
<template>
  <E2ePageEditor :config="config"></E2ePageEditor>
</template>
<script>
import E2ePageEditor from "@tenado/pagebuilder/editor"
export default {
  components: {
    E2ePageEditor,
  },
  data(){
    return {
      config: {},
    }
  }
}
</script>
```

### 渲染页面

用于根据配置生成页面
