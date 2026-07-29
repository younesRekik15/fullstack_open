const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <div>
    {parts.map(part =><Part key={part.id} part={part} />)}
  </div>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = (props) => <h4>total of {props.total} exercises</h4>

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
export default Course