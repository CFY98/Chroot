# Chroot

<<<<<<< HEAD
A fictional coffee shop. This website was developed with three pages,
=======

A fictional e-commerce UI built around a terminal interface. Users interact with the shop using familiar git commands to browse, stage, and commit items to their basket.

## 🔗 Link

[chroot](https://chroot-web.vercel.app/)
<<<<<<< HEAD

> > > > > > > # 16e1394 (new url)
> > > > > > >
> > > > > > > 99ba19d (Updated 07/03/2026)

## 🌐 Website structure

```
chroot
 └── Landing Page
      ├── Navbar
<<<<<<< HEAD
          ├── Drinks Page
          └── Pastries Page
      ├── Social Media Navbar
=======
      |    ├── Drinks Page
      |    └── Pastries Page
      |
      └── Social Media Navbar
>>>>>>> b4eb511 (Fix indentation in README for Social Media Navbar)
          ├── Facebook
          ├── Twitter/X
          ├── Instagram
          └── LinkedIn
```

## ✨ Features

<<<<<<< HEAD

- **Multi-page navigation** — a nav bar linking to dedicated Drinks and Pastries pages, keeping content cleanly separated
- **Image carousel/slider** — a rotating hero section showcasing the café's interior, coffee beans, and latte art with previous/next controls
- **Terminal-inspired branding** — A Hidden Easter-Egg which leans into a developer aesthetic.
- **Responsive hero images with text overlays** — full-width lifestyle photography with descriptive captions baked into the images
- **Social media links** — footer links to Facebook, Twitter/X, Instagram, and LinkedIn
- **Thematic copywriting** — the tagline "It's time to change the root of your trajectory with coffee" ties the tech theme into the brand voice

## 🔗 Link

[chroot](https://cfy98.github.io/CodeNation-Chroot-Coffee-Shop/)

# Project Structure

=======

- **Terminal Input** — Git-style terminal for adding and removing items.
- **Responsive Basket UI** — Dynamic cart rendering with item quantities.
- **Local Storage** — Live basket updates across pages via localStorage.
- **Webpages as iframes** — Webpages load on the same page without the need to leave the landing page.
- **PDF Generation** — Client-side PDF generation via the brower's native window.print() API.

## Project Structure

> > > > > > > 16e1394 (new url)

```
chroot/
│
├── Fonts              # Folder for the fonts used on the site
├── Images             # Folder for the images used on the site
├── favicon.ico        # Web icon
<<<<<<< HEAD
├── index.html         # The landing page
├── drinks.html        # The drinks page
├── pastries.html      # The pastries page
├── style.css          # Encompasses the styling
├── slideshow.js       # Encompasses the carousel for landing page
├── LICENSE
└── README.md
=======
├── index.html         # The landing page and terminal interface
├── beans.html         # Coffee Beans selection
├── equipment.html     # Equipment selection
├── basket.html        # Shopping basket view
├── receipt.html       # Invoice with the option to print
├── style.css          # Encompasses the styling for website
├── terminal.js        # Encompasses the terminal interface for the landing page
├── assets.js          # Encompasses the pages, item selection, and suggestion buttons
├── basket.js          # Encompasses the responsive design elements for the basket page
├── receipt.js         # Encompasses the buttons and receipt generation for the receipt page
├── LICENSE            # MIT License
└── README.md          # This page
>>>>>>> 99ba19d (Updated 07/03/2026)
```

<<<<<<< HEAD

## ⛏️ Built With

**HTML**: Provides basic structure and layout of the website.
**CSS**: Used for styling the website and hiding easter eggs.
**JavaScript**: Used to create an automatic slideshow with navigation buttons.

## 📄 License

# This project is licensed under the MIT License.

## ⛏️ Tech Stack

- **HTML**: Provides basic structure and layout of the website.
- **CSS**: Used for styling the website.
- **JavaScript**: Used to create a functional terminal with git-style commands and infrastructure to tracks items in the basket. localStorage acts as the communication bridge between the terminal page and the basket, with a setInterval polling for changes and dynamically rendering cart items into the DOM via innerHTML and appendChild. Event delegation handles clicks on dynamically created elements.

## 📄 License

This project is licensed under the **MIT License**.

> > > > > > > 16e1394 (new url)
