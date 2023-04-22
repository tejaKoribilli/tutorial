// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {timeLimit: 25, hours: 25, seconds: 0, isTimerStarted: false}

  componentDidMount() {}

  componentWillUnmount() {
    console.log('componentWillUnmount called')
  }

  increaseTimeLimit = () => {
    const {isTimerStarted} = this.state

    if (!isTimerStarted) {
      this.setState(prevState => ({
        timeLimit: prevState.timeLimit + 1,
      }))
      this.setState(prevState => ({hours: prevState.timeLimit}))
    }
  }

  decreaseTimeLimit = () => {
    const {isTimerStarted} = this.state

    if (!isTimerStarted) {
      this.setState(prevState => ({
        timeLimit: prevState.timeLimit - 1,
      }))
      this.setState(prevState => ({hours: prevState.timeLimit}))
    }
  }

  startBtn = () => {
    this.timerID = setInterval(this.stopWatch, 1000)

    this.setState(prevState => ({
      isTimerStarted: !prevState.isTimerStarted,
    }))
  }

  PauseBtn = () => {
    clearInterval(this.timerID)
    this.setState(prevState => ({
      isTimerStarted: !prevState.isTimerStarted,
    }))
  }

  onreset = () => {
    clearInterval(this.timerID)
    this.setState({timeLimit: 25, hours: 25, seconds: 0, isTimerStarted: false})
  }

  stopWatch = () => {
    const {seconds} = this.state

    if (seconds === 0) {
      this.setState(prevState => ({
        hours: prevState.hours - 1,
        seconds: 59,
      }))
    } else {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1,
      }))
    }
  }

  render() {
    const {timeLimit, hours, seconds, isTimerStarted} = this.state
    const startOrPauseAltText = isTimerStarted ? 'pause icon' : 'play icon'
    const secondsString = seconds > 9 ? seconds : `0${seconds}`
    const hoursString = hours > 9 ? hours : `0${hours}`
    const imgUrl = isTimerStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="bottom-container">
          <div className="clock-bg-container">
            <div className="clock-container">
              <h1 className="time">
                {hoursString}:{secondsString}
              </h1>
              <p className="running">{isTimerStarted ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="main-container">
            <div className="start-reset-container">
              <button
                type="button"
                className="icon-button"
                onClick={isTimerStarted ? this.PauseBtn : this.startBtn}
              >
                <img
                  alt={startOrPauseAltText}
                  className="play-icon"
                  src={imgUrl}
                />
                <p className="start-pause">
                  {isTimerStarted ? 'Pause' : 'Start'}
                </p>
              </button>

              <button
                type="button"
                className="icon-button"
                onClick={this.onreset}
              >
                <img
                  alt="reset icon"
                  className="play-icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                />
              </button>
              <p className="start-reset">Reset</p>
            </div>
            <p className="set-timer-limit">Set Timer limit</p>
            <div className="set-time-container">
              <button
                type="button"
                className="minus-plus"
                onClick={this.decreaseTimeLimit}
              >
                -
              </button>
              <p className="set-time">{timeLimit}</p>
              <button
                type="button"
                className="minus-plus"
                onClick={this.increaseTimeLimit}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
