# Mathe-Stadt 100

**Mathe-Stadt 100** is a small browser-based math game for primary school children.  
The project is designed as a simple static web app that can be published with GitHub Pages.

## Goal

The goal of the game is to help children practise basic arithmetic in a playful way.

The game can be used by:

- children
- parents
- teachers
- tutors

## Project Structure

```text
mathe-stadt-100/
├── index.html
├── style.css
├── script.js
└── assets/
```

Depending on the current version, the project may contain additional image, sound, or data files.

## How to Run Locally

Open the project folder and start the game by opening:

```text
index.html
```

in a web browser.

No installation is required.

## How to Publish with GitHub Pages

1. Upload all project files to this GitHub repository.
2. Go to:

```text
Settings → Pages
```

3. Select:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

4. Save the settings.

After deployment, the game will be available at:

```text
https://info309-sys.github.io/mathe-stadt-100/
```

## Important Notes

The main file must be named:

```text
index.html
```

Otherwise GitHub Pages may not open the game correctly.

All file paths inside the project should be relative, for example:

```html
<link rel="stylesheet" href="style.css">
<script src="script.js" defer></script>
```

Avoid local computer paths such as:

```text
C:\Users\...
```

## Status

MVP / early prototype.

## License

No license has been added yet.
