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
  <splitpanes ref="splitRef" class="default-theme" horizontal>
    <pane :size="100 - size">
      <a-tabs class="tabs" justify animation v-model:active-key="activeLossItemKey">
        <template #extra> </template>
        <a-tab-pane key="part" title="配件"> Content of Tab Panel 1 </a-tab-pane>
        <a-tab-pane key="hour" title="工时"> Content of Tab Panel 2 </a-tab-pane>
        <a-tab-pane key="mate" title="辅料"> Content of Tab Panel 2 </a-tab-pane>
        <a-tab-pane key="outer" title="外修"> Content of Tab Panel 2 </a-tab-pane>
      </a-tabs>
    </pane>
    <pane :min-size="minSize" :max-size="maxSize" v-model:size="size">
      <a-tabs class="tabs" justify animation v-model:active-key="activeAddedLossItemKey">
        <template #extra>
          <a-button v-if="size === minSize" @click="size = maxSize">
            展开
            <icon-up />
          </a-button>
          <a-button v-if="size === maxSize" @click="size = minSize">
            收起
            <icon-down />
          </a-button>
        </template>
        <a-tab-pane disabled>
          <template #title>
            <div>已添加配件</div>
          </template>
        </a-tab-pane>
        <a-tab-pane key="part" title="配件"> Content of Tab Panel 1 </a-tab-pane>
        <a-tab-pane key="hour" title="工时"> Content of Tab Panel 2 </a-tab-pane>
        <a-tab-pane key="mate" title="辅料"> Content of Tab Panel 2 </a-tab-pane>
        <a-tab-pane key="outer" title="外修"> Content of Tab Panel 2 </a-tab-pane>
      </a-tabs>
    </pane>
  </splitpanes>
</template>

<style scoped lang="postcss">
.tabs
  :deep(
    .arco-tabs-nav
      > .arco-tabs-nav-tab
      > .arco-tabs-nav-tab-list
      > .arco-tabs-tab:first-of-type.arco-tabs-tab-disabled
  ) {
  color: revert;
  cursor: revert;
}
:deep(.arco-tabs-tab-title) {
  padding: 0 30px;
}
</style>
