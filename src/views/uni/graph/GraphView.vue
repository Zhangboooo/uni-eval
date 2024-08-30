<script setup lang="ts">
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue'
</script>

<template>
  <v-row no-gutters class="h-full">
    <v-col cols="2"> <div>123</div></v-col>
    <v-col cols="10" class="h-full">
      <OverlayScrollbarsComponent class="h-full" defer>
        <p v-for="item in 500" :key="item">
          <span>{{ item }}</span>
        </p>
      </OverlayScrollbarsComponent>
    </v-col>
  </v-row>
  <!--  <div class="h-full flex">-->
  <!--    &lt;!&ndash;    <v-navigation-drawer>Sider</v-navigation-drawer>&ndash;&gt;-->
  <!--    -->
  <!--  </div>-->
</template>

<style scoped lang="postcss"></style>
