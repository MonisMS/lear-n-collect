
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'

const Home = () => {
  const navigate = useNavigate()
  
  const fields = [
    { name: 'Programming', icon: '💻', description: 'Web development, algorithms, and more' },
    { name: 'Mathematics', icon: '🔢', description: 'Algebra, geometry, calculus' },
    { name: 'Science', icon: '🧪', description: 'Physics, chemistry, biology' },
    { name: 'History', icon: '📚', description: 'World history and events' }
  ]

  const handleFieldSelect = (fieldName: string) => {
    // Store selected field and navigate to quiz page
    localStorage.setItem('selectedField', fieldName)
    navigate('/quiz')
  }

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <Card className='w-full max-w-2xl'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl font-bold'>
            Choose Your Field
          </CardTitle>
          <CardDescription>
            Select a subject to start your quiz journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {fields.map((field) => (
              <Button
                key={field.name}
                variant="outline"
                className="h-auto p-6 text-left flex flex-col items-start space-y-2"
                onClick={() => handleFieldSelect(field.name)}
              >
                <div className="text-2xl">{field.icon}</div>
                <div className="font-semibold text-lg">{field.name}</div>
                <div className="text-sm text-muted-foreground">{field.description}</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home