<script setup lang="ts">
import 'splitpanes/dist/splitpanes.css'
import VehicleView from './vehicle/VehicleView.vue'
import LossItemView from './loss/LossView.vue'
import { useRouteQuery } from '@vueuse/router'
import GraphView from '@/views/uni/graph/GraphView.vue'
const activeKey = useRouteQuery('action', 'vehicle')
</script>

<template>
  <a-layout class="h-full">
    <a-layout-header v-if="false" class="h-54px flex justify-between items-center">
      <div>logo</div>
      <div class="h-full">
        <a-button class="!h-full !px-8">
          <template #icon><icon-launch /></template>
          帮助
        </a-button>
        <a-dropdown position="br">
          <a-button class="!h-full !px-8">
            <template #icon><icon-settings /></template>
            设置
          </a-button>
          <template #content>
            <a-doption>Option 1</a-doption>
            <a-doption>Option 2</a-doption>
            <a-doption>Option 3</a-doption>
          </template>
        </a-dropdown>
      </div>
    </a-layout-header>
    <a-layout-content class="overflow-y-hidden">
      <a-tabs size="large" type="card" v-model:active-key="activeKey" justify animation>
        <template #extra>
          <a-space>
            <a-button>
              <template #icon><icon-launch /></template>
              帮助
            </a-button>
            <a-dropdown position="br">
              <a-button>
                <template #icon><icon-settings /></template>
                设置
              </a-button>
              <template #content>
                <a-doption>Option 1</a-doption>
                <a-doption>Option 2</a-doption>
                <a-doption>Option 3</a-doption>
              </template>
            </a-dropdown>
            <a-button type="primary"> 提交 </a-button>
          </a-space>
        </template>
        <a-tab-pane key="vehicle" title="定型">
          <VehicleView />
        </a-tab-pane>
        <a-tab-pane key="graph" title="图形点选">
          <GraphView />
        </a-tab-pane>
        <a-tab-pane key="loss" title="损失项">
          <LossItemView />
        </a-tab-pane>
      </a-tabs>
    </a-layout-content>
  </a-layout>
</template>

<style lang="postcss" scoped></style>
