import AnimatedContent from '@/components/AnimatedContent'
import ContributionGraph from '@/components/ContributionGraph'
import { githubUrl } from '@/data/profile'
import { section } from '@/lib/ui'

// The username at the end of the GitHub profile link.
const githubUsername = githubUrl.split('/').filter(Boolean).at(-1) ?? ''

export default function GitHubActivity() {
  return (
    <section className={section} id="github" aria-labelledby="github-title">
      <AnimatedContent className="mb-9" blur={4}>
        <h2 className="font-pixel text-3xl font-normal lowercase md:text-[38px]" id="github-title">
          GitHub activity.
        </h2>
      </AnimatedContent>
      <AnimatedContent>
        <ContributionGraph username={githubUsername} profileUrl={githubUrl} />
      </AnimatedContent>
    </section>
  )
}
