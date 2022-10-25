<script lang="ts" setup>
import { onMounted, ref, unref, watch } from 'vue';

import HttpDemo from 'module-a/component/http-demo/index.vue';

const name = $ref('123');

watch($$(name), (newVal) => {
  console.log('name changed', newVal);
});
</script>

<template>
  <div class="text-black" @click="$window.alert('1')">我是demo1</div>
  <button class="text-red-700 dark:text-green-400" @click="$router.push('/home/demo2')">Go To Demo2</button>
  <http-demo />
  <global-props-demo />
</template>

<style lang="less" scoped></style>
