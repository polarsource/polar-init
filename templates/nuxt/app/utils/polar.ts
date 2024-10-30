import { Polar } from '@polar-sh/sdk'
import type { ServerList } from '@polar-sh/sdk/src/lib/config'

export const usePolar = (accessToken: string, server: keyof typeof ServerList) => {
  return new Polar({
    accessToken,
    server,
  })
}
