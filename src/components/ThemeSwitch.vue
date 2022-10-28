<template>
    <q-btn color="white" text-color="black" label="Light Mode" flat no-caps  @click="toggleDarkMode"></q-btn>
</template>
<script>
  import { useQuasar } from 'quasar';
export default {
    setup() {
      const $q = useQuasar();
      return {
        toggleDarkMode() {
          $q.dark.toggle();
        },
      };
    },
}
</script>