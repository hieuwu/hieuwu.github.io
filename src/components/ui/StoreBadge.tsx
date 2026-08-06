import type { StoreLink } from '@/content/projects'

const BADGES: Record<StoreLink['kind'], { src: string; alt: string }> = {
  appStore: { src: '/assets/img/app-store-download.svg', alt: 'Download on the App Store' },
  playStore: { src: '/assets/img/playstore-download.svg', alt: 'Get it on Google Play' },
}

export function StoreBadge({ store }: { store: StoreLink }) {
  const badge = BADGES[store.kind]
  return (
    <a
      href={store.href}
      target="_blank"
      rel="noreferrer noopener"
      className="group inline-block rounded-inner transition-transform duration-fast ease-emphasized hover:-translate-y-0.5"
    >
      <img
        src={badge.src}
        alt={badge.alt}
        width={120}
        height={40}
        loading="lazy"
        className="h-10 w-auto rounded-[6px] ring-1 ring-white/10 transition-shadow duration-fast group-hover:shadow-med"
      />
    </a>
  )
}
