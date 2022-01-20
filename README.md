# viewpager

> Pager view and tab view  built in react 

<!-- [![NPM](https://img.shields.io/npm/v/viewpager.svg)](https://www.npmjs.com/package/viewpager) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) -->

<!-- ## Install

```bash
npm install --save viewpager
``` -->

## Usage

```jsx
import React, { Component } from 'react'

import SwiperTabComponent from 'viewpager'
import 'viewpager/dist/index.css'



class Example extends Component {
  let tabs = [
    {
      'name': 'First',
    },
    {
      'name': 'Second',
    },
    {
      'name': 'Third',
    }
  ]
  render() {
    return (
      <SwiperTabComponent position={'top'} tabs={tabs}>
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
}
```

## License

MIT © [nachi0310](https://github.com/nachi0310)
