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
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Cards</ion-title>
        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :ios="search" :md="search"></ion-icon>
          </ion-button>
          <ion-button @click="takePhoto()">
            <ion-icon :ios="scan" :md="scan"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :scrollEvents="true" :scrollX="true">
      <cards-list v-bind:cards-list-Data="reorder(cardsListData)"></cards-list>
    </ion-content>
    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button @click="addCard()">
        <ion-icon :ios="add" :md="add"></ion-icon>
      </ion-fab-button>
    </ion-fab>

    <ion-router-outlet id="mu-content"></ion-router-outlet>
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
} from "@ionic/vue";
import { appsSharp, settingsSharp, add, search, scan } from "ionicons/icons";
import { useDashboard } from "@/composables/useDashboard";
import { usePhotoGallery } from "@/composables/usePhotoGallery";
import cardsList from "./cardsList.vue";

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
    cardsList,
  },
  data: function () {
    return {
      cardsListData: [
        {
          mediaUrl: "assets/images/cgj.png",
          title: "陈冠锦",
          mainContent:
            "是最大的老色皮  是最大的老色皮  是最大的老色皮  是最大的老色皮  是最大的老色皮  是最大的老色皮  ",
        },
        {
          mediaUrl: "assets/images/apex.png",
          title: "Title2",
          mainContent: "main content",
        },
        {
          mediaUrl: "assets/images/apex.png",
          title: "Title3",
          mainContent: "main <h2 >content main</h2>  main content mainmain content mainmain content mainmain content mainmain content mainmain content mainmain content main",
        },
        {
          mediaUrl: "assets/images/apex.png",
          title: "Title4",
          mainContent: "main content",
        },
        {
          mediaUrl: "assets/images/apex.png",
          title: "Title5",
          mainContent: "main content ",
        },
      ],
    };
  },
  methods: {
    reorder: function(list){
      const cols=2;
      const out=[];
      let col=0
      while(col<cols){
        for(let i=0;i<list.length;i+=cols){
          const val=list[i+col];
          if (val!==undefined)
          out.push(val);
        }
        col++
      }
      console.log(out)
      return out
    },
    addCard: function () {
      this.cardsListData.push({
        mediaUrl: "assets/images/cgj.png",
        title: "陈冠锦",
        mainContent:
          "是最大的老色皮  是最大的老色皮  是最大的老色皮  是最大的老色皮  是最大的老色皮  是最大的老色皮  ",
      });
    },
  },

  setup() {
    const { scanQr } = useDashboard();
    const { takePhoto } = usePhotoGallery();
    return {
      takePhoto,
      scanQr,
      appsSharp,
      settingsSharp,
      add,
      search,
      scan
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
</style>