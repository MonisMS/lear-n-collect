import React from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card'
import Home from './pages/Home'

const App = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Home />
    </div>
  )
}

export default App