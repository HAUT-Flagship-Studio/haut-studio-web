import type { Metadata } from 'next'
import { Kanit, Roboto } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { QuizProvider } from '@/components/QuizProvider'
import { PPF_PACKAGES, CERAMIC_PACKAGE, WINDOW_TINT_PACKAGES, STUDIO } from '@/lib/data'

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
    "HAUT Flagship Studio in Hackensack, NJ delivers premium paint protection film, ceramic coatings, and window tinting for Bergen County and Northern NJ's exotic and luxury vehicle owners. Self-healing optical TPU, 10-year manufacturer warranty, installed by certified master installers in a climate-controlled studio.",
  keywords:
    'PPF Hackensack NJ, paint protection film New Jersey, ceramic coating Hackensack, window tinting NJ, self-healing film, certified master installer Bergen County, HAUT Flagship Studio',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hautppfstudio.com',
    siteName: 'HAUT Flagship Studio',
    title: 'HAUT Flagship Studio — PPF, Ceramic Coatings & Window Tinting | Hackensack, NJ',
    description:
      "Premium paint protection film, ceramic coatings, and window tinting in Hackensack, NJ. Self-healing optical TPU and 10-year manufacturer warranty, installed by Bergen County's certified master installers.",
    images: [
      {
        url: 'https://placehold.co/1200x630/1A292E/9FFE0A.webp?text=HAUT+Flagship+Studio',
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
      'Premium paint protection film, ceramic coatings, and window tinting installed by certified master installers in Hackensack, NJ.',
    images: ['https://placehold.co/1200x630/1A292E/9FFE0A.webp?text=HAUT+Flagship+Studio'],
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
  image: 'https://placehold.co/800x600/1A292E/9FFE0A.webp?text=HAUT+Flagship+Studio',
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
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does Paint Protection Film last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'High-quality PPF with a self-healing topcoat typically lasts 8–12 years when properly maintained. HAUT installs precision-cut film that covers every exposed panel edge.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does PPF eliminate the need for waxing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The hydrophobic topcoat on modern PPF repels water, dirt, and road grime — making traditional wax completely unnecessary. A simple rinse restores gloss.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between PPF and ceramic coating?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PPF is a physical urethane film that absorbs rock chips and road debris while self-healing minor scratches. Ceramic coating is a nano-chemical sealant applied on top of clear coat or PPF that adds hydrophobic gloss and UV protection. Both can be combined for maximum coverage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is HAUT Flagship Studio located?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HAUT Flagship Studio is located at 361 NJ-17, Hackensack, NJ 07601. We serve the greater Bergen County area and offer free enclosed trailer transport for Full Vehicle PPF packages.',
      },
    },
  ],
}

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '1019441793680027'

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
        <QuizProvider>
          <Header />
          {children}
          <Footer />
        </QuizProvider>

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
