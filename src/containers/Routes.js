
import React from 'react'
import { Redirect, Route, Switch} from 'react-router-dom'
import {Headers} from './Headers'
import {Home} from './Home'


export const Routes = () => {
  return (
    <div>
      <Headers  style={{marginBottom: '20px'}} />
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </main>
    </div>
  )
  }