import type { ServerList } from '@polar-sh/sdk/src/lib/config'
import { usePolar } from '~/utils/polar'

export default defineEventHandler({
  handler: async (event) => {
    const {
      polarAccessToken, polarServer, polarOrganizationId,
    } = useRuntimeConfig(event)

    const polar = usePolar(polarAccessToken, polarServer as keyof typeof ServerList)

    const { result } = await polar.products.list({
      organizationId: polarOrganizationId,
      isArchived: false, // Only fetch products which are published
    })
    return result.items
  },
})
