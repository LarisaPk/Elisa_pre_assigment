import React from 'react'
import LiveNow from './pages/LiveNow'
import Schedule from './pages/Schedule'
import { Container } from 'semantic-ui-react'
import { BrowserRouter as Router, Route, NavLink,} from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

function App() {


  return (
    <Container>
      <Router>
        <div>
          <Menu inverted>
            <Menu.Item >
              <NavLink  to="/live">Live Now</NavLink>
            </Menu.Item>
            <Menu.Item link className="menuItem">
              <NavLink to="/schedule">Shedule</NavLink>
            </Menu.Item>
          </Menu>

          <Route exact path="/" render={() => <LiveNow />} />
          <Route path="/live" render={() => <LiveNow/>} />
          <Route path="/schedule" render={() => <Schedule/>} />
        </div>
      </Router>
    </Container> 
  )
} 

export default App
