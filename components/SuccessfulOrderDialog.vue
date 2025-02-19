<script setup lang="ts">
const visible = defineModel("visible", {
  default: false,
  required: true,
  type: Boolean,
});
</script>

<template>
  <v-dialog v-model="visible" width="auto">
    <v-card
      max-width="400"
      prepend-icon="mdi-congratulation"
      text="Вы успешно оформили покупку!"
      title="Оформление покупки"
    >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="ОК" @click="visible = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
