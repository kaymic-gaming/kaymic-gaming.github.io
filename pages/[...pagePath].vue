<script setup lang="ts">
import { Page } from '~~/types/contentful'

const { path } = useRoute()
const { data: page } = await useFetch<Page>(`/api/pages/find?slug=${path}`)

if (!page.value)
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
</script>

<template>
  <NuxtLayout name="body">
    <div class="prose mx-auto">
      <h1>{{ page?.title }}</h1>

      <div v-html="useMarkdown(page?.body!)"></div>
    </div>
  </NuxtLayout>
</template>
