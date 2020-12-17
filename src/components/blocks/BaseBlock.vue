<template>
  <div class="block-root">
    <block-action
      :index="index"
      v-if="!readOnly"
    >
    </block-action>

    <p
      @input="handleInput"
      @keydown="handleKeydown"
      class="para-input should-focus"
      :contenteditable="!readOnly"
      placeholder="Type something"
      v-text="data.text"
    ></p>

  </div>
</template>
<script>
import { computed } from 'vue'
import BlockAction from '../BlockAction.vue'
export default {
  components: { BlockAction },
  name: 'base-block',
  props: {
    readOnly: { type: Boolean, default: false },
    index: Number,
    data: {
      text: String
    }

  },
  setup (props, context) {
    const selection = computed(() => {
      return window.getSelection()
    })
    const handleInput = () => {
      context.emit('update:data', { text: event.target.innerText })
    }
    const handleKeydown = (event) => {
      let preSelection = selection.value
      let anchorOffset = preSelection.anchorOffset
      if (event.key === "Enter") {
        event.preventDefault()
        let leftText = event.target.innerText.slice(0, anchorOffset)
        let rightText = event.target.innerText.slice(anchorOffset)
        if (rightText.length != 0) {
          context.emit('insert-block', { split: true, leftText, rightText })
        } else {
          context.emit('insert-block', { split: false })
        }

      }
      else if (event.key === "Backspace" && event.target.innerText === '') {
        event.preventDefault()
        context.emit('remove')
      }
      else { null }
    }
    return {
      selection,
      handleInput,
      handleKeydown,
    }
  }

}

</script>
<style>
.para-input {
  min-width: 150px;
  margin-top: 0;
  margin-bottom: 0;
  outline: 0;
}
</style>