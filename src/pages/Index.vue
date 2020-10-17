<template>
  <q-page>
    <div class="q-pa-md">
      <div class="q-mb-md text-h4">Images</div>
      <q-separator class="q-mb-md" />
    </div>

    <div class="row">
      <template v-if="getImages.length">
        <div v-for="(image, index) in getImages" :key="index" class="col-12 col-md-4 col-lg-3">
          <ImageItem @action="makePoster(image)" @delete="removeImage(image.id)" :image="image">
            <template v-slot:action>Make a Poster</template>
          </ImageItem>
        </div>
      </template>
      <template v-else>
        <div class="col text-center">
          Sorry, there are no images yet :(
        </div>
      </template>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="toggleNewImageModal(true)" />
    </q-page-sticky>

    <Modal :modal="imageModal" @close="closeNewImageModal">
      <template v-slot:header>Upload new Image</template>

      <q-card-section style="max-height: 50vh" class="scroll">
        <form action="post" enctype="multipart/form-data" @submit.prevent="onFileSelected" id="uploadNewImageForm" class="q-mb-md">
          <q-file clearable counter v-model="image" label="Upload photo" class="q-mb-md" />
        </form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn label="Upload" type="submit" color="primary" :disable="!image" v-close-popup form="uploadNewImageForm" />
      </q-card-actions>
    </Modal>
    <Modal :modal="chooseAlbumModal" @close="closeChooseAlbumModal">
      <template v-slot:header>Choose Album</template>

      <q-card-section style="max-height: 50vh" class="scroll">
        <form action="post" enctype="multipart/form-data" @submit.prevent="onPosterCreated" id="makePosterForm" class="q-mb-md">
          <q-stepper v-model="step" ref="stepper" contracted color="primary" animated>
            <q-step :name="1" title="Select campaign settings" icon="folder" :done="step > 1" >
              <q-list>
                  <div v-for="(album, index) in getAlbums" :key="index">
                    <q-item tag="label" v-ripple>
                      <q-item-section avatar>
                        <q-radio v-model="albumId" @input="selectAlbum(album.id)" :val="album.id"/>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{album.title}}</q-item-label>
                      </q-item-section>
                      <q-item-section side>
                        {{getPosters.filter(poster => poster.albumId === album.id).length}}
                      </q-item-section>
                    </q-item>
                  </div>
              </q-list>
            </q-step>

            <q-step :name="2" title="Create an ad group" caption="Optional" icon="settings" :done="step > 2">
              <q-input v-model="newPoster.title" label="Type Poster title" class="q-mb-md"/>
              <q-input v-model="newPoster.description" label="Type Poster description" class="q-mb-md"/>
              <q-input v-model="newPoster.background" label="Type Poster background" class="q-mb-md"/>
            </q-step>

            <q-step :name="3" title="Create an ad" icon="create_new_folder">
              Congratulations, this is your last step. Let's finish it and see what you have created.
            </q-step>

          </q-stepper>
        </form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn v-show="step === 3" label="Finish" type="submit" color="primary" :disable="!newPoster.title || !newPoster.description || !newPoster.background || !albumId" v-close-popup form="makePosterForm" />
        <q-btn v-if="step !== 3" @click="$refs.stepper.next()" color="primary" label="Continue" />
        <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
      </q-card-actions>
    </Modal>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ImageItem from '../components/ImageItem'
import Modal from '../components/Modal'

export default {
  name: 'Index',
  components: { Modal, ImageItem },
  data: () => ({
    step: 1,
    albumId: null,
    newPoster: {
      title: '',
      description: '',
      background: ''
    }
  }),
  computed: {
    ...mapGetters('image', ['getImages', 'getImage', 'getNewImageModal', 'getPosters', 'getSelectedImage']),
    ...mapGetters('album', ['getAlbum', 'getAlbums', 'getChooseAlbumModal']),
    image: {
      get () {
        return this.getImage
      },
      set (image) {
        this.setImage(image)
      }
    },
    imageModal: {
      get () {
        return this.getNewImageModal
      },
      set (isOpen) {
        this.toggleNewImageModal(isOpen)
      }
    },
    chooseAlbumModal: {
      get () {
        return this.getChooseAlbumModal
      },
      set (isOpen) {
        this.toggleChooseAlbumModal(isOpen)
      }
    }
  },
  methods: {
    ...mapActions('image', ['addPoster', 'addImage', 'setImage', 'toggleNewImageModal', 'updatePosterTitle', 'deleteImage', 'setSelectedImage']),
    ...mapActions('album', ['setAlbum', 'toggleNewAlbumModal', 'toggleChooseAlbumModal']),
    onFileSelected () {
      if (!this.image) return

      const reader = new FileReader()
      reader.addEventListener('load', () => {
        this.addImage({
          id: Date.now(),
          src: reader.result,
          isPoster: false
        })
        this.image = null
      })

      reader.readAsDataURL(this.image)
    },
    onPosterCreated () {
      this.addPoster({
        ...this.getSelectedImage,
        ...this.newPoster,
        albumId: this.albumId,
        isPoster: true,
        id: Date.now()
      })
    },
    closeNewImageModal () {
      this.toggleNewImageModal(false)
      this.image = null
    },
    makePoster (image) {
      if (!this.getAlbums.length) {
        this.setSelectedImage(image)
        this.toggleNewAlbumModal(true)
      } else {
        this.setSelectedImage(image)
        this.toggleChooseAlbumModal(true)
      }
    },
    closeChooseAlbumModal () {
      this.newPoster = {
        title: '',
        description: '',
        background: ''
      }
      this.setSelectedImage(null)
      this.step = 1
      this.toggleChooseAlbumModal(false)
      this.setAlbum(null)
      this.albumId = null
    },
    selectAlbum (albumId) {
      this.setAlbum(albumId)
    },
    removeImage (imageId) {
      this.deleteImage(imageId)
    }
  },
  beforeRouteLeave (to, from, next) {
    this.setSelectedImage(null)
    next()
  }
}
</script>
