<script setup>
import { watch } from 'vue'

export function useProductSEO(product) {
  const updateProductMetaTags = (productData) => {
    if (!productData) return

    const title = `${productData.nameRu} | Toybola`
    const description = productData.descriptionRu?.slice(0, 155) || `Купить ${productData.nameRu} от производителя Toybola`
    const image = productData.images?.[0]?.imageUrl || 'https://toybola.com/og-image.jpg'

    // Update document title
    document.title = title

    // Update meta tags
    updateOrCreateMeta('description', description)
    updateOrCreateMeta('og:title', title)
    updateOrCreateMeta('og:description', description)
    updateOrCreateMeta('og:image', image)
    updateOrCreateMeta('og:type', 'product')
    updateOrCreateMeta('twitter:title', title)
    updateOrCreateMeta('twitter:description', description)
    updateOrCreateMeta('twitter:image', image)

    // Add product schema
    updateProductSchema(productData)
  }

  const updateOrCreateMeta = (name, content) => {
    let meta = document.querySelector(`meta[name="${name}"]`)
    if (!meta) {
      meta = document.querySelector(`meta[property="og:${name}"]`)
    }
    if (!meta) {
      meta = document.querySelector(`meta[name="twitter:${name}"]`)
    }

    if (meta) {
      meta.setAttribute('content', content)
    } else {
      const newMeta = document.createElement('meta')
      if (name.startsWith('og:')) {
        newMeta.setAttribute('property', name)
      } else if (name.startsWith('twitter:')) {
        newMeta.setAttribute('name', `twitter:${name}`)
      } else {
        newMeta.setAttribute('name', name)
      }
      newMeta.setAttribute('content', content)
      document.head.appendChild(newMeta)
    }
  }

  const updateProductSchema = (productData) => {
    // Remove existing schema
    const existingSchema = document.getElementById('product-schema')
    if (existingSchema) {
      existingSchema.remove()
    }

    // Create new schema
    const schema = document.createElement('script')
    schema.type = 'application/ld+json'
    schema.id = 'product-schema'
    
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: productData.nameRu,
      image: productData.images?.map(img => img.imageUrl) || [],
      description: productData.descriptionRu,
      sku: productData.sku,
      brand: {
        '@type': 'Brand',
        name: 'Toybola',
        url: 'https://toybola.com'
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: productData.priceMinUsd?.toString() || '0',
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        availability: productData.availability === 'in_stock' 
          ? 'https://schema.org/InStock' 
          : productData.availability === 'low_stock'
            ? 'https://schema.org/LimitedAvailability'
            : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'Toybola',
          url: 'https://toybola.com'
        }
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '125'
      }
    }

    // Add optional properties
    if (productData.material) {
      schemaData.material = productData.material
    }
    if (productData.recommendedAge) {
      schemaData.suggestedAge = productData.recommendedAge
    }
    if (productData.weightKg) {
      schemaData.weight = `${productData.weightKg} kg`
    }

    schema.textContent = JSON.stringify(schemaData)
    document.head.appendChild(schema)
  }

  // Watch for product changes
  watch(
    () => product.value,
    (newProduct) => {
      if (newProduct) {
        updateProductMetaTags(newProduct)
      }
    },
    { immediate: true }
  )

  return {
    updateProductMetaTags
  }
}
