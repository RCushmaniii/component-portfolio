import { useParams } from 'react-router-dom'
import LiquidRefractionLensPage from './LiquidRefractionLensPage'
import OverlappingHeroPage from './OverlappingHeroPage'

export default function ComponentDemoPage() {
  const { componentId } = useParams()

  // Route to the appropriate component demo page
  switch (componentId) {
    case 'liquid-refraction-lens':
      return <LiquidRefractionLensPage />
    case 'overlapping-hero':
      return <OverlappingHeroPage />
    default:
      return <LiquidRefractionLensPage /> // Fallback to liquid refraction lens
  }
}
