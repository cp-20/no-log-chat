export const pagesPath = {
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  favicons: {
    android_chrome_128x128_png: '/favicons/android-chrome-128x128.png',
    android_chrome_144x144_png: '/favicons/android-chrome-144x144.png',
    android_chrome_152x152_png: '/favicons/android-chrome-152x152.png',
    android_chrome_192x192_png: '/favicons/android-chrome-192x192.png',
    android_chrome_256x256_png: '/favicons/android-chrome-256x256.png',
    android_chrome_36x36_png: '/favicons/android-chrome-36x36.png',
    android_chrome_384x384_png: '/favicons/android-chrome-384x384.png',
    android_chrome_48x48_png: '/favicons/android-chrome-48x48.png',
    android_chrome_512x512_png: '/favicons/android-chrome-512x512.png',
    android_chrome_72x72_png: '/favicons/android-chrome-72x72.png',
    android_chrome_96x96_png: '/favicons/android-chrome-96x96.png',
    apple_touch_icon_114x114_precomposed_png: '/favicons/apple-touch-icon-114x114-precomposed.png',
    apple_touch_icon_114x114_png: '/favicons/apple-touch-icon-114x114.png',
    apple_touch_icon_120x120_precomposed_png: '/favicons/apple-touch-icon-120x120-precomposed.png',
    apple_touch_icon_120x120_png: '/favicons/apple-touch-icon-120x120.png',
    apple_touch_icon_144x144_precomposed_png: '/favicons/apple-touch-icon-144x144-precomposed.png',
    apple_touch_icon_144x144_png: '/favicons/apple-touch-icon-144x144.png',
    apple_touch_icon_152x152_precomposed_png: '/favicons/apple-touch-icon-152x152-precomposed.png',
    apple_touch_icon_152x152_png: '/favicons/apple-touch-icon-152x152.png',
    apple_touch_icon_180x180_precomposed_png: '/favicons/apple-touch-icon-180x180-precomposed.png',
    apple_touch_icon_180x180_png: '/favicons/apple-touch-icon-180x180.png',
    apple_touch_icon_57x57_precomposed_png: '/favicons/apple-touch-icon-57x57-precomposed.png',
    apple_touch_icon_57x57_png: '/favicons/apple-touch-icon-57x57.png',
    apple_touch_icon_60x60_precomposed_png: '/favicons/apple-touch-icon-60x60-precomposed.png',
    apple_touch_icon_60x60_png: '/favicons/apple-touch-icon-60x60.png',
    apple_touch_icon_72x72_precomposed_png: '/favicons/apple-touch-icon-72x72-precomposed.png',
    apple_touch_icon_72x72_png: '/favicons/apple-touch-icon-72x72.png',
    apple_touch_icon_76x76_precomposed_png: '/favicons/apple-touch-icon-76x76-precomposed.png',
    apple_touch_icon_76x76_png: '/favicons/apple-touch-icon-76x76.png',
    apple_touch_icon_precomposed_png: '/favicons/apple-touch-icon-precomposed.png',
    apple_touch_icon_png: '/favicons/apple-touch-icon.png',
    favicon_ico: '/favicons/favicon.ico',
    icon_128x128_png: '/favicons/icon-128x128.png',
    icon_144x144_png: '/favicons/icon-144x144.png',
    icon_152x152_png: '/favicons/icon-152x152.png',
    icon_160x160_png: '/favicons/icon-160x160.png',
    icon_16x16_png: '/favicons/icon-16x16.png',
    icon_192x192_png: '/favicons/icon-192x192.png',
    icon_196x196_png: '/favicons/icon-196x196.png',
    icon_24x24_png: '/favicons/icon-24x24.png',
    icon_256x256_png: '/favicons/icon-256x256.png',
    icon_32x32_png: '/favicons/icon-32x32.png',
    icon_36x36_png: '/favicons/icon-36x36.png',
    icon_384x384_png: '/favicons/icon-384x384.png',
    icon_48x48_png: '/favicons/icon-48x48.png',
    icon_512x512_png: '/favicons/icon-512x512.png',
    icon_72x72_png: '/favicons/icon-72x72.png',
    icon_96x96_png: '/favicons/icon-96x96.png',
    manifest_json: '/favicons/manifest.json',
    site_tile_150x150_png: '/favicons/site-tile-150x150.png',
    site_tile_310x150_png: '/favicons/site-tile-310x150.png',
    site_tile_310x310_png: '/favicons/site-tile-310x310.png',
    site_tile_70x70_png: '/favicons/site-tile-70x70.png'
  },
  notification_mp3: '/notification.mp3',
  ogp_png: '/ogp.png'
} as const

export type StaticPath = typeof staticPath
