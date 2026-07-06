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
    slot.classList.remove("ad-slot-loaded");
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

  function renderA8(slot, config) {
    const a8 = config.a8 || {};
    if (!isConfigured(a8.linkUrl) || !isConfigured(a8.imageUrl)) return false;

    const link = document.createElement("a");
    link.className = "ad-affiliate";
    link.href = a8.linkUrl;
    link.target = "_blank";
    link.rel = "noopener sponsored";

    const img = document.createElement("img");
    img.src = a8.imageUrl;
    img.alt = a8.alt || "スポンサー広告";
    img.loading = "eager";
    img.decoding = "async";

    link.appendChild(img);
    slot.appendChild(link);
    slot.classList.add("ad-slot-loaded");
    return true;
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
    if (renderA8(slot, config)) return "a8";
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
