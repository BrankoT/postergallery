<template>
  <q-page>
    <div class="q-pa-md">
      <div v-if="getAlbum" class="q-mb-md text-h4">{{getAlbum.title}}</div>
      <div v-else class="q-mb-md text-h4">Oops, something went wrong</div>
      <q-separator class="q-mb-md"/>

    </div>
    <div v-if="getAlbum" class="row">
      <template v-if="getFilteredPosters.length">
        <div v-for="(poster, index) in getFilteredPosters" :key="index" class="col-12 col-md-4 col-lg-3">
          <ImageItem @action="showPoster(poster)" @delete="removePoster(poster.id)" @edit="editPoster(poster)" :image="poster">
            <template v-slot:action>Show Poster</template>
          </ImageItem>
        </div>
      </template>
      <template v-else>
        <div class="col text-center">
          Sorry, there are no posters yet :(
        </div>
      </template>
    </div>
    <Modal v-if="getPoster" :modal="editPosterModal" @close="closeEditPosterModal">
      <template v-slot:header>Edit Poster</template>

      <q-card-section style="max-height: 50vh" class="scroll">
        <form action="post" enctype="multipart/form-data" @submit.prevent="onUpdatePoster" id="uploadPosterForm" class="q-mb-md">
          <q-input :value="newPoster.title" @input="updatePosterField($event, 'title')" label="Type poster title" class="q-mb-md"/>
          <q-input :value="newPoster.description" @input="updatePosterField($event, 'description')" label="Type poster descritpiton" class="q-mb-md"/>
          <q-input :value="newPoster.background" @input="updatePosterField($event, 'background')" label="Type poster background" class="q-mb-md"/>
        </form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn label="Upload" type="submit" color="primary" :disable="!newPoster.title || !newPoster.description || !newPoster.background" v-close-popup form="uploadPosterForm" />
      </q-card-actions>
    </Modal>
    <q-dialog v-if="getPoster" v-model="card" @hide="closeShowPosterModal">
      <q-card class="my-card" :style="{width: '300px', maxWidth: '90vw', backgroundColor: getPoster.background}">
        <q-card-section class="text-center">
          <q-img :src="getPoster.src" style="height: 300px; padding: 20px" contain/>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          <div class="text-subtitle1">{{getPoster.title}}</div>
          <div class="text-caption text-grey">{{getPoster.description}}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ImageItem from '../components/ImageItem'
import Modal from '../components/Modal'

export default {
  name: 'Album',
  components: { Modal, ImageItem },
  data: () => ({
    newPoster: {
      title: '',
      description: '',
      background: ''
    },
    card: false
  }),
  computed: {
    ...mapGetters('image', ['getPosters', 'getEditPosterModal', 'getPoster']),
    ...mapGetters('album', ['getAlbum']),
    editPosterModal: {
      get () {
        return this.getEditPosterModal
      },
      set (isOpen) {
        this.toggleEditPosterModal(isOpen)
      }
    },
    getFilteredPosters () {
      return this.getPosters.filter(poster => poster.albumId === parseInt(this.$route.params.id))
    }
  },
  created () {
    this.setAlbum(parseInt(this.$route.params.id))
  },
  methods: {
    ...mapActions('image', ['deletePoster', 'toggleEditPosterModal', 'setPoster', 'updatePoster']),
    ...mapActions('album', ['setAlbum']),
    showPoster (poster) {
      this.setPoster(poster)
      this.card = true
    },
    editPoster (poster) {
      this.newPoster = { ...poster }
      this.toggleEditPosterModal(true)
      this.setPoster(poster)
    },
    removePoster (posterId) {
      this.deletePoster(posterId)
    },
    closeEditPosterModal () {
      this.newPoster = {
        title: '',
        description: '',
        background: ''
      }
      this.toggleEditPosterModal(false)
      this.setPoster(null)
    },
    closeShowPosterModal () {
      this.setPoster(null)
      this.card = false
    },
    onUpdatePoster () {
      this.updatePoster({
        ...this.getPoster,
        ...this.newPoster
      })
    },
    updatePosterField (e, field) {
      switch (field) {
        case 'title':
          this.newPoster.title = e
          break
        case 'description':
          this.newPoster.description = e
          break
        case 'background':
          this.newPoster.background = e
          break
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.setAlbum(null)
    next()
  }
}
</script>
