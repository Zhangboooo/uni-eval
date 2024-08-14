<script setup lang="ts">
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
</script>

<template>
  <a-layout class="h-full">
    <a-layout-sider>Sider</a-layout-sider>
    <a-layout-content class="overflow-y-hidden">
      <OverlayScrollbarsComponent class="h-full" defer>
        <p v-for="item in 500" :key="item">
          <span>{{ item }}</span>
        </p>
      </OverlayScrollbarsComponent>
    </a-layout-content>
  </a-layout>
</template>

<style scoped lang="postcss"></style>
