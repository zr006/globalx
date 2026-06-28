Updated README: added instructions for new pages and contact form handling.

What's new:
- contact.html: Contact form ready for Netlify or Formspree (static form handling). Update email and the thank-you target as needed.
- events.html: Events list and courts map (replace Google Maps embed with real embed URL).
- members/login.html & members/register.html: Simple skeleton pages for member auth. These are placeholders — integrate OAuth or your backend to make them functional.

Netlify / Formspree notes for contact form:
- Netlify: Enable Netlify Forms in your site settings; the form in contact.html uses the data-netlify attribute.
- Formspree: Change the form action to "https://formspree.io/f/{your-id}" and method="POST" and remove data-netlify attributes.

Deploy reminder:
- To publish via GitHub Pages, enable Pages in the repository settings (branch: main, folder: /). See original README for step-by-step.
