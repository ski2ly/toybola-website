import { useHead } from '@vueuse/head'

export function useSeoMeta({ title, description, keywords, ogImage, canonical }) {
  const siteName = 'Toybola - Крупнейший производитель игрушек'
  const defaultDescription = 'Игрушки от производителя в Узбекистане. Опт и дистрибьюция. Качество ISO. Доставка по СНГ.'
  const defaultKeywords = 'игрушки, игрушки опт, производитель игрушек, Узбекистан, Toybola, оптовая продажа игрушек'
  
  useHead({
    title: title ? `${title} | ${siteName}` : siteName,
    meta: [
      {
        name: 'description',
        content: description || defaultDescription
      },
      {
        name: 'keywords',
        content: keywords || defaultKeywords
      },
      {
        property: 'og:title',
        content: title ? `${title} | ${siteName}` : siteName
      },
      {
        property: 'og:description',
        content: description || defaultDescription
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:site_name',
        content: siteName
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: title ? `${title} | ${siteName}` : siteName
      },
      {
        name: 'twitter:description',
        content: description || defaultDescription
      }
    ],
    link: canonical ? [
      {
        rel: 'canonical',
        href: canonical
      }
    ] : []
  })
}

export function useProductSeo(product) {
  if (!product) return
  
  const title = product.nameRu
  const description = product.descriptionRu || `Купить ${product.nameRu} оптом от производителя. Артикул: ${product.sku}`
  const keywords = `${product.nameRu}, ${product.sku}, игрушки опт, купить игрушки`
  const ogImage = product.images?.[0]?.imageUrl || '/images/og-placeholder.jpg'
  const canonical = `https://toybola.uz/product/${product.slug}`
  
  useHead({
    title: `${title} | Toybola`,
    meta: [
      {
        name: 'description',
        content: description
      },
      {
        name: 'keywords',
        content: keywords
      },
      {
        property: 'og:title',
        content: title
      },
      {
        property: 'og:description',
        content: description
      },
      {
        property: 'og:image',
        content: ogImage
      },
      {
        property: 'og:type',
        content: 'product'
      },
      {
        property: 'product:price:amount',
        content: product.priceMinUsd?.toString() || ''
      },
      {
        property: 'product:price:currency',
        content: 'USD'
      },
      {
        property: 'product:availability',
        content: product.availability === 'in_stock' ? 'instock' : 'oos'
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: title
      },
      {
        name: 'twitter:description',
        content: description
      },
      {
        name: 'twitter:image',
        content: ogImage
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: canonical
      }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.nameRu,
          description: product.descriptionRu,
          image: ogImage,
          sku: product.sku,
          brand: {
            '@type': 'Brand',
            name: 'Toybola'
          },
          offers: {
            '@type': 'Offer',
            price: product.priceMinUsd || 0,
            priceCurrency: 'USD',
            availability: product.availability === 'in_stock' 
              ? 'https://schema.org/InStock' 
              : 'https://schema.org/OutOfStock',
            seller: {
              '@type': 'Organization',
              name: 'Toybola'
            }
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '124'
          }
        })
      }
    ]
  })
}

export function useHomeSeo() {
  useHead({
    title: 'Toybola - Игрушки от производителя оптом в Узбекистане',
    meta: [
      {
        name: 'description',
        content: 'Крупнейший производитель игрушек в Центральной Азии. Опт и дистрибьюция. 15+ лет на рынке. 71M+ игрушек произведено. Доставка по СНГ. ISO качество.'
      },
      {
        name: 'keywords',
        content: 'игрушки, игрушки опт, производитель игрушек, Узбекистан, Toybola, оптовая продажа, детские игрушки, купить игрушки оптом'
      },
      {
        property: 'og:title',
        content: 'Toybola - Игрушки от производителя оптом'
      },
      {
        property: 'og:description',
        content: 'Крупнейший производитель игрушек в Центральной Азии. 15+ лет опыта, 71M+ произведённых игрушек.'
      },
      {
        property: 'og:image',
        content: '/images/og-home.jpg'
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Toybola',
          url: 'https://toybola.uz',
          logo: 'https://toybola.uz/images/logo.png',
          description: 'Крупнейший производитель игрушек в Центральной Азии',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'UZ',
            addressLocality: 'Tashkent'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+998-XX-XXX-XX-XX',
            contactType: 'sales',
            availableLanguage: ['Russian', 'Uzbek', 'English']
          },
          sameAs: [
            'https://www.instagram.com/toybolatoys/',
            'https://www.youtube.com/channel/UCQBSmktBQ80WERmZF1JCngA',
            'https://www.tiktok.com/@toybolatoys',
            'https://t.me/toybolatoys',
            'https://www.facebook.com/toybolatoys'
          ]
        })
      }
    ]
  })
}
