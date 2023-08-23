'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "da6cd3aae50b405f6470b129970c2f69",
"index.html": "2eea7fcb1cdbc45420e3cd49d5ec09c3",
"/": "2eea7fcb1cdbc45420e3cd49d5ec09c3",
"main.dart.js": "4f70effea609586824609d5f9967299f",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "a4fe256dd887f385306566e3ead94949",
"assets/AssetManifest.json": "31ff12567b14aa7d073cf177b606804f",
"assets/NOTICES": "8db239ab5ed793fb9b5b6b38cc6203c6",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/easy_localization/i18n/ar-DZ.json": "acc0a8eebb2fcee312764600f7cc41ec",
"assets/packages/easy_localization/i18n/en.json": "5f5fda8715e8bf5116f77f469c5cf493",
"assets/packages/easy_localization/i18n/en-US.json": "5f5fda8715e8bf5116f77f469c5cf493",
"assets/packages/easy_localization/i18n/ar.json": "acc0a8eebb2fcee312764600f7cc41ec",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/lib/assets/config/prod_config.json": "bad630d656d3b2ca60d5b9a50a06ed45",
"assets/lib/assets/config/dev_config.json": "bad630d656d3b2ca60d5b9a50a06ed45",
"assets/lib/assets/images/iCheck.png": "287e25621750852232082b7f557dced2",
"assets/lib/assets/images/sgs_logo.png": "175624f8632e5be95797160171844921",
"assets/lib/assets/images/food_background.png": "246d266ec07e42b04f6598a2d8ec2d35",
"assets/lib/assets/images/icheck_logo.png": "bd15d236a344726c73b4c215df66d5c4",
"assets/lib/assets/images/app_icon_f.png": "451761e401e0d4ae9beefe8bed44ab77",
"assets/lib/assets/images/app_icon_android.png": "fa6f7e9d9796d349802c2ac366f98136",
"assets/lib/assets/localizables/es-ES.json": "21f4dc75e56700fc8f412f94f2319764",
"assets/lib/assets/localizables/en-US.json": "e0b7e2ec0cedc4b494b4e6e3d14de852",
"assets/lib/assets/icons/search.svg": "e653532b1f5f301eff2902466031a9d6",
"assets/lib/assets/icons/user.svg": "514910f2ed0c5f71f0d5d0b86de8e9cc",
"assets/lib/assets/icons/result.svg": "897364a9ba2152c3c7498ac699778ad6",
"assets/lib/assets/icons/home.svg": "70f81514eb1e817b9622600b6a541dd0",
"assets/lib/assets/icons/tag_group.svg": "88ffc7a5651ddbac7726415b2e819599",
"assets/lib/assets/icons/headset.svg": "13697f267cfa4f8ea2e4103d7d3b1e0c",
"assets/lib/assets/icons/certificate_check.svg": "6714177d8fcc79363f67277cb89d154a",
"assets/lib/assets/icons/text_indent.svg": "01cc74408032bcac17593c0cf3a0a9d5",
"assets/lib/assets/icons/data_structure.svg": "500e0f70a561e88b71a8ba53feea4ec9",
"assets/lib/assets/icons/content_view.svg": "92840eaa7b15d1e12032f5eaae5917ba",
"assets/lib/assets/icons/filter.svg": "d63869b7f41d4aa2042f4c4e2c0750e4",
"assets/lib/assets/animations/loader_idle.zip": "03888d04bc84ef3c4ad0a55b74e1f0b0",
"assets/lib/assets/animations/list_charging.zip": "fb8e61101192543db7c423c0be177ebb",
"assets/lib/assets/animations/loader_success.zip": "9a11c75d6d3060f8dcfb1da194a0755c",
"assets/AssetManifest.bin": "a794715117e7d629ee3e58afa23d2235",
"assets/fonts/MaterialIcons-Regular.otf": "bba543827eae154b3c2befbac1d8673d",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
