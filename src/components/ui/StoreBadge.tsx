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
      className="group inline-block rounded-md transition-transform duration-medium ease-spring-fast hover:-translate-y-0.5 active:scale-95"
    >
      <img
        src={badge.src}
        alt={badge.alt}
        width={120}
        height={40}
        loading="lazy"
        className="h-11 w-auto rounded-[8px] transition-shadow duration-short group-hover:shadow-e3"
      />
    </a>
  )
}
