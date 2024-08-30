<script setup lang="ts">
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { computed, ref, watch } from 'vue'
import { useElementSize, watchOnce } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'

const splitRef = ref()
const { height: splitRefHeight } = useElementSize(splitRef)
const minSize = computed(() => Math.floor(5600 / splitRefHeight.value))
const maxSize = computed(() => 50)

const size = ref(0)
watchOnce(minSize, (val) => (size.value = val))

const activeLossItemKey = useRouteQuery('items', 'part')
const activeAddedLossItemKey = ref('part')

watch(activeLossItemKey, (val) => (activeAddedLossItemKey.value = val))
</script>

<template>
  <splitpanes ref="splitRef" class="default-theme flex-1" horizontal>
    <pane :size="100 - size">
      <div class="flex align-center bg-primary p-x-8">
        <v-chip prepend-icon="mdi-list-status" variant="text"> 损失项列表： </v-chip>
        <v-tabs class="flex-1" v-model="activeLossItemKey">
          <v-tab value="part">配件 </v-tab>
          <v-tab value="hour">工时 </v-tab>
          <v-tab value="mate">辅料 </v-tab>
          <v-tab value="outer">外修 </v-tab>
        </v-tabs>
        <v-btn-group>
          <v-btn variant="plain" color="white">自定义</v-btn>
        </v-btn-group>
      </div>

      <v-tabs-window v-model="activeLossItemKey">
        <v-tabs-window-item value="part">peijian</v-tabs-window-item>
        <v-tabs-window-item value="hour">gongshi</v-tabs-window-item>
        <v-tabs-window-item value="mate">fuliao</v-tabs-window-item>
        <v-tabs-window-item value="outer">waixiu</v-tabs-window-item>
      </v-tabs-window>
    </pane>
    <pane :min-size="minSize" :max-size="maxSize" v-model:size="size">
      <div class="flex align-center p-x-8">
        <v-chip prepend-icon="mdi-list-box-outline" variant="text"> 已添加损失项： </v-chip>
        <v-tabs v-model="activeAddedLossItemKey" class="flex-1">
          <v-tab value="part">配件 </v-tab>
          <v-tab value="hour">工时 </v-tab>
          <v-tab value="mate">辅料 </v-tab>
          <v-tab value="outer">外修 </v-tab>
        </v-tabs>
        <div>
          <v-btn v-if="size === minSize" @click="size = maxSize"> 展开 </v-btn>
          <v-btn v-if="size === maxSize" @click="size = minSize"> 收起 </v-btn>
        </div>
      </div>
      <v-tabs-window v-model="activeAddedLossItemKey">
        <v-tabs-window-item value="part">配件1</v-tabs-window-item>
        <v-tabs-window-item value="hour">工时1</v-tabs-window-item>
        <v-tabs-window-item value="mate">辅料1</v-tabs-window-item>
        <v-tabs-window-item value="outer">外修1</v-tabs-window-item>
      </v-tabs-window>
    </pane>
  </splitpanes>
</template>

<style scoped lang="postcss"></style>
