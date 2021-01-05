<template>
  <div class="block-root">
    <block-action
      :index="index"
      v-if="!readOnly"
    >
    </block-action>
    <template
      v-if="logoNameRef"
      style="display:flex"
    >
      <svg-logo
        :name="logoNameRef"
        width="36px"
        height="36px"
        style="flex-shrink:0"
      ></svg-logo>
      <h4
        placeholder="Type caption"
        :contenteditable="!readOnly"
        v-text="logoCaption"
        class="should-focus logo-caption"
        @input="handleInput"
      ></h4>
    </template>
    <div
      v-else
      @click="logoDialogOpen=true"
      class="menuBlock"
    >
      <span class="material-icons md-36px">copyright</span>
      <span style="line-height:36px">Click to choose logo</span>
    </div>
    <ui-dialog v-model="logoDialogOpen">
      <ui-dialog-title>Choose logo</ui-dialog-title>
      <ui-dialog-content>
        <logo-selector ref="selectorRef"></logo-selector>
      </ui-dialog-content>
      <ui-dialog-actions>
        <ui-button
          @click="logoDialogOpen=false"
          isDefault
        >Cancel</ui-button>
        <ui-button @click="handleDialog">Confirm</ui-button>
      </ui-dialog-actions>
    </ui-dialog>
  </div>
</template>
<script>
import { ref } from 'vue'
import LogoSelector from '../logoSelector.vue'
import BlockAction from '../BlockAction.vue'
export default {
  components: { LogoSelector, BlockAction },
  name: 'base-block',
  emits: ["update:data", "keydown"],
  props: {
    readOnly: { type: Boolean, default: false },
    index: Number,
    data: {
      text: String,
      logoName: { type: String, default: '' }
    }

  },
  setup (props, context) {
    const logoDialogOpen = ref(false)
    const selectorRef = ref(null)
    const logoCaption = ref(props.data.text)
    const logoNameRef = ref(props.data.logoName)
    function handleDialog () {
      logoNameRef.value = selectorRef.value.selectedSvg
      context.emit('update:data', { text: logoCaption.value, logoName: logoNameRef.value })
      logoDialogOpen.value = false
    }
    const handleInput = () => {
      context.emit('update:data', { text: event.target.innerText, logoName: logoNameRef.value })
    }
    return {
      logoCaption,
      logoNameRef,
      logoDialogOpen,
      selectorRef,
      handleDialog,
      handleInput
    }
  }

}

</script>
<style lang="scss">
.material-icons.md-36px {
  font-size: 36px;
}
.material-icons.md-48px {
  font-size: 48px;
}

.logo-caption {
  margin-left: 8px;
  border: none;
  outline: none;
}

.menuBlock {
  display: flex;
  background: #edece9;
  color: rgba(55, 53, 47, 0.6);
  border-radius: 4px;
  padding-left: 24px;
  padding-top: 6px;
  padding-bottom: 6px;
  height: 36px;
  flex-grow: 1;
}
.logo-caption {
  min-width: 150px;
  display: block;
  margin-top: auto;
  margin-bottom: auto;
  flex-grow: 1;
  font-weight: normal;
}

.logo-caption:empty::before {
  content: attr(placeholder);
  opacity: 30%;
}
</style>