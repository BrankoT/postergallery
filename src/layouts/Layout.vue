<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen"/>
        <q-toolbar-title>Poster Gallery App</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-item-label header class="text-grey-8">Gallery Links</q-item-label>
      <DrawerLink v-for="link in routeLink" :key="link.title" v-bind="link"/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <Modal :modal="albumModal" @close="closeNewAlbumModal">
      <template v-slot:header>Create new Album</template>

      <q-card-section style="max-height: 50vh" class="scroll">
        <div v-if="!getAlbums.length && this.$route.path === '/'" class="text-center">There are no Albums yet. Let's create one first.</div>
        <form action="post" @submit.prevent="onSaveAlbum" id="createAlbum" class="q-mb-md">
          <q-input v-if="getAlbum" :value="getAlbum.title" @input="updateAlbumTitle" label="Type album name" class="q-mb-md"/>
          <q-input v-else v-model="albumName" label="Type album name" class="q-mb-md"/>
        </form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn v-if="getAlbum" label="Upload" type="submit" color="primary" :disable="!getAlbum.title" v-close-popup form="createAlbum" />
        <q-btn v-else label="Upload" type="submit" color="primary" :disable="!albumName" v-close-popup form="createAlbum" />
      </q-card-actions>
    </Modal>
  </q-layout>
</template>

<script>
import DrawerLink from 'components/DrawerLink.vue'
import Modal from '../components/Modal'
import { mapActions, mapGetters } from 'vuex'

const linksData = [
  {
    title: 'Images',
    caption: 'Upload images',
    icon: 'image',
    link: '/'
  },
  {
    title: 'Albums',
    caption: 'Make a new albums',
    icon: 'folder',
    link: '/albums'
  }
]

export default {
  name: 'Layout',
  components: { Modal, DrawerLink },
  data: () => ({
    leftDrawerOpen: false,
    routeLink: linksData
  }),
  computed: {
    ...mapGetters('album', ['getAlbums', 'getAlbum', 'getAlbumName', 'getNewAlbumModal']),
    ...mapGetters('image', ['getPosters']),
    albumName: {
      get () {
        return this.getAlbumName
      },
      set (albumName) {
        this.setAlbumName(albumName)
      }
    },
    albumModal: {
      get () {
        return this.getNewAlbumModal
      },
      set (isOpen) {
        this.toggleNewAlbumModal(isOpen)
      }
    }
  },
  methods: {
    ...mapActions('album', ['addAlbum', 'setAlbum', 'editAlbum', 'setAlbumName', 'updateAlbumName', 'toggleNewAlbumModal', 'toggleChooseAlbumModal']),
    ...mapActions('image', ['setSelectedImage']),
    onSaveAlbum () {
      if (!this.albumName) return

      if (this.getAlbum) {
        this.editAlbum({
          id: this.getAlbum.id,
          title: this.albumName
        })
      } else {
        this.addAlbum({
          id: Date.now(),
          title: this.albumName
        })
        if (this.$route.path === '/') {
          this.toggleChooseAlbumModal(true)
        }
      }

      this.albumName = ''
    },
    closeNewAlbumModal () {
      this.toggleNewAlbumModal(false)
      this.albumName = ''
      this.setAlbum(null)
    },
    updateAlbumTitle (e) {
      this.updateAlbumName(e)
    }
  }
}
</script>
