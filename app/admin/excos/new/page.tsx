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
  const [debugInfo, setDebugInfo] = useState<{ request?: any; response?: any }>({})
  const isDev = process.env.NODE_ENV !== 'production'

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateTeamMemberData>({
    defaultValues: { type: "exco" },
  })

  const onSubmit = async (data: CreateTeamMemberData) => {
    setErrorMessage(null)
    console.log('Submitting exco data', data)
    // capture request info for local debugging
    try {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token')
        const headers = {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }
        setDebugInfo({ request: { headers, payload: data } })
      }
    } catch (e) {
      // ignore debug capture failures
    }
    try {
      await createMember.mutateAsync(data)
      console.log('Create successful')
      router.push('/admin/excos')
    } catch (err: any) {
      console.error('Create failed', err)

      // Prefer server response body when available (axios error shape)
      const status = err?.response?.status
      const respData = err?.response?.data
      const respHeaders = err?.response?.headers

      let detail = ''
      try {
        if (respData) {
          detail = typeof respData === 'object' ? JSON.stringify(respData) : String(respData)
        } else if (err?.request) {
          detail = 'No response body; request was sent but no response received.'
        } else {
          detail = err?.message || 'Unknown error'
        }
      } catch (e) {
        detail = String(err?.message || 'Unknown error')
      }

      const headerSnippet = respHeaders ? JSON.stringify(respHeaders) : undefined

      setErrorMessage(`Server error (${status || 'unknown'}): ${detail}${headerSnippet ? '\nHeaders: ' + headerSnippet : ''}`)

      // capture response for local debugging
      try {
        setDebugInfo((prev) => ({ ...prev, response: { status, data: respData, headers: respHeaders } }))
      } catch (e) {
        // ignore
      }
    }
  }

  const isSubmitting = (createMember as any)?.isLoading || false

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
          <Input
            id="name"
            {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })}
            placeholder="e.g., Jane Doe"
            aria-invalid={errors.name ? true : undefined}
          />
          {errors.name && (
            <p className="text-sm text-red-700 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role / Position *</Label>
            <Input
              id="role"
              {...register('role', { required: 'Role is required', minLength: { value: 2, message: 'Provide a valid role' } })}
              placeholder="e.g., President"
              aria-invalid={errors.role ? true : undefined}
            />
            {errors.role && (
              <p className="text-sm text-red-700 mt-1">{errors.role.message}</p>
            )}
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
          <Input
            id="img"
            {...register('img', { pattern: { value: /^(https?:\/\/[^\s]+)$/i, message: 'Enter a valid URL' } })}
            placeholder="https://example.com/photo.jpg"
            aria-invalid={errors.img ? true : undefined}
          />
          {errors.img && (
            <p className="text-sm text-red-700 mt-1">{errors.img.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' } })}
              placeholder="email@example.com"
              aria-invalid={errors.email ? true : undefined}
            />
            {errors.email && (
              <p className="text-sm text-red-700 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              {...register('phone', { pattern: { value: /^\+?[0-9\s\-()]{7,}$/, message: 'Invalid phone number' } })}
              placeholder="+234 XXX XXX XXXX"
              aria-invalid={errors.phone ? true : undefined}
            />
            {errors.phone && (
              <p className="text-sm text-red-700 mt-1">{errors.phone.message}</p>
            )}
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
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? 'cursor-not-allowed' : 'cursor-pointer'}
          >
            {isSubmitting ? 'Saving...' : 'Create Exco'}
          </Button>
        </div>
      </form>
    </div>
  )
}
