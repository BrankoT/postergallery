<template>
  <q-dialog :value="modal" @hide="$emit('close')">
    <q-card style="width: 500px; max-width: 90vw;" @click.stop>
      <q-card-section class="row items-center">
        <div class="text-h6">
          <slot name="header">Modal Title</slot>
        </div>
        <q-space />
        <q-btn icon="close" flat round dense @click="$emit('close')" />
      </q-card-section>

      <q-separator />
      <slot>Modal content</slot>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modal: {
      type: Boolean,
      required: true
    }
  }
}
</script>
