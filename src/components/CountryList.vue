<template>
<div class="row q-pa-md justify-between">
      <div class="col-6 col-md-4">
          <q-input
          debounce="500"
          filled
          placeholder="Search for country"
          @update:model-value="searchByname($event)"
        >
          <template v-slot:append>
            <q-icon name="search"></q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-12 col-md-4 align-end full-height justify-center">
      <RegionFilter @filter="filterCountriesByRegion" />
      </div>
    </div>

    <div class="q-pa-md row wrap justify-center  q-gutter-lg"  v-if="countries?.length" >
        <q-card class="country-summary" v-for="(country) in countries" :key="country.name" @click="redirect(country.name)">
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
import {  onMounted } from '@vue/runtime-core'
import {useStore } from 'vuex'
import router from "@/router";
import {ref} from 'vue';
import RegionFilter from '@/components/RegionFilter.vue'
export default{

  components:{
    RegionFilter,
  },

    setup(){
        const store = useStore();
        const countries = ref();

        onMounted(async ()=>{
          await store.dispatch('getCountryList')
          countries.value = store.getters['getCountryLists'];
        })

        function searchByname(name){
          countries.value =  store.getters['getCountryLists'].filter((country) => {
                return (
                  country?.name
                    .toLowerCase()
                    .indexOf(name?.toLowerCase()) != -1
                );
              });
        }

        function filterCountriesByRegion(region){
          if(region != 'All'){
            countries.value =  store.getters['getCountryLists'].filter((country) => {
                return (
                  country?.region
                    .toLowerCase()
                    .indexOf(region?.toLowerCase()) != -1
                );
              });
          }
  }

      function redirect(name){
        router.push({ name: 'country-detail', params: { id: name } })
      }
      
        return {
            redirect,
            countries,
            searchByname,
            filterCountriesByRegion
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

.align-end{
  text-align: end;
  padding: 10px;
}
</style>
