import { createStore } from 'vuex';
import axios from 'axios';
// Create a new store instance.
const store = createStore({
  state: {
    countryList: [],
    countryDetails : []
  },
  mutations: {
    SET_COUNTRY_LIST(state,data) {
      state.countryList = data
    },
    SET_COUNTRY_DETAILS(state,data) {
      state.countryDetails = data
    }
  },
  getters:{
    getCountryLists(state){
      return state.countryList;
    },
    getCountryDetailByName(state){
      return state.countryDetails;
    }
  },
  actions:{
   async  getCountryList(context){
        const data =   await  axios.get('https://restcountries.com/v2/all')
        context.commit('SET_COUNTRY_LIST',data.data)
      },
      async getCountryDetailByName(context,country){
        const data =   await  axios.get(`https://restcountries.com/v2/name/${country.name}`)
        context.commit('SET_COUNTRY_DETAILS',data.data)
      }
    },
})

export default store;