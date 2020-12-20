<template>
  <div id="container">
    <div
      @click="insertBlock('BaseBlock')"
      v-if="blocks.length==0"
      style="color: rgba(55, 53, 47, 0.6);padding-left:48px"
    >Tap here to continue...</div>
    <transition-group
      v-else
      name="flip-list"
    >
      <div
        class="block-container"
        v-for="(block,index) in blocks"
        :key="block.id"
      >
        <component
          :is="block.name"
          v-model:data="block.data"
          :index="index"
          v-focus
        >
        </component>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { onMounted, provide, reactive } from 'vue'
function CamelCase2KebabCase (str) {
  let output = ""
  for (let i in str) {
    if (/[A-Z]/.test(str[i])) {
      if (i != 0) output += '-'
      output += str[i].toLowerCase()
    } else output += str[i]
  }
  return output
}

export default {
  name: 'block-editor',
  components: {},
  directives: {
    focus: {
      mounted: function (el) {
        try {
          el.querySelector(".should-focus").focus()
          document.getSelection().modify('move', 'forward', 'paragraph')
        } catch (error) { console.log(error) }
      },
      beforeUnmount: function (el) {
        try {
          if (el.closest('.block-container').previousElementSibling) {
            el.closest('.block-container').previousElementSibling.querySelector(".should-focus").focus()
            document.getSelection().modify('move', 'forward', 'paragraph')
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  props: {
    components_name: {
      type: Array,
      default: () => ['BaseBlock', 'ImageBlock', 'LogoBlock']
    }
  },
  setup () {
    const blocks = reactive([])
    let newId = 1
    function insertBlock (component_name, index = 0, data = { text: '' }) {
      blocks.splice(index + 1, 0, {
        name: CamelCase2KebabCase(component_name),
        id: newId++,
        data,
      })
    }


    function removeBlock (index) {
      return blocks.splice(index, 1)
    }
    function switchBlock (index_1, index_2) {
      if (index_1 >= blocks.length || index_2 >= blocks.length)
        return false
      else {
        let temp = blocks[index_1]
        blocks[index_1] = blocks[index_2]
        blocks[index_2] = temp
        return true
      }

    }

    function getBlocks () {
      console.log(blocks)
      return blocks
    }

    provide('insertBlock', insertBlock)
    provide('removeBlock', removeBlock)
    provide('switchBlock', switchBlock)
    onMounted(() => {
      blocks.push({
        name: 'base-block',
        id: 0,
        data: {
          text: ''
        }
      })
    })
    return {
      blocks,
      insertBlock,
      getBlocks,
    }
  }
}
</script>
<style lang="scss">
#container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  min-height: 600px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.hover-button {
  padding: 0;
  width: 24px;
  height: 24px;
  background: white;
  visibility: hidden;
  flex-shrink: 0;
}

.block-root button:focus {
  outline: none;
}

.block-root:hover .hover-button {
  visibility: visible;
}

.block-container {
  margin-block: 2px;
}

.block-root {
  display: flex;
  align-items: flex-start;
}
</style>