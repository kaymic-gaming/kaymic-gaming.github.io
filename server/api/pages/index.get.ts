export default defineEventHandler(async (event) => {
  const query = useRuntimeConfig().public.graphql['PageIndex.Query.gql']

  const { pageCollection } = await graphqlClient({
    query,
  })

  return pageCollection?.items ?? []
})
