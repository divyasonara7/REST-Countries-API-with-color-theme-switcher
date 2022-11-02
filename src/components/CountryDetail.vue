<template>
  <div class="q-pa-md">
    <div class="back-btn">
      <q-btn label="Back" @click="this.$router.back()" no-caps></q-btn>
    </div>
    <div class="row justify-evenly flex">
      <div class="col-12 col-md-4">
        <img class="country-block-img" :src="country?.flags?.svg" alt="country flag" />
      </div>
      <div class="col-12 col-md-auto">
        <div class="row">
          <div class="col-12 col-md-auto">
            <p>{{ country.name }}</p>
            <div class="row">
              <div class="col-8 col-sm-6">
                <q-list>
                  <q-item v-ripple>
                    <q-item-section class="title">Native Name:</q-item-section>
                    <q-item-section>{{ country.nativeName }}</q-item-section>
                  </q-item>
                  <q-item v-ripple>
                    <q-item-section class="title">Population:</q-item-section>
                    <q-item-section>{{ country.population }}</q-item-section>
                  </q-item>
                  <q-item v-ripple>
                    <q-item-section class="title">Region:</q-item-section>
                    <q-item-section>{{ country.region }}</q-item-section>
                  </q-item>
                  <q-item v-ripple>
                    <q-item-section class="title">Sub Region:</q-item-section>
                    <q-item-section>{{ country.subregion }}</q-item-section>
                  </q-item>
                  <q-item v-ripple>
                    <q-item-section class="title">Capital:</q-item-section>
                    <q-item-section>{{ country.capital }}</q-item-section>
                  </q-item>
                </q-list>
              </div>
              <div class="col-6 col-sm-6">
                <q-list>
                  <q-item
                    v-ripple
                    v-for="(domain, index) in country.topLevelDomain"
                    :key="index"
                  >
                    <q-item-section class="title">Top Level Domain:</q-item-section>
                    <q-item-section>{{ domain }}</q-item-section>
                  </q-item>
                  <q-item
                    v-ripple
                    v-for="(currencies, index) in country.currencies"
                    :key="index"
                  >
                    <q-item-section class="title">Currencies: </q-item-section>
                    <q-item-section>{{ currencies.name }}</q-item-section>
                  </q-item>
                  <q-item v-ripple>
                    <q-item-section class="title">Languages:</q-item-section>
                    <q-item-section>{{ language }}</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 offset-md-5">
        <div class="q-pa-md q-gutter-sm">
          <span>border countries:</span>
          <q-btn
            dense
            color="white"
            :label="border"
            v-for="border in borderCounties"
            :key="border"
            text-color="black"
            size="sm"
            @click="redirect(border)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import store from "@/store";
import router from "@/router";

export default {
  setup() {
    const route = useRoute();

    onMounted(() => {
      const id = route.params.id;
      store.dispatch("getCountryDetailByName", { name: id });
      store.dispatch("getCountryList");
    });

    const allCountry = computed(() => {
      return store.getters["getCountryLists"];
    });
    const country = computed(() => {
      return Object.assign({}, ...store.getters["getCountryDetailByName"]);
    });

    const topLevelDomain = computed(() => {
      return country.value.topLevelDomain;
    });

    const language = computed(() => {
      return country?.value?.languages?.map(({ name }) => name).join(",");
    });

    const getCountryName = (code) => {
      let countryName;
      const country = allCountry.value.filter((element) => {
        if (element.alpha3Code === code) {
          return true;
        } else {
          return false;
        }
      });
      country.length ? (countryName = country[0].name) : false;
      return countryName;
    };

    const borderCounties = computed(() => {
      const borderCounty = [];
      country?.value?.borders?.map((element) => {
        allCountry.value.length ? borderCounty.push(getCountryName(element)) : false;
      });
      return borderCounty;
    });

    function redirect(name) {
      router.push({ name: "country-detail", params: { id: name } });
    }

    return {
      country,
      topLevelDomain,
      language,
      borderCounties,
      redirect,
    };
  },
};
</script>
