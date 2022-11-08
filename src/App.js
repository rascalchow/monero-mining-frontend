import { BrowserRouter } from 'react-router-dom'
// ** Router Import
import Routes from './routes'

const App = () => (
  <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
    <Routes />
  </BrowserRouter>
)

export default App
