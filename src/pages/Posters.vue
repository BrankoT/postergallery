<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-mb-md text-h4">Posters</div>
      <q-separator class="q-mb-md"/>

    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <!--todo-->
      <q-btn fab icon="add" color="primary" @click="toggleNewImageModal(true)" />
    </q-page-sticky>
  </q-page>
</template>

<script>
export default {
  name: 'Posters'
}
</script>
