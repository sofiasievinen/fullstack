const Total = ({parts}) => {
    const sum = parts.reduce(function(sum, part) {
        return sum + part.exercises
    },0)
    return (
      <h4>
        Total of {sum} exercises
      </h4>
    )
  }

  export default Total