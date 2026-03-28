import { ShieldCheck } from 'lucide-react'

export function AuthBrand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
        <ShieldCheck className="size-5" aria-hidden />
      </div>

      <div className="space-y-0.5">
        <p className="text-sm font-semibold tracking-[0.22em] text-primary uppercase">
          Gosnkr
        </p>
        <p className="text-sm text-muted-foreground">Dashboard access</p>
      </div>
    </div>
  )
}
