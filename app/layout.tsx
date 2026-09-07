import type { Metadata } from 'next'
import { Kanit, Roboto } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { QuizProvider } from '@/components/QuizProvider'
import {
  PPF_PACKAGES,
  CERAMIC_PACKAGE,
  WINDOW_TINT_PACKAGES,
  FAQ_ITEMS,
  STUDIO,
  CLIENT_REVIEWS,
} from '@/lib/data'

const kanit = Kanit({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-kanit',
  display: 'swap',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HAUT Flagship Studio — PPF, Ceramic Coatings & Window Tinting | Hackensack, NJ',
  description:
    "HAUT Flagship Studio in Hackensack, NJ installs paint protection film, ceramic coatings, and window tinting for Bergen County and Northern NJ's exotic and luxury vehicle owners. Self-healing optical film, 10-year nationwide manufacturer warranty, installed by certified master installers in a climate-controlled studio.",
  keywords:
    'PPF Hackensack NJ, paint protection film New Jersey, ceramic coating Hackensack, window tinting NJ, self-healing film, certified master installer Bergen County, HAUT Flagship Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hautppfstudio.com',
    siteName: 'HAUT Flagship Studio',
    title: 'HAUT Flagship Studio — PPF, Ceramic Coatings & Window Tinting | Hackensack, NJ',
    description:
      "Self-healing optical paint protection film, ceramic coatings, and window tinting in Hackensack, NJ, backed by a 10-year nationwide manufacturer warranty and installed by Bergen County's certified master installers.",
    images: [
      {
        url: 'https://hautppfstudio.com/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HAUT Flagship Studio Hackensack NJ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HAUT Flagship Studio — PPF & Ceramic Coatings Hackensack NJ',
    description:
      'Self-healing PPF, ceramic coatings, and window tinting installed by certified master installers in Hackensack, NJ.',
    images: ['https://hautppfstudio.com/assets/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: 'https://hautppfstudio.com',
  },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['AutomotiveBusiness', 'LocalBusiness'],
  name: 'HAUT Flagship Studio',
  image: 'https://hautppfstudio.com/assets/og-image.jpg',
  url: 'https://hautppfstudio.com',
  telephone: '+1-201-201-0170',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '361 NJ-17',
    addressLocality: 'Hackensack',
    addressRegion: 'NJ',
    postalCode: '07601',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: STUDIO.lat,
    longitude: STUDIO.lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '16:00',
    },
  ],
  priceRange: '$$$$',
  // Rating and reviews cover only the client reviews published on this site, so the
  // count stays verifiable against what a crawler can actually read on /reviews.
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: (
      CLIENT_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / CLIENT_REVIEWS.length
    ).toFixed(1),
    reviewCount: CLIENT_REVIEWS.length,
    bestRating: 5,
    worstRating: 1,
  },
  review: CLIENT_REVIEWS.map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    datePublished: r.datePublished,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: r.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: r.text,
    itemReviewed: { '@type': 'AutomotiveBusiness', name: 'HAUT Flagship Studio' },
  })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'PPF, Ceramic Coating & Window Tinting Packages',
    itemListElement: [...PPF_PACKAGES, CERAMIC_PACKAGE, ...WINDOW_TINT_PACKAGES].map((pkg) => ({
      '@type': 'Offer',
      name: pkg.name,
      description: pkg.tagline,
      price: String(pkg.price),
      priceCurrency: 'USD',
    })),
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1019441793680027'
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-GSC600LZS3'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${kanit.variable} ${roboto.variable}`}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="font-roboto antialiased">
        {/* Pages here run past 10,000px, and the nav ahead of them is the same
            on every one — a keyboard user should not have to tab through it
            twice. Hidden until focused. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:bg-[#9FFE0A] focus:text-[#1A292E] focus:px-5 focus:py-3 focus:font-kanit focus:font-semibold focus:tracking-wider"
        >
          Skip to content
        </a>
        <QuizProvider>
          <Header />
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <Footer />
        </QuizProvider>

        {/* Google Analytics (GA4) */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  )
}
