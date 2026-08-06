export type Post = {
  title: string
  /** Series name shown as the card's eyebrow. */
  series: string
  blurb: string
  href: string
  publication: 'Medium' | 'Stackademic'
  tags: string[]
}

export const posts: Post[] = [
  {
    title: 'Verify email directly in app with Edge Function',
    series: 'Supadroid',
    blurb:
      'Keeping the confirmation step inside the app instead of bouncing users to a browser tab, using a Supabase Edge Function to do the verification.',
    href: 'https://hieuwu.medium.com/supadroid-verify-email-directly-in-app-with-edge-function-7ffbee498387',
    publication: 'Medium',
    tags: ['Edge Functions', 'Auth'],
  },
  {
    title: 'In-App Purchases with Supabase & RevenueCat',
    series: 'Supadroid',
    blurb:
      'Wiring RevenueCat entitlements through to Supabase so paid state is decided on the server and stays right across reinstalls and platforms.',
    href: 'https://hieuwu.medium.com/supadroid-in-app-purchases-with-supabase-revenuecat-718070c993b3',
    publication: 'Medium',
    tags: ['RevenueCat', 'Billing'],
  },
  {
    title: 'Sending Push Notifications on Supabase Database Events',
    series: 'Supadroid',
    blurb:
      'Turning row changes into push notifications with database webhooks, without adding a separate backend service to maintain.',
    href: 'https://hieuwu.medium.com/supadroid-sending-push-notifications-on-supabase-database-events-0c3cfbe190b3',
    publication: 'Medium',
    tags: ['Webhooks', 'Push'],
  },
  {
    title: "Customer feedback feature with Supabase's Edge Function and Slack",
    series: 'Supadroid',
    blurb:
      'An in-app feedback flow that lands straight in a Slack channel, with one Edge Function between the app and the team.',
    href: 'https://hieuwu.medium.com/supadroid-customer-feedback-feature-with-supabases-edge-function-and-slack-f55464705bc7',
    publication: 'Medium',
    tags: ['Edge Functions', 'Slack'],
  },
  {
    title: 'Simple Password Reset feature in Android with Supabase',
    series: 'Supadroid',
    blurb:
      'The full password reset path on Android: deep link handling, session state, and the edge cases that break it.',
    href: 'https://hieuwu.medium.com/supadroid-simple-password-reset-feature-in-android-with-supabase-7118d9bb98fe',
    publication: 'Medium',
    tags: ['Auth', 'Deep links'],
  },
  {
    title: 'Building secure user sign-up with email confirmation on Android',
    series: 'Supadroid',
    blurb:
      'Sign-up done properly: email confirmation, session handling, and where the security holes usually are.',
    href: 'https://blog.stackademic.com/supadroid-building-secure-user-sign-up-with-email-confirmation-with-supabase-on-android-72f3172d6049',
    publication: 'Stackademic',
    tags: ['Auth', 'Security'],
  },
]
