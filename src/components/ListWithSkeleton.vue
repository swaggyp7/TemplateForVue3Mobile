<script setup lang="ts">
import { ref, defineProps, reactive } from "vue";
import { Skeleton, PullRefresh as VanPullRefresh, List as VanList } from "vant";
import { isArray } from "lin-tools-ts";

const props = defineProps<{
  skeleton?: boolean;
  service: (params: Record<string, any>) => Promise<any>;
  params?: Record<string, any>;
}>();
const pageState = reactive({
  index: 1,
  size: 10,
});
const listState = reactive({
  loading: false,
  skeletonLoading: false,
  finished: false,
  refreshing: false,
});
const defualtData = props.skeleton ? 10 : [];
const list: Record<string, any> = ref(defualtData);

const onLoad = () => {
  if (listState.refreshing) {
    pageState.index = 1;
    list.value = defualtData;
    listState.skeletonLoading = !!props.skeleton && true;
  }
  const apiParams = {
    page: pageState.index,
    limit: pageState.size,
    ...props.params,
  };
  props.service(apiParams).then((data) => {
    listState.refreshing = false;
    if (pageState.index === 1 && isArray(data)) {
      list.value = data;
    } else if (data.length > 0) {
      list.value = list.value.concat(data);
    }
    pageState.index++;
    listState.loading = false;
    listState.skeletonLoading = false;

    if ((isArray(data) && data.length === 0) || !isArray(data)) {
      listState.finished = true;
    }
  });
};

const initialize = () => {
  listState.loading = true;
  listState.skeletonLoading = !!props.skeleton && true;
  const apiParams = {
    page: pageState.index,
    limit: pageState.size,
    ...props.params,
  };
  props.service(apiParams).then((data) => {
    list.value = data;
    pageState.index++;
    listState.loading = false;
    listState.skeletonLoading = false;

    if ((isArray(data) && data.length === 0) || !isArray(data)) {
      listState.finished = true;
    }
  });
};

initialize();

const onRefresh = () => {
  // 清空列表数据
  listState.finished = false;
  listState.loading = true;
  onLoad();
};
</script>

<template>
  <van-pull-refresh
    class="scrollable-list"
    v-model="listState.refreshing"
    @refresh="onRefresh"
  >
    <van-list
      v-model:loading="listState.loading"
      :finished="listState.finished"
      @load="onLoad"
    >
      <template v-if="props.skeleton" #loading></template>
      <div
        v-for="item in list"
        :key="item"
        class="py-2 mx-5 my-4 h-20 rounded-xl border border-1"
      >
        <skeleton
          title
          avatar
          round
          :row="1"
          :loading="listState.skeletonLoading"
        >
          <slot :item="item"> item </slot>
        </skeleton>
      </div>
    </van-list>
  </van-pull-refresh>
</template>
