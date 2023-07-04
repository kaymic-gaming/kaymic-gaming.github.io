export default defineEventHandler(async (event) => {
  const { slug: _slug } = getQuery(event)
  const slug = _slug === '/' ? '/' : _slug?.toString().replace(/\/$/, '')

  const query = useRuntimeConfig().public.graphql['PageBySlug.Query.gql']

  const { pageCollection } = await graphqlClient({
    query,
    variables: {
      slug,
    },
  })

  const [page] = pageCollection?.items ?? []

  return page!
})
