import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <>
      <Part name={props.courses.part1} exercises={props.exercises.exercises1} />
      <Part name={props.courses.part2} exercises={props.exercises.exercises2} />
      <Part name={props.courses.part3} exercises={props.exercises.exercises3} />
    </>
  )
}

const Part = (props) => {
  return <p>{props.name} {props.exercises}</p>
}

const Total = (props) => {
  return <p>Number of exercises {props.exercises.exercises1 + props.exercises.exercises2 + props.exercises.exercises3}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content courses={{ part1, part2, part3 }} exercises={{ exercises1, exercises2, exercises3 }} />
      <Total exercises={{ exercises1, exercises2, exercises3 }} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
