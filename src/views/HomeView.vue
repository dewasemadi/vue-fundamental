<script setup lang="ts">
import useFetch from '@/composables/useFetch'

interface Pokemon {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}

interface Result {
  name: string
  url: string
}

const { data, error, loading } = useFetch<Pokemon>({
  url: `${import.meta.env.VITE_API_BASE_URL}/pokemon`
})
</script>

<template>
  <main>
    <section>
      <template v-if="loading">Loading...</template>
      <template v-else-if="error">Error: {{ error.message }}</template>
      <template v-else>
        <ul>
          <li v-for="result in data?.results" :key="result.name">
            <router-link :to="{ name: 'detail', params: { name: result.name } }">
              {{ result.name }}
            </router-link>
          </li>
        </ul>
      </template>
    </section>
  </main>
</template>
