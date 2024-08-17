import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { SchedulerComponent } from './components/SchedulerComponent'

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      staleTime: 60_000, //1 minuta
    }
  }
})


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <SchedulerComponent />
    </QueryClientProvider>
  )
}

export default App
