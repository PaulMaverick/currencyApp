import './App.css'
import Conversion from './container/Conversion'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

function App() {


  return (
    <main>
        <ErrorBoundary fallback={<div className="errorFallBack">Something went wrong</div>}>
          <Suspense fallback={<div className="suspenseFallback">Loading...</div>}>
            <Conversion />
          </Suspense>
        </ErrorBoundary>
    </main>
  )
}

export default App
