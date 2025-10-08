
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'

const Home = () => {
  return (
    <div className='bg-background flex items-center justify-center min-h-screen p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <CardTitle className='text-3xl font-bold'>
            Welcome to the Quiz App
          </CardTitle>
          <CardDescription>
            Test your knowledge and track your progress!
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='gap-2 grid grid-cols-2'>
            <Button className='w-full' onClick={() => {alert('Programming')}}>Programming</Button>
            <Button className='w-full' onClick={() => {alert('Mathematics')}}>Mathematics</Button>
            <Button className='w-full' onClick={() => {alert('Science')}}>Science</Button>
            <Button className='w-full' onClick={() => {alert('History')}}>History</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home