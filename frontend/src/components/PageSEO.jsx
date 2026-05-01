import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://trustpulse.ai';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * PageSEO — Drop-in component for per-page SEO.
 *
 * Usage:
 *   <PageSEO
 *     title="Dashboard"
 *     description="Your daily clinical safety digest."
 *     path="/dashboard"
 *   />
 *
 * @param {string}  title        Page-specific title (appended to brand name)
 * @param {string}  description  Meta description for this page
 * @param {string}  path         URL path for canonical & OG URL (e.g. "/dashboard")
 * @param {string}  ogImage      Optional custom OG image URL
 * @param {string}  ogType       Open Graph type, defaults to "website"
 * @param {object}  schema       Optional schema.org JSON-LD object for this page
 */
const PageSEO = ({
  title,
  description = 'TrustPulse AI — Real-time product safety verification powered by clinical intelligence.',
  path = '/',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  schema = null,
}) => {
  const fullTitle = title
    ? `${title} | TrustPulse AI`
    : 'TrustPulse AI — Clinical Precision Engine';

  const canonicalUrl = `${BASE_URL}${path}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Page-level JSON-LD */}
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
    </Helmet>
  );
};

export default PageSEO;
