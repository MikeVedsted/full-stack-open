const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises
  }, 0)
  return <p><strong>Total of {sum} exercises</strong></p>
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => parts.map(part => <Part key={part.id} part={part} />)

const Header = ({ name }) => <h1>{name}</h1>

const Course = ({ courses }) => {
  return courses.map((course) =>
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course
