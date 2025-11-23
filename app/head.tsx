export default function Head() {
  return (
    <>
      <title>NYSC Jos North — Biodata Platform</title>
      <meta name="description" content="Official biodata management platform for NYSC Jos North — register, find resources, and join events." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />

      {/* Favicon & Touch Icon */}
      <link rel="icon" href="/placeholder-logo.png" />
      <link rel="icon" type="image/svg+xml" href="/placeholder-logo.svg" />
      <link rel="apple-touch-icon" href="/placeholder-logo.png" />

      {/* Open Graph */}
      <meta property="og:title" content="NYSC Jos North — Biodata Platform" />
      <meta property="og:description" content="Official biodata management platform for NYSC Jos North — register, find resources, and join events." />
      <meta property="og:image" content="/og-image.svg" />
      <meta property="og:image:type" content="image/svg+xml" />
      <meta property="og:image:alt" content="NYSC Jos North logo and platform preview" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="/og-image.svg" />
      <meta name="twitter:image:alt" content="NYSC Jos North logo and platform preview" />
      {/* WhatsApp and many messengers use Open Graph tags; ensure we also include a plain image link for user agents that prefer PNG/JPEG */}
      <link rel="image_src" href="/og-image.svg" />
      <meta name="twitter:title" content="NYSC Jos North — Biodata Platform" />
      <meta name="twitter:description" content="Official biodata management platform for NYSC Jos North — register, find resources, and join events..." />
    </>
  )
}
