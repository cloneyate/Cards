<template>
  <label class="mdc-text-field mdc-text-field--filled mdc-text-field--no-label">
    <span class="mdc-text-field__ripple"></span>

    <input
      class="mdc-text-field__input"
      type="search"
      v-model="name"
      aria-labelledby="my-label-id"
    >
    <span class="mdc-line-ripple"></span>

  </label>
  <svg-icon name="apple"></svg-icon>
  <div style="height:400px;overflow:auto">
    <ul class="mdc-image-list my-image-list">
      <li
        class="mdc-image-list__item"
        v-for="(svg_name,index) in searchSvg"
        :key="index"
        @click="chooseSvg(svg_name)"
        :class="{selected:svg_name==selectedSvg}"
      >
        <svg-icon :name="svg_name"></svg-icon>
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
import SvgIcon from './SvgIcon.vue'
export default {
  components: { SvgIcon },
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
@use "@material/floating-label/mdc-floating-label";
@use "@material/line-ripple/mdc-line-ripple";
@use "@material/notched-outline/mdc-notched-outline";
@use "@material/textfield";
@use "@material/image-list/mdc-image-list";

@include textfield.core-styles;

.mdc-image-list__item {
  width: 56px;
  height: 56px;
  border: 4px solid rgba(255, 255, 255, 0);
}

.selected {
  border: 4px solid blue;
}
</style>