import { AppLoader } from '@/components/ui/AppLoader'

export default function Loading() {
  return (
    <AppLoader
      variant="route"
      theme="auto"
      showText={true}
      slogan="Chargement..."
      size="md"
    />
  )
}
