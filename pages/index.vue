<script setup lang="ts">
import { Page } from '~~/types/contentful'

const { data: pages } = await useFetch<Page[]>(`/api/pages`)

const dev = computed(() => import.meta.env.DEV)
</script>

<template>
  <Meta
    v-if="!dev"
    http-equiv="refresh"
    content="0;URL='https://www.youtube.com/@KaymicGaming'"
  />
  <NuxtLayout name="body">
    <div class="prose mx-auto">
      <h1>
        Kaymic Gaming

        <small class="font-thin">Redirecting...</small>
      </h1>

      <h2>Pages</h2>
      <ul>
        <li v-for="page in pages">
          <a :href="page.path!">
            {{ page.title }}
          </a>
        </li>
      </ul>
    </div>
  </NuxtLayout>
</template>
