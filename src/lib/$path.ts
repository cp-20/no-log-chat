export const pagesPath = {
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  favicon_ico: '/favicon.ico',
  notification_mp3: '/notification.mp3',
  ogp_png: '/ogp.png',
  vercel_svg: '/vercel.svg'
} as const

export type StaticPath = typeof staticPath
