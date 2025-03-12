import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const TaskDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const task = useSelector((state) => state.tasks.tasks.find(task => task.id === id));

    if (!task) return <p>Task not found!</p>;

    return (
        <div>
            <h1>{task.title}</h1>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
        </div>
    );
};

export default TaskDetailPage;
