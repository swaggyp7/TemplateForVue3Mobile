<template>
  <div>
    <!--For testing useHeight-->
    <div class="py-4" ref="test">
      <img class="mx-auto h-32" src="../assets/logo.png" alt="" />
      <h1 class="text-4xl py-5 text-center">Vue3 + Typescript</h1>
      <h2 class="text-2xl py-2 text-center">
        Safari's scroll-bounce is banned
      </h2>
      <h2 class="text-xl py-2 text-center">
        Only the element(included it's children) with [scrollable] className
        could scrolling
      </h2>
    </div>
    <Button block ref="test1"
      >List below can auto calculate height with sibling node</Button
    >
    <div class="scrollable" :style="{ height: listHeight }">
      <list-with-skeleton
        skeleton
        v-slot="{ item }"
        :service="test_api_service"
      >
        <div>
          {{ item }}
        </div>
      </list-with-skeleton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { test_api_service } from "../services/TestServices";
import ListWithSkeleton from "@/components/ListWithSkeleton.vue";
import { defineProps, onMounted, ref } from "vue";
import axios from "@/request/index";
import { setToken } from "@/shared/index";
import { useI18n } from "vue-i18n";
import useHeight from "@/functional/useHeight";
import { Button } from "vant";
const { t } = useI18n();
defineProps<{ msg }>();
const test = ref(null);
const test1 = ref(null);
const listHeight = ref("");
onMounted(() => {
  const { height } = useHeight([test, test1]);
  listHeight.value = height;
});
setToken("test token :XD");
</script>
