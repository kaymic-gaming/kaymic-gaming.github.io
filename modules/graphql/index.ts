import { defineNuxtModule, createResolver } from '@nuxt/kit'
import { globSync } from 'glob'
import { parse } from 'node:path'
import { readFileSync } from 'node:fs'
import { gql } from 'graphql-tag'
import { print } from 'graphql'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtModule({
  async setup(_options, nuxt) {
    nuxt.options.runtimeConfig.public['graphql'] = await fetchQueries()
  },
})

async function fetchQueries() {
  const paths = globSync('**/*.Query.gql').map((path) => parse(path).base)
  const rt: any = {}
  for (const path of paths) {
    rt[path] = compileQuery(path)
  }
  return rt
}

/**
 *
 * @param path
 * @returns
 */
function compileQuery(path: string) {
  const regex = /\#import\s*\"(.*)\"/

  let query = ''

  while (path) {
    query += readFileSync(resolve('raw', path), 'utf8')
    const match = query.match(regex)?.[1] || null
    path = match ? resolve('raw', match) : null!
    query = query.replace(regex, '')
  }

  const compiledQuery = print(
    gql`
      ${query}
    `
  )

  return compiledQuery.replace(/\s+/g, ' ').trim()
}
