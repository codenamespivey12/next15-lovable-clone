"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import TextareaAutosize from "react-textarea-autosize"
import { ArrowUpIcon, Loader2Icon } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useTRPC } from "@/trpc/client"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { PROJECT_TEMPLATES } from "../../constants"
import { useClerk } from "@clerk/nextjs"

const formSchema = z.object({
  value: z.string()
    .min(1, { message: "Prompt value is required" })
    .max(10000, { message: "Prompt value is too long" }),
})

export const ProjectForm = () => {
  const router = useRouter()
  const clerk = useClerk()
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: ""
    }
  })

  const createProject = useMutation(trpc.projects.create.mutationOptions({
    onSuccess: (data) => {
      queryClient.invalidateQueries(
        trpc.projects.getMany.queryOptions()
      )
      router.push(`/projects/${data.id}`)
    },
    onError: (error) => {
      toast.error(error.message)
      if(error.data?.code === "UNAUTHORIZED"){
        clerk.openSignIn()
      }
    }
  }))

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await createProject.mutateAsync({
      value: values.value
    })
  }

  const selectTemplate = (index: number) => {
    setSelectedTemplate(index)
    form.setValue("value", PROJECT_TEMPLATES[index].prompt)
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <div className="relative">
                <TextareaAutosize
                  {...field}
                  placeholder="Describe what you want to build..."
                  className={cn(
                    "resize-none w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    "min-h-[100px]"
                  )}
                />
                <Button
                  size="sm"
                  type="submit"
                  disabled={createProject.isPending}
                  className="absolute bottom-2 right-2"
                >
                  {createProject.isPending ? (
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowUpIcon className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          />
        </form>
      </Form>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Or try a template:</h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {PROJECT_TEMPLATES.map((template, index) => (
            <div
              key={index}
              onClick={() => selectTemplate(index)}
              className={cn(
                "cursor-pointer rounded-md border p-3 transition-colors hover:bg-accent",
                selectedTemplate === index && "border-primary"
              )}
            >
              <div className="flex items-center gap-2">
                <span>{template.emoji}</span>
                <span className="text-sm font-medium">{template.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
