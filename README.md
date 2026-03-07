# Chroot

A fictional e-commerce UI built around a terminal interface. Users interact with the shop using familiar git commands to browse, stage, and commit items to their basket. Initially, the project was hosted on GitHub Pages but has since migrated to **Vercel** for better iframe support.

## 🔗 Link

[chroot](https://chroot-web.vercel.app/)


## 🌐 Website structure

```
chroot
 └── Landing Page
      ├── Terminal
      |    ├── Beans Page
      |    ├── Equipment Page
      |    └── Basket Page
      |
      └── Social Media Navbar
          └── GitHub
```

## ✨ Features

- **Terminal Input** — Git-style terminal for adding and removing items.
- **Responsive Basket UI** — Dynamic cart rendering with item quantities.
- **Local Storage** — Live basket updates across pages via localStorage.
- **Webpages as iframes** — Webpages load on the same page without the need to leave the landing page.

## Project Structure

```
chroot/V2
│
├── Images             # Folder for the images used on the site
├── favicon.ico        # Web icon
├── index.html         # The landing page and terminal interface
├── beans.html         # Coffee Beans selection
├── equipment.html     # Equipment selection
├── basket.html        # Shopping basket view
├── style.css          # Encompasses the styling for website
├── terminal.js        # Encompasses the terminal interface for the landing page
├── assets.js          # Encompasses the pages, item selection, and suggestion buttons
├── basket.js          # Encompasses tbasket.html responsive design elements
├── LICENSE            # MIT License
└── README.md          # This page
```

## ⛏️ Tech Stack

- **HTML**: Provides basic structure and layout of the website.
- **CSS**: Used for styling the website.
- **JavaScript**: Used to create a functional terminal with git-style commands and infrastructure to tracks items in the basket. localStorage acts as the communication bridge between the terminal page and the basket, with a setInterval polling for changes and dynamically rendering cart items into the DOM via innerHTML and appendChild. Event delegation handles clicks on dynamically created elements.

## 📄 License

This project is licensed under the **MIT License**.
