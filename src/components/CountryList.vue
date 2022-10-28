<template>
<div class="q-pa-md row wrap justify-center  q-gutter-lg"  v-if="countryList.length" >

    <q-card class="country-summary" v-for="(country) in countryList" :key="country.name" @click="redirect(country.name)">
      <img class="image" :src="country.flags.svg" alt="country flag">
      <q-card-section>
        <div class="text-h6">{{country.name}}</div>
        <div><span>Capital:</span> {{country.capital}}</div>
       <div><span>Population:</span>  {{  new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(country.population)}}</div>
        <div><span>Region:</span> {{country.region}}</div>
      </q-card-section>
    </q-card> 
</div> 

<div class="text-center" v-else>
  <h6>Searching......</h6>
</div>
</template>
<script>
import { computed, onMounted } from '@vue/runtime-core'
import {useStore } from 'vuex'
import router from "@/router";

export default{

    setup(){
        const store = useStore();
        onMounted(async ()=>{
          await store.dispatch('getCountryList')
        })

      const countryList = computed(()=>{
        return store.getters['getCountryLists'];
      })

      function redirect(name){
        router.push({ name: 'country-detail', params: { id: name } })
      }
        return {
            countryList,
            redirect
        }
    }
}
</script>
<style scoped>
.country-summary{
    max-width: 200px;
}
</style>
