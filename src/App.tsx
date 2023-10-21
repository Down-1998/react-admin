/* eslint-disable @typescript-eslint/no-empty-function */
import './App.css'
import Router from '@/router'
import { Provider } from 'react-redux'
import store from '@/redux/store'

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
    
  )
}

export default App
