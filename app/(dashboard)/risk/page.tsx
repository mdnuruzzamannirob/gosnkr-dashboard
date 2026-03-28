import { Badge } from '@/components/ui/badge'

export default function RiskPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div className="space-y-2">
          <Badge className="w-fit border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
            Fraud Hub
          </Badge>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              Fraud Hub
            </h1>
          </div>
        </div>
      </section>
    </div>
  )
}
