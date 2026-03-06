import { watch } from 'vue'
import { useRoute } from 'vue-router'

export function useSEO() {
  const route = useRoute()

  const defaultSEO = {
    title: 'Toybola — Крупнейший производитель игрушек в Центральной Азии',
    description: 'Официальный сайт Toybola. Производство и оптовые поставки игрушек. 71M+ произведенных игрушек, экспорт в 12 стран.',
    image: 'https://toybola.com/og-image.jpg',
    type: 'website'
  }

  const pageSEO = {
    home: {
      title: 'Toybola — Главная | Производитель игрушек',
      description: 'Крупнейший производитель игрушек в Центральной Азии. 15 лет на рынке, 71M+ произведенных игрушек, экспорт в 12 стран.'
    },
    catalog: {
      title: 'Каталог игрушек | Toybola',
      description: 'Широкий ассортимент детских игрушек от производителя. Оптовые поставки. Более 1000 наименований продукции.'
    },
    about: {
      title: 'О компании | Toybola',
      description: 'История Toybola, наше производство, ценности и достижения. Крупнейший производитель игрушек в регионе.'
    },
    contacts: {
      title: 'Контакты | Toybola',
      description: 'Свяжитесь с нами для сотрудничества. Телефоны, адреса, форма обратной связи.'
    },
    product: {
      title: (product) => `${product.nameRu} | Toybola`,
      description: (product) => `${product.nameRu}. ${product.descriptionRu?.slice(0, 150) || ''}`,
      type: 'product'
    }
  }

  const updateMetaTags = (seo) => {
    // Title
    document.title = seo.title || defaultSEO.title

    // Meta Description
    updateMeta('description', seo.description || defaultSEO.description)

    // Keywords
    updateMeta('keywords', 'игрушки, производитель игрушек, оптовые игрушки, Toybola, детские игрушки, каталог игрушек, B2B игрушки')

    // Open Graph
    updateMeta('og:type', seo.type || defaultSEO.type)
    updateMeta('og:title', seo.title || defaultSEO.title)
    updateMeta('og:description', seo.description || defaultSEO.description)
    updateMeta('og:image', seo.image || defaultSEO.image)
    updateMeta('og:url', window.location.href)

    // Twitter
    updateMeta('twitter:title', seo.title || defaultSEO.title)
    updateMeta('twitter:description', seo.description || defaultSEO.description)
    updateMeta('twitter:image', seo.image || defaultSEO.image)
  }

  const updateMeta = (name, content) => {
    let element = document.querySelector(`meta[name="${name}"]`)
    if (!element) {
      element = document.querySelector(`meta[property="og:${name}"]`)
    }
    if (!element) {
      element = document.querySelector(`meta[name="twitter:${name}"]`)
    }
    
    if (element) {
      element.setAttribute('content', content)
    } else {
      const meta = document.createElement('meta')
      if (name.startsWith('og:')) {
        meta.setAttribute('property', name)
      } else if (name.startsWith('twitter:')) {
        meta.setAttribute('name', `twitter:${name}`)
      } else {
        meta.setAttribute('name', name)
      }
      meta.setAttribute('content', content)
      document.head.appendChild(meta)
    }
  }

  const updateProductSchema = (product) => {
    const existingSchema = document.getElementById('product-schema')
    if (existingSchema) {
      existingSchema.remove()
    }

    const schema = document.createElement('script')
    schema.type = 'application/ld+json'
    schema.id = 'product-schema'
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.nameRu,
      image: product.images?.[0]?.imageUrl || 'https://toybola.com/og-image.jpg',
      description: product.descriptionRu,
      sku: product.sku,
      brand: {
        '@type': 'Brand',
        name: 'Toybola'
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: product.priceMinUsd,
        availability: product.availability === 'in_stock' 
          ? 'https://schema.org/InStock' 
          : 'https://schema.org/OutOfStock',
        seller: {
          '@type': 'Organization',
          name: 'Toybola'
        }
      }
    })
    document.head.appendChild(schema)
  }

  watch(
    () => route.path,
    () => {
      const routeName = route.name
      let seo = {}

      if (routeName === 'home') {
        seo = pageSEO.home
      } else if (routeName === 'catalog') {
        seo = pageSEO.catalog
      } else if (routeName === 'about') {
        seo = pageSEO.about
      } else if (routeName === 'contacts') {
        seo = pageSEO.contacts
      } else if (routeName === 'product' && route.params.slug) {
        // Product page will be handled separately when data loads
        return
      }

      if (Object.keys(seo).length > 0) {
        updateMetaTags(seo)
      }
    },
    { immediate: true }
  )

  return {
    updateMetaTags,
    updateProductSchema
  }
}
