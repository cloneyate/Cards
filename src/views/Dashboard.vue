<template>
  <ion-menu content-id="mu-content">
    <ion-content>
      <ion-avatar>
        <ion-img src="assets/images/apex.png"> </ion-img>
      </ion-avatar>
      <h1 id="username">Username</h1>
      <ion-note>example@gmail.com</ion-note>
      <nav class="mdc-list">
        <a
          class="mdc-list-item mdc-list-item--activated"
          href="/dashboard"
          aria-current="page"
          tabindex="0"
        >
          <span class="mdc-list-item__ripple"></span>
          <i class="material-icons mdc-list-item__graphic" aria-hidden="true"
            >dashboard</i
          >
          <span class="mdc-list-item__text">Dashboard</span>
        </a>
        <a class="mdc-list-item" href="/settings">
          <span class="mdc-list-item__ripple"></span>
          <i class="material-icons mdc-list-item__graphic" aria-hidden="true"
            >settings</i
          >
          <span class="mdc-list-item__text">Settings</span>
        </a>
      </nav>
    </ion-content>
  </ion-menu>
  <ion-page id="mu-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Cards</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :ios="search" :md="search"></ion-icon>
          </ion-button>
          <ion-button @click="scanQr()">
            <ion-icon :ios="scan" :md="scan"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    
    <ion-content fullscreen scrollEvents="true" overflow-scroll="true"  id="main">
      <cards-list v-bind:cards-list-data="data['cardsListData']"></cards-list>
    </ion-content>
    
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="createModal()" >
        <ion-icon :ios="add" :md="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>

    <!--<ion-router-outlet id="mu-content"></ion-router-outlet>-->
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonAvatar,
  IonMenu,
  IonButtons,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  modalController
} from "@ionic/vue";
import { appsSharp, settingsSharp, add, search, scan } from "ionicons/icons";
import { useDashboard } from "@/composables/useDashboard";
import cardsList from "@/components/cardsList.vue";
import {reactive} from 'vue'
import Modal from './create.vue'

export default {
  name: "dashboard",
  components: {
    IonPage,
    IonAvatar,
    IonMenu,
    IonIcon,
    IonButtons,
    IonButton,
    IonFab,
    IonFabButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    cardsList
  },


  setup() {
    const { scanQr } = useDashboard();
    const data=reactive({
      cardsListData:[]
    });
    
    const refresh=()=> {
      const url = "http://127.0.0.1:5000/cards";
      fetch(url, {
        method: "GET",
        mode: "cors",
      })
        .then((response) => response.json())
        .then((myJson) => {
          data["cardsListData"]= myJson["cardsListData"];
        });

    };

    const createCard= () =>{
      alert("点击了创建卡片按钮");
    };


    async function createModal(){
      const modal= await modalController
      .create(
        {
          component:Modal,
        }
      )
      await modal.present()
    }

    
     function dismissModal() {
      modalController.dismiss()
    }

    refresh();

    return {
      scanQr,
      appsSharp,
      settingsSharp,
      add,
      search,
      scan,
      refresh,
      data,
      createCard,
      createModal,
      dismissModal
    };
  },
};
</script>

<style lang="scss" scoped>
@use "@material/list";
@include list.core-styles;

ion-menu-button {
  color: var(--ion-color-primary);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#main{
  overflow: auto;
}

#container a {
  text-decoration: none;
}
ion-menu {
  --width: 300px;
}

ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}
ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-note {
  margin-bottom: 20px;
  padding-left: 16px;
}

#username {
  font-size: 22px;
  font-weight: 600;
  min-height: 20px;
  padding-left: 16px;
}

ion-menu.md ion-avatar {
  margin-left: 16px;
  margin-bottom: 16px;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}
ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}
ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}
ion-menu.ios ion-note {
  margin-bottom: 8px;
}
ion-note {
  display: inline-block;
  font-size: 16px;
  color: var(--ion-color-medium-shade);
}
ion-content{
  overflow: auto;
}

div
  {
  overflow:auto;
  }
</style>