<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button @click="close()"></ion-back-button>
      </ion-buttons>
      <ion-title> Create </ion-title>
      <ion-buttons slot="end">
        <ion-button @click="saveCard()">
          <ion-icon :icon="save"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <div id="editorjs"></div>
  </ion-content>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import Link from "@editorjs/link";
import { IonHeader, IonContent, IonToolbar, IonTitle,IonBackButton } from "@ionic/vue";
import { save } from "ionicons/icons";
export default {
  name: "create",
  components: {
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonBackButton
  },
  setup(props,context) {
    const BASEURL="http://localhost:5000"
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        image: {
          class: Image,
          config: {
            endpoints: {
              byFile: BASEURL+"/uploadFile",
              byUrl: BASEURL+"/fetchUrl",
            },
          },
        },
        link: {
          class: Link,
          config: {
            endpoint: BASEURL+"/fetchUrl",
          },
        },
      },
    });

    function saveCard() {
      editor
        .save()
        .then((outputData) => {
            console.log(outputData)
          const url = BASEURL+"/createCard";
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

    function close(){
      context.emit('dismiss')
    }

    return {
      props,
      BASEURL,
      editor,
      saveCard,
      save,
      close
    };
  },
};
</script>