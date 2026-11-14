import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Expand } from 'lucide-react'
import AnimatedContent from '@/components/AnimatedContent'
import PhotoViewer from '@/components/PhotoViewer'
import { certifications } from '@/data/certifications'
import { eyebrow, section } from '@/lib/ui'
import type { Certification } from '@/types'

// Width-to-height of each preview shape; every preview is the same height, so rows line up.
const previewRatio = { landscape: '1239 / 837', portrait: '3 / 4' }

const linkClass = 'mt-2 inline-flex min-h-11 items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-wide hover:text-sky-700 dark:hover:text-sky-400'

// Previews of the certificate(s) on the left and the details on the right; on phones the previews sit on top.
function CertificationItem({ cert, titleId, onPreview }: { cert: Certification; titleId: string; onPreview: (index: number) => void }) {
  const Logo = cert.logo
  const images = cert.images ?? []
  const isFile = /\.\w+$/.test(cert.link.href)

  return (
    <AnimatedContent className="flex flex-wrap items-start gap-x-8 gap-y-5" stagger={0.05}>
      {images.length > 0 && (
        <div className="flex shrink-0 gap-2">
          {images.map((image, index) => (
            <button
              className="group relative h-44 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-700"
              style={{ aspectRatio: previewRatio[image.shape] }}
              type="button"
              onClick={() => onPreview(index)}
              aria-label={`View certificate: ${image.caption}`}
              key={image.src}
            >
              <img className="size-full object-cover" src={image.src} alt="" loading="lazy" />
              <span className="absolute right-2 bottom-2 grid size-8 place-items-center rounded-full bg-slate-950/70 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand size={14} aria-hidden="true" />
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="min-w-0 flex-[1_1_260px]">
        <p className="flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {cert.date}
          <span className="rounded-full border border-slate-300 px-2 py-0.5 text-[10px] text-slate-600 dark:border-slate-600 dark:text-slate-300">
            {cert.kind}
          </span>
        </p>
        <h3 className="mt-2 text-xl font-semibold" id={titleId}>{cert.title}</h3>
        <p className="mt-1.5 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          {Logo && <Logo className="size-5 shrink-0" style={{ color: cert.logoColor }} aria-hidden="true" />}
          {cert.issuer}
        </p>
        {cert.detail && <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">{cert.detail}</p>}
        {isFile ? (
          <a className={linkClass} href={cert.link.href} target="_blank" rel="noreferrer">
            {cert.link.label} <ArrowUpRight size={14} />
          </a>
        ) : (
          <a className={linkClass} href={cert.link.href}>
            {cert.link.label} <ArrowRight size={14} />
          </a>
        )}
      </div>
    </AnimatedContent>
  )
}

export default function Certifications() {
  const [viewer, setViewer] = useState<{ cert: Certification; index: number } | null>(null)
  const viewerImages = viewer?.cert.images ?? []

  if (certifications.length === 0) return null

  return (
    <section className={section} id="certifications" aria-labelledby="certs-title">
      <AnimatedContent>
        <p className={`${eyebrow} mb-8`} id="certs-title">Certifications &amp; awards</p>
      </AnimatedContent>
      <div className="flex flex-col gap-10">
        {certifications.map((cert, index) => (
          <CertificationItem
            cert={cert}
            titleId={`cert-${index}`}
            onPreview={(imageIndex) => setViewer({ cert, index: imageIndex })}
            key={cert.title}
          />
        ))}
      </div>

      <PhotoViewer
        photos={viewerImages}
        title={viewer?.cert.kind === 'Award' ? 'Award' : 'Certificate'}
        index={viewer && viewerImages.length > 0 ? viewer.index : null}
        onIndexChange={(index) => setViewer((current) => (current ? { ...current, index } : current))}
        onClose={() => setViewer(null)}
      />
    </section>
  )
}
