<template>
  <q-layout view="lHh Lpr lFf">
<div class="header">
    <p> Where in the world?</p>
    <ThemeSwitchVue/>
  </div>
    <q-page-container class="">
      <router-view :key="$route.path" />
    </q-page-container>
  </q-layout>
</template>

<script>
import ThemeSwitchVue from './components/ThemeSwitch.vue';
export default {
  name: 'LayoutDefault',
  components:{
    ThemeSwitchVue
  }
}
</script>
<style>
@import './styles/app.css';


</style>