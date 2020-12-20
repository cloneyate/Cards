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
import { computed, inject } from 'vue'
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
  emits: ["update:data", "keydown"],

  setup (props, context) {
    const insertBlock = inject('insertBlock')
    const removeBlock = inject('removeBlock')
    const selection = computed(() => {
      return window.getSelection()
    })
    const handleInput = () => {
      context.emit('update:data', { text: event.target.innerText })
    }
    const handleKeydown = (event) => {
      if (event.key === "Enter") {
        let preSelection = selection.value
        let anchorOffset = preSelection.anchorOffset
        event.preventDefault()
        let leftText = event.target.innerText.slice(0, anchorOffset)
        console.log(leftText)
        let rightText = event.target.innerText.slice(anchorOffset)
        if (rightText.length != 0) {
          context.emit('update:data', { text: leftText })
          insertBlock('base-block', props.index, { text: rightText })
        } else {
          insertBlock('base-block', props.index)
        }
      }
      else if (event.key === "Backspace" && event.target.innerText === '') {
        event.preventDefault()
        removeBlock(props.index)
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
  margin-top: 2px;
  margin-bottom: auto;
  outline: 0;
}
</style>