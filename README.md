# Januprasad K — Portfolio

A complete static portfolio customized from your supplied template.

## Open locally
Extract this ZIP and open index.html in a browser. No build step is required.
For a local web server, run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

## Host the website
Upload index.html, css/, js/, images/ and the PDF to any static web host.

## Edit the content
- index.html: profile, featured work, experience, skills and contact information.
- css/custom.css: custom appearance and responsive layout.
- css/f474e1448b42ed88.css: original template styles.
- js/portfolio.js: navigation, card flip, skill filters, skill dialog and contact form.
- images/januprasad-avatar.png: generated full-body avatar with transparency.
- images/januprasad-profile.jpg: supplied portrait.

Toyota Connected India is the first featured project and experience entry. Its responsibilities include car connectivity, vehicle onboarding, dashboard management and UI/UX improvements.

The contact form opens a draft in the visitor's email app; it does not send mail automatically. The downloaded resume is an earlier version, labeled accordingly. Exact employment dates and the current formal job title still need confirmation.

## Industry backgrounds
Project cards use illustrative industry imagery at opacity: 0.10 (90% transparent), behind fully opaque original text. Six panels in images/industry-backgrounds.png are mapped using data-industry attributes and CSS background positions. These are illustrations, not actual product screenshots.

## Scroll counters
Achievement percentages count from zero when each becomes visible, once per page load. Durations differ (1.8, 2.6, 1.4 and 2.2 seconds); reduced-motion preference displays final values without animation. Edit dist/js/counters.js (or js/counters.js in the ZIP).

## Elastic ID badge
Hold and pull the card with mouse or touch; its lanyard stretches and the badge springs back when released. Click or press Enter/Space to flip. Reduced-motion preference snaps it back without bounce. Implementation: js/badge.js.

## Toolkit phone
Toolkit icons open an app screen within the illustrated phone, with Back/Home controls and keyboard Escape support. The phone clock follows the visitor device local time and refreshes each minute and when the tab regains focus. Implementation: js/toolkit-phone.js.
