<template>
  <div class="block-root">
    <block-action
      :index="index"
      v-if="!readOnly"
    >
    </block-action>
    <div ref="headerRef">
    </div>
  </div>
</template>

<script>
import { h, render, ref, onMounted } from 'vue'
import BlockAction from '../BlockAction.vue'
export default {
  components: { BlockAction },
  name: "header-block",
  props: {
    readOnly: { type: Boolean, default: false },
    index: Number,
    data: {
      level: {
        type: Number,
        require: true
      },
      text: String
    }

  },
  setup (props, context) {
    const headerRef = ref(null)
    onMounted(() => {
      render(h('h' + props.data.level, {
        contenteditable: !props.readOnly,
        style: 'margin-block-start: 0;margin-block-end: 0;min-width:150px;outline:none',
        onInput: (event) => { context.emit('update:data', { text: event.target.innerText, level: props.data.level }) }
      }, props.data.text), headerRef.value)
    })
    return {
      headerRef
    }
  }
}
</script>

<style lang="scss">
</style>