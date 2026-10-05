# SEO next steps

## 1. Deploy
Ship the current branch. The GitHub READMEs already link to the case-study pages, and those links start working once this deploy is live.

## 2. Search Console (https://search.google.com/search-console)
- [ ] Use a **Domain** property for `chiragdalmia.com`, which also covers www and the subdomains.
- [ ] **Sitemaps:** submit `https://www.chiragdalmia.com/sitemap.xml` and confirm it shows 14 discovered URLs.
- [ ] **URL Inspection → Request indexing:** request `/`, `/projects` and `/projects/hackcanada`. This also refreshes the stale "Academy Petroleum" snippet.
- [ ] **Pages report:** check the two old URLs. `/projects/hackcanada` should be indexed, and `/projects/a-fast-anonymous-photo-sharing-platform-using-peer` should move to "Page with redirect".
- [ ] **Enhancements:** after a few days, confirm Breadcrumbs and Profile page show no errors.

## 3. Validate structured data
- [ ] Run https://search.google.com/test/rich-results on `https://www.chiragdalmia.com/` and one case study, e.g. `/projects/fleetview`.

## 4. Measure (Performance → Search results, 28-day windows, compare with before the deploy)
- **Name searches:** Query filter "contains `dalmia`". Watch impressions, clicks and average position.
- **Case studies:** Page filter "contains `/projects/`". Watch which case studies get impressions and for which queries.
- **Broad terms:** Query filter "contains `portfolio`". This shows whether the broad terms produce any impressions at all.

## 5. Small leftovers
- [ ] **Share image:** `app/opengraph-image.jpg` still says "Full Stack Developer". Re-export it with "Frontend Developer" and keep the same filename and 1200×630 size.
- [ ] **Keep case-study dates honest:** when you edit a case study in `lib/config.ts`, bump its `updated` date. The sitemap and the page both use it.
- [ ] **Optional:** FleetView's page title is the Vite default ("frontend"), and AnatomyAR's title is empty. Fix them in those repos.
- [ ] **Optional links:** the HackCanada site (organiser credit), and teammates' portfolios linking to your shared projects.
