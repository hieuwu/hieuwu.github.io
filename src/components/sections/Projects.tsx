import { Section } from '@/components/ui/Section'
import { projects } from '@/content/projects'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Three apps, shipped."
      lead="An AI feature that had to stay private, a storage client that had to feel native twice, and a converter that had to work with no signal."
    >
      <div className="flex flex-col gap-8 sm:gap-10">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </Section>
  )
}
