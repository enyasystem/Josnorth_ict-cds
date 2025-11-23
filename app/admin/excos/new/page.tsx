"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCreateTeamMember } from "@/lib/hooks/useTeam"
import type { CreateTeamMemberData } from "@/lib/types/api"

export default function NewExcoPage() {
  const router = useRouter()
  const createMember = useCreateTeamMember()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { register, handleSubmit, setValue, watch } = useForm<CreateTeamMemberData>({
    defaultValues: { type: "exco" },
  })

  const onSubmit = async (data: CreateTeamMemberData) => {
    setErrorMessage(null)
    console.log('Submitting exco data', data)
    try {
      await createMember.mutateAsync(data)
      console.log('Create successful')
      router.push('/admin/excos')
    } catch (err: any) {
      console.error('Create failed', err)
      setErrorMessage(err?.message || 'Failed to create exco. Check console for details.')
    }
  }

  const isSubmitting = (createMember as any).isLoading || (createMember as any).isPending || false

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Add New Exco</h2>
        <p className="text-sm text-muted-foreground">Create a new executive member for the team directory.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white shadow-sm rounded-lg p-6">
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-3 py-2 rounded">
            {errorMessage}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="name">Full name *</Label>
          <Input id="name" {...register('name', { required: true })} placeholder="e.g., Jane Doe" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role / Position *</Label>
            <Input id="role" {...register('role', { required: true })} placeholder="e.g., President" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type *</Label>
            <Select defaultValue={watch('type') || 'exco'} onValueChange={(v) => setValue('type', v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exco">Exco</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" {...register('bio')} placeholder="Short biography or responsibilities" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="img">Image URL</Label>
          <Input id="img" {...register('img')} placeholder="https://example.com/photo.jpg" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} placeholder="email@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register('phone')} placeholder="+234 XXX XXX XXXX" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Social Links (optional)</Label>
          <div className="grid grid-cols-1 gap-2">
            <Input {...register('social.github')} placeholder="GitHub URL" />
            <Input {...register('social.linkedin')} placeholder="LinkedIn URL" />
            <Input {...register('social.twitter')} placeholder="Twitter URL" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => router.push('/admin/excos')}>Cancel</Button>
          <Button
            type="button"
            onClick={() => handleSubmit(onSubmit)()}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Create Exco'}
          </Button>
        </div>
      </form>
    </div>
  )
}
