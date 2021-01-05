<template>
  <main>
    <div id="wrapper">
      <label id="logo">Login</label>
      <label
        class="mdc-text-field mdc-text-field--outlined"
        ref="usernameRef"
      >
        <span class="mdc-notched-outline">
          <span class="mdc-notched-outline__leading"></span>
          <span class="mdc-notched-outline__notch">
            <span class="mdc-floating-label">Username</span>
          </span>
          <span class="mdc-notched-outline__trailing"></span>
        </span>
        <input
          v-model="username"
          type="text"
          class="mdc-text-field__input"
        />
      </label>
      <label v-if="errors.length">{{errors[0]}}</label>

      <label
        class="mdc-text-field mdc-text-field--outlined"
        ref="passwordRef"
      >
        <span class="mdc-notched-outline">
          <span class="mdc-notched-outline__leading"></span>
          <span class="mdc-notched-outline__notch">
            <span class="mdc-floating-label">Password</span>
          </span>
          <span class="mdc-notched-outline__trailing"></span>
        </span>
        <input
          v-model="password"
          type="password"
          class="mdc-text-field__input"
        />
      </label>
      <label v-if="errors.length">{{errors[1]}}</label>

      <button
        class="mdc-button mdc-button--raised"
        @click="loginClick()"
      >
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">Login</span>
      </button>

      <button
        class="mdc-button mdc-button--raised"
        @click="registerClick()"
      >
        <div class="mdc-button__ripple"></div>
        <span class="mdc-button__label">Register</span>
      </button>
    </div>
  </main>
</template>

<script>
import { onMounted, reactive, ref, inject } from "vue";
import { MDCTextField } from "@material/textfield";
import router from "@/router";
//import postUser from "@/composables/user.js"
import { auth, registerUser, getProfile } from "@/composables/endpoint.js"

export default {
  setup () {
    const openSnackbar = inject("openSnackbar");
    const username = ref("");
    const password = ref("");
    const usernameRef = ref(null);
    let usernameMdc = null;
    const passwordRef = ref(null);
    let passwordMdc = null;
    const errors = reactive(["", ""])

    function checkInput () {
      username.value ? username.value.trim().length < 4 ? errors[0] = 'Please input a longer username' : errors[0] = '' : errors[0] = 'Please input username'
      password.value ? password.value.trim().length < 8 ? errors[1] = 'Please input a longer password' : errors[1] = '' : errors[1] = 'Please input password'
      if (!errors[0] && !errors[1]) return true
      else return false
    }

    function loginClick () {
      if (checkInput()) {
        auth(username.value, password.value).then(output => {
          console.log(output)
          if (output["access_token"]) {
            for (const key in output) {
              localStorage.setItem(key, output[key]);
            }
            getProfile().then((output) => {
              for (let key in output) {
                localStorage.setItem(key, output[key])
              }
              router.push("dashboard");
            })
          }
          else {
            openSnackbar(output["detail"])
          }
        })

      }
    }

    function registerClick () {

      if (checkInput()) {
        const userObj = {
          "username": username.value,
          "nickname": username.value,
          "avatar_url": "/assets/defaultAvatar.png"
        };
        registerUser(userObj, password.value).then((output) => {
          if (output["_id"]) {
            openSnackbar("Register successfully")
            loginClick()
          }

        })
      }
    }

    onMounted(() => {
      usernameMdc = new MDCTextField(usernameRef.value);
      passwordMdc = new MDCTextField(passwordRef.value);
    });

    return {
      usernameRef,
      usernameMdc,
      username,
      passwordRef,
      passwordMdc,
      password,
      loginClick,
      registerClick,
      errors
    };
  },
};
</script>

<style lang="scss" scoped>
main {
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #56ccf2; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2f80ed,
    #56ccf2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2f80ed,
    #56ccf2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

#wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  padding: 16px;
  border-radius: 16px;
  background: white;
}

#logo {
  font-size: 36px;
}

.mdc-text-field {
  width: 360px;
  margin-top: 16px;
}

.mdc-button {
  width: 360px;
  margin-top: 16px;
  border-radius: 4px;
}
</style>