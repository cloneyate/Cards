<template>
  <header class="mdc-top-app-bar mdc-top-app-bar--fixed" ref="topAppBarRef">
    <div class="mdc-top-app-bar__row">
      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"
      >
      <router-link to="dashboard">
        <button
          class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
        >
          arrow_back
        </button>
        </router-link>
        <span class="mdc-top-app-bar__title">Editor</span>
      </section>
      <section
        class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
        role="toolbar"
      >
        <button
          @click="openSaveDialog()"
          class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
          aria-label="Save"
        >
          save_alt
        </button>
      </section>
    </div>
  </header>

  <main class="main-content" id="main-content" ref="mainContentRef">
    <div class="mdc-top-app-bar--fixed-adjust">
      <div id="editorjs"></div>
    </div>
  </main>

  <div class="mdc-dialog" ref="saveDialogRef">
  <div class="mdc-dialog__container">
    <div class="mdc-dialog__surface"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="my-dialog-title"
      aria-describedby="my-dialog-content">
      <div class="mdc-dialog__title" id="my-dialog-title">
        Save Card?
      </div>
      <div class="mdc-dialog__actions">
        <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="cancel">
          <div class="mdc-button__ripple"></div>
          <span class="mdc-button__label">Cancel</span>
        </button>
        <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="discard" @click="saveCard()">
          <div class="mdc-button__ripple"></div>
          <span class="mdc-button__label">Save</span>
        </button>
      </div>
    </div>
  </div>
  <div class="mdc-dialog__scrim"></div>
</div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import Link from "@editorjs/link";
import { onMounted, ref } from "vue";
import { MDCTopAppBar } from "@material/top-app-bar";
import {MDCDialog} from '@material/dialog';

export default {
  name: "create",
  components: {},
  props:{
    preData:Object,
  },
  setup(props) {
    const BASEURL = "http://localhost:5000";
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        image: {
          class: Image,
          config: {
            endpoints: {
              byFile: BASEURL + "/uploadFile",
              byUrl: BASEURL + "/fetchUrl",
            },
          },
        },
        link: {
          class: Link,
          config: {
            endpoint: BASEURL + "/fetchUrl",
          },
        },
      },
      data:props.preData
    });

    function saveCard() {
      editor
        .save()
        .then((outputData) => {
          console.log(outputData);
          const url = BASEURL + "/createCard";
          fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(outputData),
          });
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }

    const topAppBarRef = ref(null);
    let topAppBar = null;
    const mainContentRef = ref(null);
    const saveDialogRef=ref(null)
    let saveDialog=null;

    onMounted(() => {
      topAppBar = MDCTopAppBar.attachTo(topAppBarRef.value);
      topAppBar.setScrollTarget(mainContentRef.value);
      saveDialog = new MDCDialog(saveDialogRef.value);
    });

    function openSaveDialog(){
      saveDialog.open()
    }
    return {
      BASEURL,
      editor,
      saveCard,
      close,
      topAppBarRef,
      topAppBar,
      mainContentRef,
      saveDialogRef,
      saveDialog,
      openSaveDialog
    };
  },
};
</script>
<style lang="scss">
@use "@material/icon-button";
@use "@material/top-app-bar/mdc-top-app-bar";
@use "@material/dialog";
@use "@material/button";

@include button.core-styles;
@include dialog.core-styles;

@include icon-button.core-styles;
</style>