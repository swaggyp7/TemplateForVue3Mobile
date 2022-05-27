<script setup lang="ts">
import { Tabbar, TabbarItem, Toast } from "vant";
import { onMounted, ref, watch } from "vue";
import { useWindowSize } from "@vant/use";
const { height } = useWindowSize();
const viewHeight = ref(0);
const tabbarRef = ref({ $el: { offsetHeight: 0 } });

const calculateViewHeight = () => {
  viewHeight.value = height.value - tabbarRef.value.$el.offsetHeight;
};

watch([height], () => {
  calculateViewHeight();
});

onMounted(() => {
  calculateViewHeight();
});
const onChange = (index) => Toast(`标签 ${index}`);
</script>

<template>
  <router-view :style="{ height: `${viewHeight}px` }" />
  <tabbar safe-area-inset-bottom placeholder fixed route @change="onChange">
    <tabbar-item ref="tabbarRef" icon="home-o" to="/home">Home</tabbar-item>
  </tabbar>
</template>

<style></style>
