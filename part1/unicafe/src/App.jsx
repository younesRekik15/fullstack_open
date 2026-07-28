import { useState } from 'react'

const Button = ({onClick, text}) =>{
  return (
    <button onClick = {onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) =>{
  
      return (
        <p>{text} {value}{text=='positive'?'%':''}</p>
      )
  
}

const Statistics = (props) => {
  if(props.good == 0 && props.bad == 0 && props.neutral == 0){
    return(
      <p>No feedback given</p>
    )
  }else{
    return(
      <>
        <StatisticLine text='good' value = {props.good}/>
        <StatisticLine text='neutral' value = {props.neutral}/>
        <StatisticLine text='bad' value = {props.bad}/>
        <StatisticLine text='all' value = {props.all} />
        <StatisticLine text='average' value = { props.average } />
        <StatisticLine text = 'positive' value = {props.positive} />    
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={()=>{setGood(good + 1)}} text = 'good'/>
      <Button onClick={()=>{setNeutral(neutral + 1)}} text = 'neutral'/>
      <Button onClick={()=>{setBad(bad + 1)}} text = 'bad'/>
      <h1>statistics</h1>
      <Statistics
        good = {good}
        neutral = {neutral}
        bad = {bad}
        all = {good + bad + neutral}
        average = {(good+neutral+bad)==0?0:(good - bad)/(good + neutral + bad)}
        positive = {good == 0 ?0:(good * 100) / (good + neutral + bad)}
        
      />
      

    </div>
  )
}

export default App