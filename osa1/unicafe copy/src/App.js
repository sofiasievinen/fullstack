import { useState } from 'react'

const Header = () => {
  return (
    <h1>Give feedback here</h1>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick = {handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad === 0) {
    return (
      <div>
        <h2>No feedback given</h2>
      </div>
    )
  }

  var average = (good+neutral+bad)/3
  var percent = (good/(good+neutral+bad))*100

  return (
    <div>
      <h2>Statistics</h2>
      <table>
      <StatisticLine text = "good" value = {good}/>
      <StatisticLine text = "neutral" value = {neutral}/>
      <StatisticLine text = "bad" value = {bad}/>
      <StatisticLine text = "average" value = {average}/>
      <StatisticLine text = "positive" value = {percent} sign = "%"/>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value, sign}) => {
  return (
    <tbody>
      <tr>
      <td>{text}</td>
      <td>{value} {sign}</td>
    </tr>
    </tbody>
  )
}



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    console.log('good value now', good+1)
    setGood(good+1)
  }

  const handleNeutral = () => {
    console.log('neutral value now', neutral+1)
    setNeutral(neutral+1)
  }

  const handleBad = () => {
    console.log('bad value now', bad+1)
    setBad(bad+1)
  }

  return (
    <div>
      <Header/>
      <Button handleClick = {handleGood} text="good"/>
      <Button handleClick = {handleNeutral} text="neutral"/>
      <Button handleClick = {handleBad} text="bad"/>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App