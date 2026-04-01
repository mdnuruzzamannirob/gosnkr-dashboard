import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <div className="mx-auto h-12 w-12 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-48 animate-pulse rounded bg-muted mx-auto" />
          <div className="h-4 w-64 animate-pulse rounded bg-muted mx-auto" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    </div>
  )
}
