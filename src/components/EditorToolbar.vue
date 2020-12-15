<template>
  <div id="toolbar">
    <button
      class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
      @click="addBlock('base-block')"
    >
      title
    </button>
    <button
      @click="addBlock('header-block',{text:'aaa',level:1})"
      class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
    >
      <img src="@/assets/png/h1.png">
    </button>
    <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button">
      <img src="@/assets/png/h2.png">
    </button>
    <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button">
      <img src="@/assets/png/h3.png">
    </button>
    <button
      class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
      @click="addBlock('image-block')"
    >
      insert_photo
    </button>
    <button
      class="mdc-top-app-bar__action-item mdc-button toolbar-text-button"
      style="height: 36px;color: black;"
      @click="addBlock('logo-block')"
    >
      <div class="mdc-button__ripple"></div>
      <span class="mdc-button__label">logo</span>
    </button>
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  name: 'editor-toolbar',
  setup () {
    const addBlock = inject('addBlock')
    return {
      addBlock
    }
  }
}
</script>
<style lang="scss" scoped>
#toolbar {
  overflow-x: auto;
  display: flex;
  padding-left: 48px;
}

.mdc-icon-button {
  height: 36px;
  width: 36px;
  padding: 0;
}

.mdc-icon-button img {
  height: 24px;
  width: 24px;
  vertical-align: top;
}

.toolbar-text-button {
  --mdc-theme-primary: grey;
  --mdc-theme-on-primary: grey;
}
</style>