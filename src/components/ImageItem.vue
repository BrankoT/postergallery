<template>
  <div class="q-px-md q-mb-lg">
    <q-card class="my-card relative-position">
      <q-img v-if="image.albumId" :src="image.src" :style="{backgroundColor: image.background, height: '150px'}" contain/>
      <q-img v-else :src="image.src" style="height: 150px;" contain/>
      <q-fab v-if="image.albumId" color="amber" text-color="black" icon="keyboard_arrow_left" direction="left" style="top: -10px; right: -10px; position: absolute" padding="sm">
        <q-fab-action color="negative" text-color="white" @click="$emit('delete')" icon="delete" />
        <q-fab-action color="positive" text-color="white" @click="$emit('edit')" icon="edit" />
      </q-fab>
      <q-btn v-else @click="$emit('delete')" round color="negative" icon="delete" class="absolute" style="top: -10px; right: -10px; padding: 0;"/>
      <div v-if="image.albumId">
        <q-separator />
        <q-card-section>
          <div class="text-subtitle1 ellipsis">{{image.title}}</div>
          <div class="text-caption text-grey ellipsis">{{image.description}}</div>
        </q-card-section>
      </div>
      <q-separator />
      <q-card-actions vertical>
        <q-btn flat color="primary" @click="$emit('action')">
          <slot name="action">Item Action</slot>
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'ImageItem',
  props: {
    image: {
      type: Object,
      required: true
    }
  }
}
</script>
