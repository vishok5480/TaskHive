import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { updateTask } from '../../redux/slices/taskSlice';

const EditTaskPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const task = useSelector((state) => state.tasks.tasks.find(task => task.id === id));
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateTask({ id, updatedTask: { title, description } }));
        router.push('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
                required
            />
            <button type="submit">Update Task</button>
        </form>
    );
};

export default EditTaskPage;
