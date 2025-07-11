"use client"

import { useRouter } from "next/navigation"
import { useTRPC } from "@/trpc/client"
import { Loader2Icon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export const ProjectsList = () => {
  const router = useRouter()
  const trpc = useTRPC()
  
  const { data: projects, isLoading } = trpc.projects.getMany.useQuery()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2Icon className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!projects?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <p className="text-sm text-muted-foreground">
          No projects found. Create your first project above!
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-4">
      <h2 className="text-xl font-semibold">Your Projects</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <div 
            key={project.id}
            onClick={() => router.push(`/projects/${project.id}`)}
            className="cursor-pointer rounded-lg border p-4 transition-colors hover:bg-accent"
          >
            <h3 className="font-medium">{project.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Created {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true })}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
