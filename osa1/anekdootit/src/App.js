import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h2>{text}</h2>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick = {handleClick}>
      {text}
    </button>
  )
}

const Votes = ({points, selected}) => {
  if (points[selected] == 1)
  return (
    <p>
    has {points[selected]} vote
  </p>
  )
  return (
    <p>
      has {points[selected]} votes
    </p>
  )
}

const Winner = ({winner}) => {
  return (
    <p>{winner}</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [points, setPoints] = useState(Array(7).fill(0))

  const [winner, setWinner] = useState("")

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * 6))
    console.log("number of new anecdote",selected)
  }

  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1   
    setPoints(copy)
    console.log(points)
    let win = points.indexOf(Math.max(...points))
    setWinner(anecdotes[win])
    console.log(winner)
  }

  return (
    <div>
      <Header text = "Anecdote of the day"/>
      {anecdotes[selected]}
      <br></br>
      <Votes points = {points} selected = {selected}/>
      <br></br>
      <Button handleClick={handleVote} text = "vote"/>
      <Button handleClick={handleNext} text = "next anecdote"/>
      <br></br>
      <Header text = "Anecdote with most votes"/>
      <Winner winner = {winner}/>
    </div>
  )
}

export default App