(function initNeneAds() {
  function getConfig() {
    return window.NENE_ADS || {};
  }

  function isConfigured(value) {
    return Boolean(String(value || "").trim());
  }

  function clearSlot(slot) {
    if (!slot) return;
    slot.innerHTML = "";
    slot.classList.remove("ad-slot-loaded", "ad-slot-leaderboard", "ad-slot-banner");
    slot.style.removeProperty("--ad-aspect-ratio");
  }

  function getA8Banners(config) {
    const a8 = config.a8 || {};
    if (Array.isArray(a8.banners) && a8.banners.length > 0) {
      return a8.banners.filter((banner) => {
        if (!isConfigured(banner.linkUrl)) return false;
        return isConfigured(banner.imageUrl)
          || banner.type === "text"
          || isConfigured(banner.alt)
          || isConfigured(banner.text);
      });
    }
    if (isConfigured(a8.linkUrl) && isConfigured(a8.imageUrl)) {
      return [{
        linkUrl: a8.linkUrl,
        imageUrl: a8.imageUrl,
        width: Number(a8.width) || 728,
        height: Number(a8.height) || 90,
        alt: a8.alt || "スポンサー広告",
      }];
    }
    return [];
  }

  function isTextBanner(banner) {
    return banner.type === "text" || (
      !isConfigured(banner.imageUrl)
      && (isConfigured(banner.alt) || isConfigured(banner.text))
    );
  }

  function shuffle(items) {
    const list = [...items];
    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  function loadScriptOnce(id, src, attrs = {}) {
    if (document.getElementById(id)) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.async = true;
      Object.entries(attrs).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`script load failed: ${src}`));
      document.head.appendChild(script);
    });
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function renderFallback(slot, config) {
    const fallback = config.fallback || {};
    const link = document.createElement("a");
    link.className = "ad-fallback";
    link.href = fallback.linkUrl || "#settings";
    link.target = "_blank";
    link.rel = "noopener sponsored";
    link.innerHTML = `
      <strong>${fallback.title || "NENE Studio"}</strong>
      <span>${fallback.message || "480円/月から広告なし"}</span>
    `;
    slot.appendChild(link);
    slot.classList.add("ad-slot-loaded");
    return true;
  }

  function renderA8TextLink(slot, banner) {
    if (!isConfigured(banner.linkUrl)) return false;

    const link = document.createElement("a");
    link.className = "ad-affiliate ad-affiliate-text";
    link.href = banner.linkUrl;
    link.target = "_blank";
    link.rel = "noopener sponsored";
    link.textContent = banner.alt || banner.text || "スポンサー広告を見る";
    slot.appendChild(link);
    slot.classList.add("ad-slot-loaded");
    trackA8Impression(banner);
    return true;
  }

  function trackA8Impression(banner) {
    const pixelUrl = String(banner.pixelUrl || "").trim();
    const match = String(banner.linkUrl || "").match(/a8mat=([^&]+)/);
    const src = pixelUrl || (match ? `https://www18.a8.net/0.gif?a8mat=${match[1]}` : "");
    if (!src) return;
    const pixel = document.createElement("img");
    pixel.src = src;
    pixel.alt = "";
    pixel.width = 1;
    pixel.height = 1;
    pixel.hidden = true;
    document.body.appendChild(pixel);
  }

  function applyBannerLayout(slot, banner) {
    const width = Number(banner.width) || 728;
    const height = Number(banner.height) || 90;
    slot.style.setProperty("--ad-aspect-ratio", `${width} / ${height}`);
    slot.classList.add(height <= 60 ? "ad-slot-banner" : "ad-slot-leaderboard");
  }

  async function renderA8Banner(slot, banner) {
    if (!isConfigured(banner.linkUrl) || !isConfigured(banner.imageUrl)) return false;

    applyBannerLayout(slot, banner);

    const link = document.createElement("a");
    link.className = "ad-affiliate";
    link.href = banner.linkUrl;
    link.target = "_blank";
    link.rel = "noopener sponsored";

    const img = document.createElement("img");
    img.src = banner.imageUrl;
    img.alt = banner.alt || "スポンサー広告";
    img.className = "ad-banner-image";
    img.loading = "eager";
    img.decoding = "async";
    img.referrerPolicy = "strict-origin-when-cross-origin";

    link.appendChild(img);
    slot.appendChild(link);

    const loaded = await new Promise((resolve) => {
      let settled = false;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        resolve(ok);
      };
      img.addEventListener("load", () => finish(img.naturalWidth > 0 && img.naturalHeight > 0));
      img.addEventListener("error", () => finish(false));
      window.setTimeout(() => finish(img.complete && img.naturalWidth > 0), 3000);
    });

    if (!loaded) {
      link.remove();
      slot.classList.remove("ad-slot-leaderboard", "ad-slot-banner");
      slot.style.removeProperty("--ad-aspect-ratio");
      return false;
    }

    trackA8Impression(banner);
    slot.classList.add("ad-slot-loaded");
    return true;
  }

  async function renderA8Entry(slot, banner) {
    if (isTextBanner(banner)) {
      return renderA8TextLink(slot, banner);
    }
    return renderA8Banner(slot, banner);
  }

  async function renderA8(slot, config) {
    const banners = getA8Banners(config);
    if (banners.length === 0) return false;

    for (const banner of shuffle(banners)) {
      clearSlot(slot);
      if (await renderA8Entry(slot, banner)) return true;
    }

    clearSlot(slot);
    return false;
  }

  async function renderMediaNet(slot, config) {
    const media = config.medianet || {};
    if (!isConfigured(media.cid) || !isConfigured(media.tagId)) return false;

    window._mNHandle = window._mNHandle || {};
    window._mNHandle.queue = window._mNHandle.queue || [];
    window.medianet_versionId = window.medianet_versionId || "3121199";

    const target = document.createElement("div");
    target.id = `medianet-${media.tagId}`;
    slot.appendChild(target);

    try {
      await loadScriptOnce(
        "nene-medianet-script",
        `https://contextual.media.net/dmedianet.js?cid=${encodeURIComponent(media.cid)}`,
      );
      await new Promise((resolve) => {
        window._mNHandle.queue.push(() => {
          if (window._mNDetails?.loadTag) {
            window._mNDetails.loadTag(String(media.tagId), media.size || "300x250");
          }
          resolve();
        });
      });
      await wait(1200);
      slot.classList.add("ad-slot-loaded");
      return true;
    } catch {
      return false;
    }
  }

  async function renderAdSense(slot, config) {
    const adsense = config.adsense || {};
    if (!isConfigured(adsense.client) || !isConfigured(adsense.slot)) return false;

    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.style.minHeight = "250px";
    ins.setAttribute("data-ad-client", adsense.client);
    ins.setAttribute("data-ad-slot", adsense.slot);
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    slot.appendChild(ins);

    try {
      await loadScriptOnce(
        "nene-adsense-script",
        `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsense.client)}`,
        { crossorigin: "anonymous" },
      );
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      await wait(2500);
      const status = ins.getAttribute("data-adsbygoogle-status");
      if (status === "filled") {
        slot.classList.add("ad-slot-loaded");
        return true;
      }
      ins.remove();
      return false;
    } catch {
      ins.remove();
      return false;
    }
  }

  async function loadSlot(slot) {
    const config = getConfig();
    clearSlot(slot);
    if (config.enabled === false) {
      renderFallback(slot, config);
      return "fallback";
    }

    if (await renderAdSense(slot, config)) return "adsense";
    clearSlot(slot);
    if (await renderMediaNet(slot, config)) return "medianet";
    clearSlot(slot);
    if (await renderA8(slot, config)) return "a8";
    clearSlot(slot);
    renderFallback(slot, config);
    return "fallback";
  }

  window.NeneAds = {
    loadSlot,
    getWaitSeconds() {
      const seconds = Number(getConfig().waitSeconds);
      return Number.isFinite(seconds) && seconds >= 0 ? seconds : 5;
    },
  };
})();
