import { SiCisco } from 'react-icons/si'
import { eventHref } from '@/hooks/useProjectRoute'
import type { Certification } from '@/types'

// Newest first. Put certificate files (a PDF and/or pictures of it) in public/assets/certificates/
// with a plain name (no email or IDs).
export const certifications: Certification[] = [
  {
    kind: 'Award',
    title: '3rd Runner-Up · Top 10 Finalist, PUP Hackathon 2026',
    issuer: 'Polytechnic University of the Philippines',
    detail: 'Research Institute for Strategic Foresight and Innovation',
    date: 'Oct 2026',
    link: { label: 'See the event', href: eventHref('pup-hackathon-2026') },
    images: [
      {
        src: '/assets/certificates/pup-hackathon-2026-3rd-runner-up.jpg',
        caption: '3rd Runner-Up, PUP Hackathon 2026 · 14 Oct 2026',
        shape: 'portrait',
      },
      {
        src: '/assets/certificates/pup-hackathon-2026-top-10-finalist.jpg',
        caption: 'Top 10 Finalist, PUP Hackathon 2026 · 13 Oct 2026',
        shape: 'portrait',
      },
    ],
  },
  {
    kind: 'Certification',
    title: 'Data Science Essentials with Python',
    issuer: 'Cisco Networking Academy',
    detail: 'Offered by DICT-ITU DTC Initiative',
    date: 'Oct 2025',
    link: { label: 'View certificate', href: '/assets/certificates/data-science-essentials-with-python.pdf' },
    images: [
      {
        src: '/assets/certificates/data-science-essentials-with-python.png',
        caption: 'Data Science Essentials with Python · Cisco Networking Academy',
        shape: 'landscape',
      },
    ],
    logo: SiCisco,
    logoColor: '#1BA0D7',
  },
]
