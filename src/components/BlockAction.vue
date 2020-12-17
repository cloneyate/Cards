<template>
  <ui-menu-anchor>
    <button
      class="hover-button material-icons mdc-top-app-bar__action-item mdc-icon-button"
      @click="addMenuOpen=true"
    >add</button>
    <ui-menu v-model="addMenuOpen">
      <ui-menuitem @click="insertBlock('base-block',index,{text:''})">
        <span class="material-icons mdc-list-item__graphic">title</span>
        <ui-menuitem-text>Text</ui-menuitem-text>
      </ui-menuitem>
      <ui-menuitem @click="insertBlock('header-block',index,{text:'',level:2})">
        <span class="material-icons mdc-list-item__graphic"><img
            style="width:24px"
            src="@/assets/png/h1.png"
          ></span>
        <ui-menuitem-text>Heading 1</ui-menuitem-text>
      </ui-menuitem>
      <ui-menuitem @click="insertBlock('header-block',index,{text:'',level:3})">
        <span class="material-icons mdc-list-item__graphic"><img
            style="width:24px"
            src="@/assets/png/h2.png"
          ></span>
        <ui-menuitem-text>Heading 2</ui-menuitem-text>
      </ui-menuitem>
      <ui-menuitem @click="insertBlock('header-block',index,{text:'',level:4})">
        <span class="material-icons mdc-list-item__graphic"><img
            style="width:24px"
            src="@/assets/png/h3.png"
          ></span>
        <ui-menuitem-text>Heading 3</ui-menuitem-text>
      </ui-menuitem>
      <ui-item-divider></ui-item-divider>
      <ui-menuitem @click="insertBlock('image-block',index,{src:''})">
        <span class="material-icons mdc-list-item__graphic">insert_photo</span>
        <ui-menuitem-text>Image</ui-menuitem-text>
      </ui-menuitem>
      <ui-menuitem @click="insertBlock('logo-block',index,{text:'',logoName:''})">
        <span class="material-icons mdc-list-item__graphic">copyright</span>
        <ui-menuitem-text>Logo</ui-menuitem-text>
      </ui-menuitem>
    </ui-menu>
  </ui-menu-anchor>

  <ui-menu-anchor>
    <button
      class="hover-button material-icons mdc-top-app-bar__action-item mdc-icon-button"
      @click="moreMenuOpen=true"
    >more_vert</button>
    <ui-menu v-model="moreMenuOpen">
      <ui-menuitem @click="removeBlock(index)">
        <span class="material-icons mdc-list-item__graphic">delete</span>
        <ui-menuitem-text>Delete</ui-menuitem-text>
      </ui-menuitem>
      <ui-menuitem @click="()=>{if(index!=0)switchBlock(index,index-1)}">
        <span class="material-icons mdc-list-item__graphic">arrow_upward</span>
        <ui-menuitem-text>Move up</ui-menuitem-text>
      </ui-menuitem>
      <ui-menuitem @click="switchBlock(index,index+1)">
        <span class="material-icons mdc-list-item__graphic">arrow_downward</span>
        <ui-menuitem-text>Move down</ui-menuitem-text>
      </ui-menuitem>

    </ui-menu>
  </ui-menu-anchor>
</template>
<script>
import { inject, ref } from 'vue'
export default {
  name: 'block-action',
  props: {
    index: { type: Number, require: true }
  },
  setup () {
    const addMenuOpen = ref(false)
    const moreMenuOpen = ref(false)
    const insertBlock = inject('insertBlock')
    const removeBlock = inject('removeBlock')
    const switchBlock = inject('switchBlock')
    return {
      insertBlock,
      removeBlock,
      switchBlock,
      moreMenuOpen,
      addMenuOpen,
    }
  }
}
</script>