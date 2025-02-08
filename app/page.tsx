import dynamic from 'next/dynamic'

const ModernUI = dynamic(() => import('../components/ModernUI'), {
  ssr: false,
})

export default function Home() {
  return <ModernUI />
}