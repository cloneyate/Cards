<template>
  <editor-toolbar></editor-toolbar>
  <div id="container">
    <transition-group name="flip-list">
      <div
        class="block-container"
        v-for="(block,index) in blocks"
        :key="block.id"
      >
        <component
          :is="block.name"
          v-model:data="block.data"
          @insert-block="handleInsertBlock($event,block.name,index)"
          @remove="blocks.splice(index,1)"
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
import EditorToolbar from './EditorToolbar.vue'
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
  components: { EditorToolbar },
  directives: {
    focus: {
      mounted: function (el) {
        try {
          el.querySelector(".should-focus").focus()
        } catch (err) { null }
      }
    },
    test: {
      mounted: function (el) {
        try {
          el.focus()
        } catch (err) { null }
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
    function addBlock (component_name, data = { text: '' }) {
      let index = blocks.length - 1
      try {
        //index = window.getSelection().focusNode.closest('.block-root').getAttribute('index')
        console.log("获取成功", index)
      } catch (err) {
        console.log(err)
      }
      blocks.splice(index + 1, 0, {
        name: CamelCase2KebabCase(component_name),
        id: newId++,
        data,
      })
    }

    function handleInsertBlock (args, component_name, index,) {
      if (args.split) {
        blocks.splice(index + 1, 0, {
          name: CamelCase2KebabCase(component_name),
          id: newId++,
          data: {
            text: args.rightText
          }
        })
        blocks[index].data.text = args.leftText
      }
      else {
        blocks.splice(index + 1, 0, {
          name: CamelCase2KebabCase(component_name),
          id: newId++,
          data: {
            text: ''
          }
        })
      }
    }


    function getBlocks () {
      console.log(blocks)
      return blocks
    }
    provide('addBlock', addBlock)
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
      addBlock,
      getBlocks,
      handleInsertBlock
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

.block-root button {
  border: 0;
  padding: 0;
  background: white;
}

.hover-button {
  border: 0;
  padding: 0;
  background: white;
  visibility: hidden;
  float: left;
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
</style>