export default defineEventHandler(async (event) => {
  const { slug: _slug } = getQuery(event)
  const slug = _slug === '/' ? '/' : _slug?.toString().replace(/\/$/, '')

  const { pageCollection } = await graphqlClient({
    query: useRuntimeConfig().public.graphql['PageBySlug.Query.gql'],
    variables: {
      slug,
    },
  })

  const [page] = pageCollection?.items ?? []

  return page!
})
