// Flasher service worker — makes the app work offline (e.g. on a plane).
//
// Two independently-versioned caches so the frequent case (editing a deck) does NOT
// force users to re-download the large flasher.js bundle, and vice-versa:
//   - shell cache: index.html, credits.html, flasher.js, styles.css  (keyed by __CODE_VERSION)
//   - deck cache:  decks/index.json + every deck + every card image (keyed by __CONTENT_VERSION)
// The versions are build-injected hashes of each bucket's source inputs (see the
// generateServiceWorker Gradle task), so a deploy invalidates exactly the bucket that changed.
//
// This file is a TEMPLATE: the build replaces the marker below with the version constants and
// image list, inlined. They must live in sw.js itself (not an importScripts'd file) because a
// browser only installs an updated SW when the bytes of sw.js change — Safari/iOS does not
// reliably byte-check imported scripts, so a separate version file left iPhones stuck on stale
// caches forever.
//
// All URLs are relative so the SW works under the /apps/flasher/ subpath on breischl.dev.

self.__CODE_VERSION = "6cd427342c0a";
self.__CONTENT_VERSION = "118e88c67f8d";
self.__IMAGES = ["decks/scuba-hand-signals/ascend-to-stop.webp","decks/scuba-hand-signals/ascend.webp","decks/scuba-hand-signals/boat.webp","decks/scuba-hand-signals/bubbles.webp","decks/scuba-hand-signals/buddy-up.webp","decks/scuba-hand-signals/cant-equalize.webp","decks/scuba-hand-signals/cold.webp","decks/scuba-hand-signals/cramp.webp","decks/scuba-hand-signals/cut-the-line.webp","decks/scuba-hand-signals/danger-there.webp","decks/scuba-hand-signals/danger.webp","decks/scuba-hand-signals/descend.webp","decks/scuba-hand-signals/dont-know.webp","decks/scuba-hand-signals/entangled.webp","decks/scuba-hand-signals/fetch-me.webp","decks/scuba-hand-signals/give-me-air.webp","decks/scuba-hand-signals/help-surface.webp","decks/scuba-hand-signals/hold-on.webp","decks/scuba-hand-signals/how-much-air.webp","decks/scuba-hand-signals/lead-follow.webp","decks/scuba-hand-signals/level-off.webp","decks/scuba-hand-signals/look.webp","decks/scuba-hand-signals/low-on-air.webp","decks/scuba-hand-signals/not-right.webp","decks/scuba-hand-signals/ok-surface-one-hand.webp","decks/scuba-hand-signals/ok-surface.webp","decks/scuba-hand-signals/ok.webp","decks/scuba-hand-signals/out-of-air.webp","decks/scuba-hand-signals/safety-stop.webp","decks/scuba-hand-signals/silt.webp","decks/scuba-hand-signals/slow-down.webp","decks/scuba-hand-signals/stop.webp","decks/scuba-hand-signals/think.webp","decks/scuba-hand-signals/turn-around.webp","decks/scuba-hand-signals/turn-dive.webp","decks/scuba-hand-signals/which-way.webp"]; // defines self.__CODE_VERSION, self.__CONTENT_VERSION, self.__IMAGES

const SHELL_CACHE = "flasher-shell-" + self.__CODE_VERSION;
const DECK_CACHE = "flasher-decks-" + self.__CONTENT_VERSION;

const SHELL_ASSETS = ["./", "index.html", "credits.html", "flasher.js", "styles.css"];

// Force the network (not the browser HTTP cache) when precaching. flasher.js keeps a
// stable filename, so without this a re-precache could pull a stale cached bundle.
async function precache(cacheName, urls) {
    const cache = await caches.open(cacheName);
    await Promise.all(
        urls.map(async (url) => {
            const response = await fetch(url, { cache: "reload" });
            if (response.ok) await cache.put(url, response);
        })
    );
}

// Every deck file plus every card image (decks/<id>/<file>, listed at build time in
// the build constants above). Images are precached eagerly, on the assumption the first visit is on WiFi.
async function deckUrls() {
    const response = await fetch("decks/index.json", { cache: "reload" });
    const summaries = await response.json();
    return [
        "decks/index.json",
        ...summaries.map((d) => "decks/" + d.id + ".json"),
        ...(self.__IMAGES || []),
    ];
}

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            // Only (re)precache a bucket whose version changed — if the cache already
            // exists, its inputs are unchanged, so skip the download.
            if (!(await caches.has(SHELL_CACHE))) {
                await precache(SHELL_CACHE, SHELL_ASSETS);
            }
            if (!(await caches.has(DECK_CACHE))) {
                await precache(DECK_CACHE, await deckUrls());
            }
            await self.skipWaiting();
        })()
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            // Drop only stale buckets; keep the two current ones.
            const keep = new Set([SHELL_CACHE, DECK_CACHE]);
            const names = await caches.keys();
            await Promise.all(names.filter((n) => !keep.has(n)).map((n) => caches.delete(n)));
            await self.clients.claim();
        })()
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") return;
    event.respondWith(
        (async () => {
            const cached = await caches.match(event.request);
            if (cached) return cached;

            const response = await fetch(event.request);
            // Keep any lazily-opened deck or card image cached for next time (offline resilience).
            if (response.ok && new URL(event.request.url).pathname.includes("/decks/")) {
                const cache = await caches.open(DECK_CACHE);
                cache.put(event.request, response.clone());
            }
            return response;
        })()
    );
});
