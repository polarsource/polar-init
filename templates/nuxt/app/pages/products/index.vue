<script setup lang="ts">
import type { Product } from '@polar-sh/sdk/models/components'
import type { ProductPrice } from '@polar-sh/sdk/src/models/components/productprice'

const products = ref<Product[]>([])

// This could be a global store (such a pinia) if your app has one
const fetchPolarProducts = async () => {
  return await useRequestFetch()<Product[]>(`/api/polar/products`)
}

const { data } = await useAsyncData(
    'fetchPolarProducts',
    () => fetchPolarProducts()
)
products.value = data.value ?? []

const formatPrice = (price: ProductPrice) => {
  switch (price.amountType) {
    case 'fixed':
      return `$${price.priceAmount / 100}`
    case 'free':
      return 'Free'
    default:
      return 'Pay what you want'
  }
}
</script>

<template>
  <div class="flex flex-col gap-y-32">
    <h1 class="text-5xl">
      Products
    </h1>
    <div class="grid grid-cols-4 gap-12">
      <div
        v-for="product in products"
        :key="product.id"
        class="flex flex-col gap-y-24 justify-between p-12 rounded-3xl bg-neutral-950 h-full border border-neutral-900"
      >
        <div class="flex flex-col gap-y-8">
          <h1 class="text-3xl">
            {{ product.name }}
          </h1>
          <p class="text-neutral-400">
            {{ product.description }}
          </p>
          <ul>
            <li
              v-for="benefit in product.benefits"
              :key="benefit.id"
              class="flex flex-row gap-x-2 items-center"
            >
              {{ benefit.description }}
            </li>
          </ul>
        </div>
        <div class="flex flex-row gap-x-4 justify-between items-center">
          <NuxtLink
            :to="'/api/checkout?priceId=' + product.prices[0].id"
            external
            class="h-8 flex flex-row items-center justify-center rounded-full bg-white text-black font-medium px-4"
          >
            Buy
          </NuxtLink>
          <span class="text-neutral-500">{{ formatPrice(product.prices[0]) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
