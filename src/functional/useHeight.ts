import { Ref, ref } from "vue";
/**
 * 注：只能传入同级元素
 * 传入Ref数组,计算的元素的父容器减去其他元素的高度值
 */
export default (props: Array<Ref<unknown>>) => {
  const sum = ref(0);
  const parentHeight = ref(0);
  props.forEach((item: any) => {
    let el;
    if (item.value.__vnode) {
      // is HTML Element
      el = item.value;
    } else {
      // is Vue Component
      el = item.value.$el;
    }
    if (el) {
      sum.value += el.offsetHeight;
      parentHeight.value = el.parentElement.offsetHeight;
    }
  });
  const height = parentHeight.value - sum.value + "px";
  return { height };
};
