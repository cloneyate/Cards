<template>
  <div class="block-root">
    <button
      class="hover-button"
      @click="$emit('remove')"
    ><span class="material-icons">clear</span></button>
    <button class="hover-button"><span class="material-icons">more_vert</span></button>
    <div ref="headerRef">
    </div>
  </div>
</template>

<script>
import { h, render, ref, onMounted } from 'vue'
export default {
  name: "header-block",
  props: {
    index: Number,
    data: {
      level: {
        type: Number,
        require: true
      },
      text: String
    }

  },
  setup (props) {
    const headerRef = ref(null)
    onMounted(() => {
      render(h('h' + props.data.level, {
        attrs: {
          contenteditable: true,
        }
      }, props.data.text), headerRef.value)
    })
    return {
      headerRef
    }
  }
}
</script>

<style lang="scss" scoped>
</style>