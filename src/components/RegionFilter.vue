<template>
    <q-btn-dropdown  label="Filter by region">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section clickable v-close-popup @click="$emit('filter','All')">
                <q-item-label>All</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup v-for="region in regions" :key="region">
              <q-item-section clickable v-close-popup @click="$emit('filter',region)">
                <q-item-label>{{region}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
</template>
<script>
import { computed, } from 'vue';
import store from '@/store'

export default {
    setup(){
        const regions = computed(()=>{
            return  [...new Set(store.getters['getCountryLists'].map(({region}) => region))]
      })
      return{
        regions
      }
    }
    
}
</script>