<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-mb-md text-h4">Albums</div>
      <q-separator class="q-mb-md"/>
    </div>
    <div class="row">
      <template v-if="getAlbums.length">
        <div v-for="(album, index) in getAlbums" :key="index" class="col-12 col-md-6 col-lg-4">
          <AlbumItem :album="album"/>
        </div>
      </template>
      <template v-else>
        <div class="col text-center">
          Sorry, there are no albums yet :(
        </div>
      </template>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="toggleNewAlbumModal(true)" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AlbumItem from '../components/AlbumItem'

export default {
  name: 'Albums',
  components: { AlbumItem },
  computed: {
    ...mapGetters('album', ['getAlbums'])
  },
  methods: {
    ...mapActions('album', ['toggleNewAlbumModal'])
  }
}
</script>
