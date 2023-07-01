import { DocumentNode, print } from 'graphql'
import { Query } from '~~/types/contentful'
import { $fetch } from 'ofetch'

const {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_TOKEN,
  CONTENTFUL_PREVIEW_SECRET,
} = process.env

export async function graphqlClient<T = Query>(options: {
  query: DocumentNode | string
  variables?: Record<string, any>
  preview?: boolean
  previewSecret?: string
}) {
  let { query, variables, preview, previewSecret } = options

  query = typeof query !== 'string' ? print(query) : query

  const { data } = await $fetch<{ data: Query }>(
    `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID!}/environments/${CONTENTFUL_ENVIRONMENT!}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${
          preview && previewSecret === CONTENTFUL_PREVIEW_SECRET
            ? CONTENTFUL_PREVIEW_TOKEN!
            : CONTENTFUL_ACCESS_TOKEN!
        }`,
      },
      body: JSON.stringify({ query, variables }),
    }
  )

  return data as T
}
