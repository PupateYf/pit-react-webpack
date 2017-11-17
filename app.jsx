import React from 'react'
import {render} from 'react-dom'

const mountNode = document.getElementById('app')

class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}
      </div>
    )
  }
}

render(
  <HelloMessage name="Guys" />,
  mountNode
)