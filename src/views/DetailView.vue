<script setup lang="ts">
import { useRoute } from 'vue-router'
import useFetch from '@/composables/useFetch'

interface Pokemon {
  id: number
  name: string
  sprites: {
    other: {
      home: {
        front_default: string
      }
    }
  }
  // other properties
}

const route = useRoute()

const { data, loading } = useFetch<Pokemon>({
  url: `${import.meta.env.VITE_API_BASE_URL}/pokemon/${route.params.name}`
})
</script>

<template>
  <main>
    <section>
      <template v-if="loading">Loading...</template>
      <template v-else>
        <img
          :src="data?.sprites.other.home.front_default"
          alt="pokemon"
          width="500"
          height="auto"
        />
        <p>id: {{ data?.id }}</p>
        <h1>{{ data?.name }}</h1>
      </template>
    </section>
  </main>
</template>
