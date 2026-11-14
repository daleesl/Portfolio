import type { PortfolioEvent } from '@/types'

// Newest first. Put photos in public/assets/images/events/<slug>/, resized to about 1600px wide
// (ideally under 300 KB each), and list them as { src: '/assets/images/events/<slug>/photo.jpg', caption: '...' }.
// The first photo is the cover. An event with no photos shows "Photos coming soon".
export const events: PortfolioEvent[] = [
  {
    slug: 'rainguard-mdrrmc-talisay',
    title: 'RainGuard featured by MDRRMC Talisay',
    date: 'Nov 2026',
    badge: 'Featured',
    role: 'Lead System Architect & Team Lead, Team RainGuard',
    summary: 'Presented RainGuard to the Talisay disaster risk council, who featured our visit on their page.',
    description:
      'We presented RainGuard, our rainfall forecasting and flood risk app for barangay disaster preparedness, to the Municipal Disaster Risk Reduction Management Council of Talisay, Batangas, who featured our visit on their page.',
    project: 'rainguard',
    photos: [
      { src: '/assets/images/events/rainguard-mdrrmc-talisay/team-with-mdrrmc.jpg', caption: 'Team RainGuard with an MDRRMC Talisay officer' },
      { src: '/assets/images/events/rainguard-mdrrmc-talisay/thumbs-up.jpg', caption: 'Thumbs up after presenting RainGuard' },
      { src: '/assets/images/events/rainguard-mdrrmc-talisay/dashboard-walkthrough.jpg', caption: 'Walking MDRRMC Talisay through the RainGuard dashboard' },
      { src: '/assets/images/events/rainguard-mdrrmc-talisay/reviewing-at-desk.jpg', caption: 'Reviewing the system with MDRRMC staff' },
      { src: '/assets/images/events/rainguard-mdrrmc-talisay/testing-the-app.jpg', caption: 'Running RainGuard at the MDRRMC office' },
      { src: '/assets/images/events/rainguard-mdrrmc-talisay/monitoring-room.jpg', caption: 'Team RainGuard in the MDRRMC monitoring room' },
    ],
  },
  {
    slug: 'pup-hackathon-2026',
    title: 'PUP Hackathon 2026: Uthack ang Puhunan',
    date: 'Oct 2026',
    badge: '3rd Runner-Up · Top 10 Finalist',
    role: 'Front-End Developer, Team Innobyte',
    summary: 'Built Konektado with Team Innobyte and made the finals, placing 3rd Runner-Up out of 40 teams.',
    description:
      "Built Konektado's front end as one of two developers on the team and contributed to backend features, taking the app from idea to a working product for the finals.",
    project: 'konektado',
    photos: [
      { src: '/assets/images/events/pup-hackathon-2026/3rd-place.jpg', caption: 'Team Innobyte takes 3rd place at the PUP Hackathon 2026 finals' },
      { src: '/assets/images/events/pup-hackathon-2026/3rd-runner-up-report.jpg', caption: "The Cloud Sentinel's report on our 3rd Runner-Up finish" },
      { src: '/assets/images/events/pup-hackathon-2026/main-qualifier.jpg', caption: 'Qualifying for the main hackathon' },
      { src: '/assets/images/events/pup-hackathon-2026/qualifiers-report.jpg', caption: 'PUPSTC Computer Society teams after the qualifiers' },
    ],
  },
]

// How many events the home page gallery shows.
export const homeEventCount = 5

// Events in the home page gallery: the newest ones that have photos.
export const homeEvents = events.filter((event) => event.photos.length > 0).slice(0, homeEventCount)

// The events page (/events) is only linked once some events don't fit in the home page gallery.
export const showEventsPage = events.length > homeEvents.length
