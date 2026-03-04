# Chroot
A fictional e-commerce shopping experience built around a terminal interface. Users interact with the shop using familiar git commands to browse, stage, and commit items to their basket.

## TO-DO
- [x] Make a functional Terminal.
- [x] Embed webpages via iframes.
- [x] Create Equipment Page.
- [x] Design Basket Page.
- [x] Design Coffee Beans Page.
- [ ] Develop Responsive Web Principles for Baskets Page. 

## 🔗 Link
Currently updating to V2

## 🌐 Website structure
```
chroot
 └── Landing Page
      ├── Terminal
      |    ├── Beans Page
      |    ├── Equipment Page
      |    └── Pastries Page
      |
      └── Social Media Navbar
          └── GitHub
```

## ✨ Features
- **Terminal Input** — Git-style terminal for adding and removing items.
- **Responsive Basket UI** — Dynamic cart rendering with item quantities.
- **Local Storage** — Live basket updates across pages via localStorage
- **webpages as iframes** — webpages load on the same page without the need to leave the landing page.
- **Social media links** — Header links to this GitHub page.
- **Thematic copywriting** — Terminal as a metaphor for purchasing coffee ties the tech theme into the brand voice.

## Project Structure
```
chroot/V2
│
├── Images             # Folder for the images used on the site
├── favicon.ico        # Web icon
├── home.html          # The landing page and terminal interface
├── beans.html         # Coffee Beans selection
├── equipment.html     # Equipment selection
├── basket.html        # Shopping basket view
├── styling.css        # Encompasses the styling for website
├── terminal.js        # Encompasses the carousel for landing page
├── LICENSE            # MIT License
└── README.md          # This page
```
## ⛏️ Tech Stack
- **HTML**: Provides basic structure and layout of the website.
- **CSS**: Used for styling the website.
- **JavaScript**: Used to create a functional terminal with git-style commands and infrastructure to tracks items and quantities. localStorage acts as the communication bridge between the terminal page and the basket, with a setInterval polling for changes and dynamically rendering cart items into the DOM via innerHTML and appendChild. Event delegation handles clicks on dynamically created elements.

## 📄 License
This project is licensed under the **MIT License**.
