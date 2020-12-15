<template>
  <div class="block-root">
    <button
      class="hover-button"
      @click="$emit('remove')"
    ><span class="material-icons">clear</span></button>
    <button class="hover-button"><span class="material-icons">more_vert</span></button>
    <div
      @input="handleInput"
      @keydown="handleKeydown"
      class="div-input should-focus"
      contenteditable="true"
      placeholder="Type something"
      v-text="data.text"
    ></div>
  </div>
</template>
<script>
import { computed } from 'vue'
export default {
  name: 'base-block',
  props: {
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
<style scoped>
.div-input {
  min-width: 150px;
  padding-left: 48px;
}
.div-input:focus {
  outline: none;
}

.div-input:focus:empty::before {
  content: attr(placeholder);
  opacity: 30%;
}
</style>