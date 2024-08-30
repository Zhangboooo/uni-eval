<script setup lang="ts">
import 'splitpanes/dist/splitpanes.css'
import VehicleView from './vehicle/VehicleView.vue'
import LossItemView from './loss/LossView.vue'
import { useRouteQuery } from '@vueuse/router'
import GraphView from '@/views/uni/graph/GraphView.vue'
const activeKey = useRouteQuery('action', 'vehicle')

defineProps<{
  lossNo: string
}>()
</script>

<template>
  <v-app class="h-full">
    <v-app-bar v-if="true">
      <template v-slot:prepend>
        <v-app-bar-nav-icon>
          <img class="w-full" src="@/assets/logo.svg" alt="logo" />
        </v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>
        <v-tabs v-model="activeKey">
          <v-tab value="vehicle"> 定型</v-tab>
          <v-tab value="graph"> 图形点选</v-tab>
          <v-tab value="loss">损失项 </v-tab>
        </v-tabs>
      </v-app-bar-title>

      <v-btn-group>
        <v-btn density="default">
          <template #prepend>
            <v-icon icon="mdi-school" />
          </template>
          操作指引
        </v-btn>
        <v-btn density="default">
          <template #prepend>
            <v-icon icon="mdi-help" />
          </template>
          帮助
        </v-btn>
        <v-menu position="br">
          <template #activator="{ props }">
            <v-btn v-bind="props">
              <template #prepend>
                <v-icon icon="mdi-cog" />
              </template>
              设置
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>list-item-title-1</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>list-item-title-2</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>list-item-title-3</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn-group>
    </v-app-bar>
    <v-main style="height: calc(100% - 64px)">
      <v-tabs-window v-model="activeKey" class="h-full">
        <v-tabs-window-item value="vehicle">
          <VehicleView />
        </v-tabs-window-item>
        <v-tabs-window-item value="graph" class="h-full">
          <GraphView />
        </v-tabs-window-item>
        <v-tabs-window-item value="loss" class="h-full">
          <LossItemView />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-main>
  </v-app>
</template>

<style lang="postcss" scoped></style>
