import "./photoswiper-thumbs-plugin.css";

/**
 * PhotoSwipe thumbnails plugin
 *
 * By https://github.com/megaarmos
 */

class ThumbsOverflowManager {
  constructor(containerGetter, wrapperGetter) {
    this.containerGetter = containerGetter;
    this.wrapperGetter = wrapperGetter;
    this.resizeObserver = null;
    this.boundCheck = this.checkOverflow.bind(this);
  }

  start() {
    this.stop();
    const container = this.containerGetter();
    const wrapper = this.wrapperGetter();
    if (!container || !wrapper) return;

    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(this.boundCheck);
      this.resizeObserver.observe(container);
      this.resizeObserver.observe(wrapper);
    }

    window.addEventListener("resize", this.boundCheck, { passive: true });
    setTimeout(this.boundCheck, 0);
  }

  checkOverflow() {
    const container = this.containerGetter();
    const wrapper = this.wrapperGetter();
    if (!container || !wrapper) return;

    const containerWidth = container.clientWidth || 0;
    const contentWidth = wrapper.scrollWidth || 0;
    wrapper.style.justifyContent = contentWidth > containerWidth ? "start" : "";
  }

  stop() {
    if (this.resizeObserver) {
      try {
        this.resizeObserver.disconnect();
      } catch {}
      this.resizeObserver = null;
    }
    window.removeEventListener("resize", this.boundCheck);
  }
}

class PhotoSwipeThumbs {
  constructor(lightbox, options = {}) {
    this.options = { ...options };
    this.lightbox = lightbox;
    this.thumbsContainer = null;
    this.thumbsWrapper = null;
    this.boundUpdateCurrentThumb = this.updateCurrentThumb.bind(this);
    this.overflowManager = new ThumbsOverflowManager(
      () => this.thumbsContainer,
      () => this.thumbsWrapper
    );

    this.lightbox.on("init", () => {
      this.initPlugin(this.lightbox.pswp);
    });
  }

  initPlugin(pswpInstance) {
    const gallery = this.lightbox.options.gallery;

    if (!gallery) {
      console.warn("PhotoSwipeThumbs: No gallery found in lightbox options");
      return;
    }

    pswpInstance.on("initialLayout", () => {
      const pswpElement = pswpInstance.element;
      if (!pswpElement) {
        console.warn("PhotoSwipeThumbs: PhotoSwipe container not found");
        return;
      }

      this.thumbsContainer = document.createElement("div");
      this.thumbsContainer.classList.add("pswp__thumbs");

      this.thumbsWrapper = document.createElement("div");
      this.thumbsWrapper.classList.add("pswp__thumbs-wrapper");
      this.thumbsContainer.appendChild(this.thumbsWrapper);

      pswpElement.appendChild(this.thumbsContainer);

      const images = gallery.querySelectorAll("a");
      images.forEach((image, index) => {
        const thumbSrc = image.getAttribute("data-pswp-thumb") || image.href;

        if (thumbSrc) {
          const thumbButton = document.createElement("button");
          const thumbImage = document.createElement("img");

          thumbImage.src = thumbSrc;
          thumbButton.classList.add("pswp__thumb");
          thumbImage.classList.add("pswp__thumb-img");
          thumbImage.dataset.index = index;
          thumbButton.appendChild(thumbImage);

          thumbButton.addEventListener("click", () => {
            pswpInstance.goTo(index);
          });

          this.thumbsWrapper.appendChild(thumbButton);
        }
      });

      const currentIndex = pswpInstance.currIndex || 0;
      this.updateCurrentThumb(currentIndex);

      this.overflowManager.start();
    });

    this.lightbox.on("contentActivate", ({ content }) => {
      this.updateCurrentThumb(content.index);
    });
  }

  updateCurrentThumb(index) {
    if (!this.thumbsContainer) return;

    const thumbs = this.thumbsContainer.querySelectorAll(".pswp__thumb");
    thumbs.forEach((thumb, thumbIndex) => {
      const isActive = thumbIndex === index;

      thumb.classList.toggle("pswp__thumb--active", isActive);

      if (isActive) {
        thumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }
    });
  }

  destroy() {
    if (this.thumbsContainer) {
      const thumbs = this.thumbsContainer.querySelectorAll(".pswp__thumb");
      thumbs.forEach((thumb) => {
        thumb.removeEventListener("click", this.boundUpdateCurrentThumb);
      });
      this.thumbsContainer.remove();
      this.thumbsContainer = null;
    }

    if (this.overflowManager) {
      this.overflowManager.stop();
    }
  }
}

export default PhotoSwipeThumbs;
