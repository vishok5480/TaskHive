const TaskCard = ({ task }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
    </div>
  );
};

export default TaskCard; 