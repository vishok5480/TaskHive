import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const TaskList = () => {
    const { tasks } = useSelector((state) => state.tasks);

    return (
        <div className="p-4">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="bg-gray-200 p-3 rounded-md mb-2"
                >
                    <h2 className="font-bold">{task.title}</h2>
                    <p>{task.description}</p>
                    <Link href={`/task/${task.id}`} className="text-blue-500">
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
