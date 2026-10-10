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
- js/portfolio.js: navigation, card flip, skill filters, in-phone toolkit screens and contact form.
- images/januprasad-avatar.png: generated full-body avatar with transparency.
- images/januprasad-profile.jpg: supplied portrait.

Toyota Connected India is the first featured project and experience entry. Its responsibilities include car connectivity, vehicle onboarding, dashboard management and UI/UX improvements.

The contact form opens a draft in the visitor's email app; it does not send mail automatically. The downloaded resume is an earlier version, labeled accordingly. Exact employment dates and the current formal job title still need confirmation.

## Company phone mockups
Each project features two angled phone mockups with relevant illustrative app interfaces. These are interface concepts, not actual company product screenshots. The original project descriptions and achievement counters remain. Styling: css/project-mockups.css.

## Scroll counters
Achievement percentages count from zero when each becomes visible, once per page load. Durations differ (1.8, 2.6, 1.4 and 2.2 seconds); reduced-motion preference displays final values without animation. Edit dist/js/counters.js (or js/counters.js in the ZIP).

## Elastic ID badge
Hold and pull the card with mouse or touch; its lanyard stretches and the badge springs back when released. Click or press Enter/Space to flip. Reduced-motion preference snaps it back without bounce. Implementation: js/badge.js.

## Toolkit phone
Toolkit icons open an app screen within the illustrated phone, with Back/Home controls and keyboard Escape support. The phone clock follows the visitor device local time and refreshes each minute and when the tab regains focus. Implementation: js/toolkit-phone.js.

## Responsive project imagery
Phone frames and interfaces maintain fixed proportions across browser widths. The hero monogram is J.K.

## Scroll companion
The hero avatar shrinks into a fixed corner companion after scrolling past it, with rotating speech bubbles about Android and programming. The ellipsis button hides or shows the bubble. Returning to the hero restores the portrait. Mobile uses a smaller companion; reduced-motion disables transitions and message cycling. No audio plays. Styling and behavior: css/avatar-companion.css and js/avatar-companion.js.

## Random avatar outfits
Five looks include the original navy blue shirt, cream polo, suede jacket, ivory knit, and brown blazer. Each reload randomly selects a different outfit from the last successfully displayed one in this browser tab, using session storage. If storage is blocked, selection remains random but may repeat. No outfit selector is displayed. The corner companion shares the selected outfit. Company phone mockups remain illustrative concepts; their visible captions have been removed.
