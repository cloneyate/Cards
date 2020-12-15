<template>
  <svg
    :class="className"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title v-if="title">{{ title }}</title>
    <use
      :xlink:href="iconName"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    />
  </svg>
</template>

<script>
function importAll (r) {
  r.keys().forEach(r);
}

importAll(require.context('@/assets/icons/svg', false, /\.svg$/));

export default {
  name: 'svg-logo',

  props: {
    name: {
      type: String,
      required: true
    },

    title: {
      type: String,
      default: null
    }

  },

  computed: {
    iconName () {
      return "#" + this.name;
    },

    className () {
      return 'svg-icon svg-icon--' + this.name;
    }
  }
};
</script>
<style scoped>
.svg-icon-36px {
  width: 36px;
  height: 36px;
}

.svg-icon-48px {
  width: 48px;
  height: 48px;
}
</style>


