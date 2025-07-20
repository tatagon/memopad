<template>
  <div v-if="memo">
    <MemoForm :memo="memo || {}" />
  </div>
  <div v-else>
    <p>指定されたメモはありません</p>
  </div>
</template>

<script setup>
import MemoForm from '@/components/MemoForm.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMemoStore } from '../store/memo'

const route = useRoute()
const memoStore = useMemoStore()
const id = computed(() => parseInt(route.params.id))
const memo = computed(() => memoStore.getMemoById(id.value))
</script>
