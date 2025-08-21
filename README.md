# PhotoSwipe Thumbs Plugin

A small plugin that adds a thumbnail navigation bar to [PhotoSwipe v5](https://photoswipe.com/) galleries.

## Quick start

### Install:

```bash
npm install photoswipe-thumbs-plugin
```

```
pnpm install photoswipe-thumbs-plugin
```

```
bun install photoswipe-thumbs-plugin
```

### Usage (basic)

```javascript
import PhotoSwipe from "photoswipe";
import PhotoSwipeThumbs from "photoswipe-thumbs-plugin";
import PhotoSwipeLightbox from "photoswipe/lightbox";

import "photoswipe-thumbs-plugin/style.css";

const lightbox = new PhotoSwipeLightbox({
  gallery: "#gallery",
  childSelector: ".pswp-gallery__item",
  pswpModule: PhotoSwipe,

  // required padding for thumbnails area (PhotoSwipe option)
  padding: { top: 0, bottom: 88, left: 0, right: 0 },
});

// initialize the plugin (attach before lightbox.init)
new PhotoSwipeThumbs(lightbox);

lightbox.init();
```

```html
<div id="gallery" class="pswp-gallery">
  <a
    class="pswp-gallery__item"
    href="primary-image.jpg"
    data-pswp-width="800"
    data-pswp-height="800"
    data-pswp-thumb="primary-image-thumb.jpg"
    target="_blank"
    rel="noreferrer">
    <img src="thumbnail.jpg" alt="Image #1" />
  </a>

  <!-- more items... -->
</div>
```

- `data-pswp-thumb` is optional but strongly recommended: the plugin can use that image as the thumbnail shown in the strip, which improves performance by avoiding reusing full-size images.

## Accessibility

- Thumbnails are clickable elements that navigate to images. Ensure alt text is present on `<img>` elements for screen readers.
- Keep keyboard focus styles visible when overriding CSS so keyboard users can see which thumbnail is focused.

## Customization

The plugin's appearance can be customized by overriding the following CSS variables. You can redefine them in your own stylesheet.

| Variable                       | Default | Description                          |
| ------------------------------ | ------- | ------------------------------------ |
| `--pswp-thumbs-wrapper-height` | `72px`  | The height of the thumbnail bar.     |
| `--pswp-thumbs-wrapper-gap`    | `6px`   | The gap between thumbnails.          |
| `--pswp-thumb-width`           | `56px`  | The width of a standard thumbnail.   |
| `--pswp-thumb-border-radius`   | `6px`   | The border radius of the thumbnails. |
| `--pswp-thumb-active-width`    | `90px`  | The width of the active thumbnail.   |

## Troubleshooting

- Thumbnails not visible? Make sure PhotoSwipe `padding.bottom` is large enough to leave space for the strip (example above uses 88px).
- Thumbnails load for too long? Use `data-pswp-thumb` that points to a properly sized thumbnail image.

## Contributing

- PRs and issues welcome. Keep changes small and include a clear description and reproduction steps for bugs.
