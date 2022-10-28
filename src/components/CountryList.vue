<template>
<div class="row q-pa-md justify-between">
      <div class="col-6 col-md-4">
          <q-input
          v-model="search"
          debounce="500"
          filled
          placeholder="Search for country"
        >
          <template v-slot:append>
            <q-icon name="search"></q-icon>
          </template>
        </q-input>
      </div>
      <!-- <div class="col-12 col-md-4">.col-12 .col-md-4</div> -->
    </div>

    <div class="q-pa-md row wrap justify-center  q-gutter-lg"  v-if="searchedCountries.length" >
        <q-card class="country-summary" v-for="(country) in searchedCountries" :key="country.name" @click="redirect(country.name)">
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
import {ref} from 'vue';
export default{

    setup(){
        const store = useStore();
        const search = ref('');
        onMounted(async ()=>{
          await store.dispatch('getCountryList')
        })

      const searchedCountries = computed(() => {
      return store.getters['getCountryLists'].filter((country) => {
        return (
          country?.name
            .toLowerCase()
            .indexOf(search?.value?.toLowerCase()) != -1
        );
      });
});

      function redirect(name){
        router.push({ name: 'country-detail', params: { id: name } })
      }
        return {
            redirect,
            search,
            searchedCountries
        }
    }
}
</script>
<style scoped>
.country-summary{
    max-width: 200px;
}

.q-pa-md {
    padding: 16px 80px;
}
</style>
