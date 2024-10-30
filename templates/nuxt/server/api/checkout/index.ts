import { defineEventHandler, sendRedirect } from 'h3'
import type { ServerList } from '@polar-sh/sdk/src/lib/config'
import { usePolar } from '~/utils/polar'

export default defineEventHandler(async (event) => {
  const { priceId } = getQuery(event)
  if (!priceId) throw Error('MISSING_PRICE_ID_QUERY_PARAM')
  const productPriceId = priceId.toString()

  const url = getRequestURL(event)
  url.pathname = '/checkout/confirmation?checkout_id={CHECKOUT_ID}'
  const successUrl = url.toString()

  const {
    polarAccessToken, polarServer,
  } = useRuntimeConfig(event)

  const polar = usePolar(polarAccessToken, polarServer as keyof typeof ServerList)

  try {
    const result = await polar.checkouts.custom.create({
      productPriceId,
      successUrl,
    })

    return sendRedirect(event, result.url)
  } catch (error) {
    console.error(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      fatal: true,
    })
  }
})
