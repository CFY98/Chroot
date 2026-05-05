# Chroot

A concept e-commerce UI built around a terminal interface. Alongside the conventional point-and-click, users can interact with the shop using familiar git commands to browse, stage, and commit items to their basket.

Iterated on user feedback from external testers to introduce new features for V3.

## ✨ Features

- **Responsive Basket UI** — Dynamic cart rendering with real-time quantity management and state synchronisation across components.
- **Accessibility** — ARIA live regions with custom announcements to ensure full screen reader compatibility.
- **Persistence** — localStorage for live basket state across pages, with local state object for pre-basket quantity adjustment.
- **SPA Routing** — Fetch-based content rendering for seamless navigation across UI modes.
- **Client-side PDF Generation** — On-demand receipt generation via deferred module import of html2pdf, with print-state cleanup via try/finally.

## 💻 Visual Mode Features

The UI features dual modes which users can select depending on their preferences. Visual mode offers the more traditional e-commerce UI experience. 

- **Toast Notifications** — Non-blocking user feedback for basket interactions.
- **State Memory** — In-memory state object for adjusting item quantities before adding to basket.

## ⌨️ Terminal Mode Features

Users can switch to Terminal mode if they prefer working in a terminal.

- **Git-inspired Commands** — Git-style commands (add, reset, status, commit, log) for basket interaction.
- **Keyboard Navigation** — History indexes accessible via arrow-keys for fast lookup.
- **Autocomplete** — Tab completion for commands and arguments based on the current input.

## 🔗 Link

[chroot](https://chroot-web.vercel.app/)

## 📸 Screenshots (Tablet View)

![Landing Page](./public/screenshots/V3_GUI_Landing_Page.png)
![Basket UI](./public/screenshots/V3_basket_page.png)
![Terminal User Interface Example](./public/screenshots/V3_tui_mode.png)
![PDF Result](./public/screenshots/V3_saved_receipt.png)

## Project Structure

```
Chroot/
|   .gitignore
|   index.html
|   LICENSE
|   package-lock.json
|   package.json
|   README.md
|   vercel.json
|
├───public/ — static assets served directly (images, favicon, pages)
|   ├───pages/ — HTML pages organised by category
│   |    ├───coffee/
│   |    ├───gear/
│   |    ├───tabs/
│   |    └───ui/
│   |
│   ├───favicon.ico
|   ├───Images/
|   └───screenshots
│
└───src/
    ├───css/  — stylesheets for each page/component
    ├───git/ — git commands logic for terminal
    ├───purchase/ — basket, buy, and receipt logic
    ├───terminal/ — terminal emulator and commands
    └───tools/ — shared utilities, router, and state
```

## Installation

Prerequisites:

- npm

1. Clone the repository

```
git clone https://github.com/CFY98/Chroot.git
```

2. Enter repository

```
cd Chroot
```

3. Install dependencies

```
npm install
```

4. Start development server

```
npm run dev
```

5. Build for production
```
npm run build
```

## 📌 Future Developments

- **PostgreSQL**: Database to store products and orders.
- **Wishlist**: Implement git-style command, Git stash, alongside a button for Visual mode to save products, backed by database storage.
- **Backend Cart System**: Save carts per user, update quantities and persist data. 
- **Backend API**: Django to handle requests from the UI and interact with the PostgreSQL database.

## ⛏️ Tech Stack

- **HTML**: Provides basic structure and layout of the website.
- **CSS**: Used for styling the website.
- **JavaScript**: Functional terminal with Git-style commands, localStorage as a cross-page communication bridge, and dynamic DOM rendering with event delegation.
- **ARIA**: Live regions, semantic roles and labels for screen reader support.
- **Vite**: Development server and bundler.
- **Vercel**: Hosts the site with a custom rewrite rule for SPA routing

## 📄 License

This project is licensed under **Apache 2.0**.
