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
    slot.classList.remove("ad-slot-loaded", "ad-slot-leaderboard", "ad-slot-banner", "ad-slot-stack");
    slot.style.removeProperty("--ad-aspect-ratio");
  }

  function getA8Banners(config) {
    const a8 = config.a8 || {};
    if (Array.isArray(a8.banners) && a8.banners.length > 0) {
      return a8.banners.filter((banner) => isConfigured(banner.linkUrl));
    }
    if (isConfigured(a8.linkUrl)) {
      return [{
        linkUrl: a8.linkUrl,
        imageUrl: a8.imageUrl,
        width: Number(a8.width) || 468,
        height: Number(a8.height) || 60,
        alt: a8.alt || "スポンサー",
        text: a8.text || a8.alt || "スポンサーを見る",
      }];
    }
    return [];
  }

  function pickBanners(banners) {
    const list = [...banners];
    for (let i = list.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  function trackA8Impression(banner) {
    const pixelUrl = String(banner.pixelUrl || "").trim();
    const match = String(banner.linkUrl || "").match(/a8mat=([^&]+)/);
    const src = pixelUrl || (match ? `https://www18.a8.net/0.gif?a8mat=${match[1]}` : "");
    if (!src) return;
    const pixel = new Image();
    pixel.width = 1;
    pixel.height = 1;
    pixel.alt = "";
    pixel.decoding = "async";
    pixel.src = src;
  }

  function createAffiliateLink(banner) {
    const link = document.createElement("a");
    link.className = "ad-affiliate";
    link.href = banner.linkUrl;
    link.target = "_blank";
    link.rel = "noopener sponsored noreferrer";
    return link;
  }

  function renderA8TextCard(slot, banner) {
    if (!isConfigured(banner.linkUrl)) return false;
    const link = createAffiliateLink(banner);
    link.className = "ad-affiliate ad-affiliate-text";
    const title = document.createElement("strong");
    title.textContent = banner.alt || "スポンサー";
    const desc = document.createElement("span");
    desc.textContent = banner.text || "詳細を見る";
    link.append(title, desc);
    slot.appendChild(link);
    trackA8Impression(banner);
    return true;
  }

  function loadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      let settled = false;
      const finish = (ok) => {
        if (settled) return;
        settled = true;
        resolve(ok ? img : null);
      };
      // A8 は Referrer 制限があることがあるため、ポリシーは付けない
      img.decoding = "async";
      img.loading = "eager";
      img.alt = "";
      img.onload = () => finish(img.naturalWidth > 1 && img.naturalHeight > 1);
      img.onerror = () => finish(false);
      window.setTimeout(() => finish(img.complete && img.naturalWidth > 1), 5000);
      img.src = src;
    });
  }

  async function renderA8BannerCard(slot, banner) {
    if (!isConfigured(banner.linkUrl)) return false;

    if (isConfigured(banner.imageUrl)) {
      const img = await loadImage(banner.imageUrl);
      if (img) {
        const width = Number(banner.width) || img.naturalWidth || 468;
        const height = Number(banner.height) || img.naturalHeight || 60;
        const wrap = document.createElement("div");
        wrap.className = "ad-banner-wrap";
        wrap.style.setProperty("--ad-aspect-ratio", `${width} / ${height}`);

        const link = createAffiliateLink(banner);
        img.className = "ad-banner-image";
        img.alt = banner.alt || "スポンサー";
        link.appendChild(img);
        wrap.appendChild(link);
        slot.appendChild(wrap);
        trackA8Impression(banner);
        return true;
      }
    }

    return renderA8TextCard(slot, banner);
  }

  async function renderA8(slot, config) {
    const banners = getA8Banners(config);
    if (banners.length === 0) return false;

    // 1件だけ大きく出す（ランダム）。画像失敗時は同じ案件のテキストカードへ。
    const [banner] = pickBanners(banners);
    clearSlot(slot);
    slot.classList.add("ad-slot-banner");
    const ok = await renderA8BannerCard(slot, banner);
    if (ok) {
      slot.classList.add("ad-slot-loaded");
      return true;
    }
    clearSlot(slot);
    return false;
  }

  function renderFallback(slot, config) {
    const fallback = config.fallback || {};
    if (!isConfigured(fallback.title) && !isConfigured(fallback.message)) {
      return false;
    }
    const link = document.createElement("a");
    link.className = "ad-fallback";
    link.href = fallback.linkUrl || "#settings";
    link.target = "_blank";
    link.rel = "noopener sponsored";
    link.innerHTML = `
      <strong>${fallback.title || "NENE Studio"}</strong>
      <span>${fallback.message || ""}</span>
    `;
    slot.appendChild(link);
    slot.classList.add("ad-slot-loaded");
    return true;
  }

  async function loadSlot(slot) {
    const config = getConfig();
    clearSlot(slot);
    if (config.enabled === false) {
      renderFallback(slot, config);
      return "disabled";
    }

    if (await renderA8(slot, config)) return "a8";
    clearSlot(slot);
    if (renderFallback(slot, config)) return "fallback";
    // 最後の手段: 設定済みバナーをテキストで全部出す
    const banners = getA8Banners(config);
    if (banners.length > 0) {
      slot.classList.add("ad-slot-stack", "ad-slot-loaded");
      banners.forEach((banner) => renderA8TextCard(slot, banner));
      return "a8-text";
    }
    return "empty";
  }

  window.NeneAds = {
    loadSlot,
    getWaitSeconds() {
      const seconds = Number(getConfig().waitSeconds);
      return Number.isFinite(seconds) && seconds >= 0 ? seconds : 5;
    },
  };
})();
