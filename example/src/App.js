import propTypes from 'prop-types'
import React from 'react'

import { SwiperTabComponent } from 'viewpager'
import 'viewpager/dist/index.css'

const App = () => {
  let loadFooter=true;
  let loadHeader=false;
  let tabs = [
    {
      'name': 'First',
      'icon': '',
      'selectedIcon': '',
    },
    {
      'name': 'Second',
      'icon': '',
      'selectedIcon': '',
    },
    {
      'name': 'Third',
      'icon': '',
      'selectedIcon': '',
    }
  ]
  return (
    <SwiperTabComponent position={'top'} tabs={tabs} text="Create React Library Example 😄">
      <div>
        This is first child.
      </div>
      <div>
        This is second child.
      </div>
      <div>
        This is third child.
      </div>
    </SwiperTabComponent>
  )  
}

export default App
