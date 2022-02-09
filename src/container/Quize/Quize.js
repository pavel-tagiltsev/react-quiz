import { Component } from "react"
import classes from './Quize.module.css'

class Quize extends Component {
  state = {
    quiz: []
  }

  render() {
    return (
      <div className={classes.Quize}>
        <h1>Quize</h1>
      </div>
    )  
  }
}

export default Quize;