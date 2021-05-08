interface TodoCounterProps {
  incompleted: number;
}

const TodoCounter: React.FC<TodoCounterProps> = ({ incompleted }) => {
  if (incompleted === 0) {
    return null;
  }

  return (
    <div className="todo-counter" style={{padding: '1rem 0'}}>You have {incompleted} todo{incompleted > 1 ? 's' : ''} to finish </div>
  );
};

export default TodoCounter;
