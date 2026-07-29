const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <div>
    {parts.map(part =><Part key={part.id} part={part} />)}
  </div>
)

const Course = ({ course }) => {
  return (
    <>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total
        total={ course.parts.reduce((p,c) => p+c.exercises,0)}
      />
    </>
  )
}

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = (props) => <h4>total of {props.total} exercises</h4>


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(
    <>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </>
  )
}

export default App

