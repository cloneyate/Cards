<template>
  <ui-textfield
    v-model="name"
    outlined
    fullwidth
  ><template #before>
      <ui-textfield-icon unclickable>search</ui-textfield-icon>
    </template>
  </ui-textfield>
  <div>
    <ul class="mdc-image-list my-image-list">
      <li
        class="mdc-image-list__item"
        v-for="(svg_name,index) in searchSvg"
        :key="index"
        @click="chooseSvg(svg_name)"
        :class="{selected:svg_name==selectedSvg}"
      >
        <svg-logo
          :name="svg_name"
          class="svg-icon-48px"
        ></svg-logo>
      </li>
    </ul>
  </div>

  <div>
    <img>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import svgList from '../composables/svgList'
export default {
  components: {},
  name: 'logo-selector',
  setup () {
    svgList
    const name = ref("")
    const selectedSvg = ref(false)
    const searchSvg = computed(() => {
      let output = []
      for (let i in svgList) {
        if (svgList[i].search(name.value) != -1) {
          output.push(svgList[i].substring(0, svgList[i].indexOf('.')))
        }
      }
      return output
    })

    const chooseSvg = (svg_name) => {
      selectedSvg.value = svg_name
    }
    return {
      name,
      searchSvg,
      chooseSvg,
      selectedSvg
    }
  }
}
</script>
<style lang="scss">
.mdc-image-list__item {
  width: 56px;
  height: 56px;
  border: 4px solid rgba(255, 255, 255, 0);
}
.my-image-list {
  height: 400px;
  overflow-y: auto;
}

.selected {
  border: 4px solid blue;
}
</style>