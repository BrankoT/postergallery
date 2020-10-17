<template>
    <div class="q-px-md q-mb-lg relative-position">
      <q-fab color="amber" text-color="black" icon="keyboard_arrow_left" direction="left" style="top: -10px; right: 5px; position: absolute" padding="sm">
        <q-fab-action color="negative" text-color="white" @click="removeAlbum(album.id)" icon="delete" />
        <q-fab-action color="positive" text-color="white" @click="editAlbum(album.id)" icon="edit" />
      </q-fab>
      <q-item :to="`/albums/${album.id}`" exact class="q-pa-md shadow-3">
        <q-item-section>
          <q-item-label class="text-h6" lines="1">{{album.title}}</q-item-label>
          <q-item-label caption lines="1">{{getPosters.filter(poster => poster.albumId === album.id).length}}</q-item-label>
        </q-item-section>
      </q-item>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'AlbumItem',
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('image', ['getPosters']),
    ...mapGetters('album', ['getAlbums'])
  },
  methods: {
    ...mapActions('album', ['setAlbumName', 'setAlbum', 'deleteAlbum', 'toggleNewAlbumModal']),
    editAlbum (albumId) {
      this.toggleNewAlbumModal(true)
      this.setAlbum(albumId)
    },
    removeAlbum (albumId) {
      this.deleteAlbum(albumId)
    }
  }
}
</script>
