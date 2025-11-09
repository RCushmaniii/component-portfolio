import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getComponentById } from '../data/components'
import Button from '../components/ui/Button'
import LiquidRefractionLens from '../demos/visual-effects/LiquidRefractionLens'

export default function ComponentDetail() {
  const { componentId } = useParams()
  const component = getComponentById(componentId)

  if (!component) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Component Not Found</h1>
        <Link to="/">
          <Button>
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    )
  }

  // Component mapping
  const componentMap = {
    'liquid-refraction-lens': LiquidRefractionLens,
  }

  const DemoComponent = componentMap[componentId]

  if (!DemoComponent) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Demo Coming Soon</h1>
        <p className="text-slate-400 mb-8">This component is still under development.</p>
        <Link to="/">
          <Button>
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    )
  }

  return <DemoComponent />
}
