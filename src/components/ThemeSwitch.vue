<template>
  <q-btn
    :label="$q.dark.mode ? 'Light mode' : 'Dark mode'"
    flat
    no-caps
    @click="toggleDarkMode"
    :icon="$q.dark.mode ? 'light_mode' : 'mode_night'"
  ></q-btn>
</template>
<script>
import { useQuasar } from "quasar";
export default {
  setup() {
    const $q = useQuasar();
    return {
      toggleDarkMode() {
        $q.dark.toggle();
      },
    };
  },
};
</script>
