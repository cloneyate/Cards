<template>
  <button @click="addBlock('p')">Add Paragraph</button>
  <button @click="addBlock('h2')">Add Heading2</button>
  <button @click="addBlock('img')">Add Image</button>
  <button @click="showDom">Show Blocks</button>
  <div id="root" ref="rootRef" contenteditable="true"></div>
</template>
<script>
import { ref, } from "vue";
export default {
  name: "my-editor",
  components: {},
  setup() {
    const rootRef = ref(null);
    const addBlock = (i) => {
      console.log(i);
      rootRef.value.appendChild(document.createElement("div"));
    };
    const showDom = () => {
      console.log(rootRef.value);
      console.log(rootRef.value.children);
    };

    return {
      rootRef,
      addBlock,
      showDom,
    };
  },
};
</script>