import { Badge } from '@/components/ui/badge'

export default function ApprovalsPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div className="space-y-2">
          <Badge className="w-fit border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
            Store Approval
          </Badge>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Store Approval
            </h1>
          </div>
        </div>
      </section>
    </div>
  )
}
