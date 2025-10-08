import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { questionsAPI } from '../lib/api'

const Quiz = () => {
  const navigate = useNavigate()
  const [selectedField, setSelectedField] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Get selected field from localStorage
    const field = localStorage.getItem('selectedField')
    if (field) {
      setSelectedField(field)
    } else {
      // If no field selected, redirect to home
      navigate('/home')
    }
  }, [navigate])

  const startQuiz = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/')
      return
    }

    setLoading(true)
    try {
      // For now, just show alert. Later we'll fetch questions and navigate to quiz page
      alert(`Starting ${selectedTopic} Quiz - ${selectedLevel} level in ${selectedField}!`)
      
      // TODO: Fetch questions from API
      // const questions = await questionsAPI.getQuestions(selectedField, selectedTopic, selectedLevel, token)
      
    } catch (error) {
      console.error('Error starting quiz:', error)
      alert('Failed to start quiz. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle>{selectedField} Quiz</CardTitle>
          <CardDescription>Test your knowledge in {selectedField.toLowerCase()}!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div>
            <h3 className="font-semibold mb-3">Choose your topic:</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={selectedTopic === 'JavaScript' ? 'default' : 'outline'} 
                onClick={() => setSelectedTopic('JavaScript')}
              >
                JavaScript
              </Button>
              <Button 
                variant={selectedTopic === 'HTML' ? 'default' : 'outline'} 
                onClick={() => setSelectedTopic('HTML')}
              >
                HTML
              </Button>
              <Button 
                variant={selectedTopic === 'CSS' ? 'default' : 'outline'} 
                onClick={() => setSelectedTopic('CSS')}
              >
                CSS
              </Button>
              <Button 
                variant={selectedTopic === 'Python' ? 'default' : 'outline'} 
                onClick={() => setSelectedTopic('Python')}
              >
                Python
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Select level:</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant={selectedLevel === 'Beginner' ? 'default' : 'outline'} 
                onClick={() => setSelectedLevel('Beginner')}
              >
                Beginner
              </Button>
              <Button 
                variant={selectedLevel === 'Intermediate' ? 'default' : 'outline'} 
                onClick={() => setSelectedLevel('Intermediate')}
              >
                Intermediate
              </Button>
              <Button 
                variant={selectedLevel === 'Advanced' ? 'default' : 'outline'} 
                onClick={() => setSelectedLevel('Advanced')}
              >
                Advanced
              </Button>
            </div>
          </div>

          <Button 
            className="w-full" 
            disabled={!selectedTopic || !selectedLevel || loading}
            onClick={startQuiz}
          >
            {loading ? 'Loading...' : (
              selectedTopic && selectedLevel 
                ? `Start ${selectedTopic} Quiz (${selectedLevel})` 
                : 'Select topic and level first'
            )}
          </Button>
          
        </CardContent>
      </Card>
    </div>
  )
}

export default Quiz