type AuthPageHeaderProps = {
  title: string
  description: string
}

export function AuthPageHeader({ title, description }: AuthPageHeaderProps) {
  return (
    <header className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="text-sm leading-6 text-muted-foreground">{description}</p>
    </header>
  )
}
