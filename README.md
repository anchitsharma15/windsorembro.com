# WindsorEmbro

Static website for windsorembro.com. The site uses an Apple-inspired theme, a custom woven-W logo, real Windsor Embro Instagram photography and a direct Amazon shopping link.

## Content

- Eight Instagram project stories, with filters and direct links to their original posts/reels.
- Actual studio process, pet portrait, name, apparel, headwear, baby gift, bag and pouch imagery.
- Personalised crewneck shopping section linking to the owner-supplied Amazon product. Prices and delivery remain on Amazon.
- Custom-project brief planner with copy/download and an Instagram conversation link. Nothing is sent automatically.

Instagram source: https://www.instagram.com/windsor.embro/
Amazon destination: https://a.co/d/03yc8qak
Photo provenance is recorded in `images/credits.json`. Instagram thumbnails are stored locally to avoid expiring CDN links. Future profile posts are not imported automatically.

No build step. `index.html`, `style.css` and `script.js` are served directly. CNAME preserves the existing domain. Browser testing is skipped at the owner's request.
