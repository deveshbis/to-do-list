import { useState } from "react";

const TaskList = () => {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]); 
    const [selectedTasks, setSelectedTasks] = useState([]); 

    const handleSubmit = (e) => {
        e.preventDefault();
        setTasks([...tasks, { id: Date.now(), name: task }]); 
        setTask(''); 
    };

    const handleDeleteSingle = (id) => {
        setTasks(tasks.filter(task => task.id !== id)); 
    };

    const handleDeleteSelected = () => {
        setTasks(tasks.filter(task => !selectedTasks.includes(task.id)));
        setSelectedTasks([]); 
    };

    const toggleSelectTask = (id) => {
        if (selectedTasks.includes(id)) {
            setSelectedTasks(selectedTasks.filter(selectedId => selectedId !== id));
        } else {
            setSelectedTasks([...selectedTasks, id]);
        }
    };

    return (
        <div className="overflow-x-auto font-[sans-serif] mt-10">
            <form onSubmit={handleSubmit} className="space-y-4 font-[sans-serif] max-w-md mx-auto">
                <input
                    type="text"
                    value={task}
                    name="task"
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter Task"
                    className="px-4 py-3 bg-gray-100 w-full text-sm outline-none border-b-2 border-blue-500 rounded"
                />
                <button
                    type="submit"
                    className="!mt-8 w-full px-4 py-2.5 mx-auto block text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Add Task
                </button>
            </form>
            {tasks.length > 0 && (
                <div>
                    <table className="min-w-full bg-white mt-5">
                        <thead className="bg-gray-700 whitespace-nowrap">
                            <tr>
                                <th className="pl-4 w-8">
                                    <input
                                        id="selectAll"
                                        type="checkbox"
                                        checked={selectedTasks.length === tasks.length}
                                        onChange={(e) =>
                                            setSelectedTasks(
                                                e.target.checked ? tasks.map(task => task.id) : []
                                            )
                                        }
                                        className="hidden peer"
                                    />
                                    <label
                                        htmlFor="selectAll"
                                        className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-gray-50 w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
                                    ></label>
                                </th>
                                <th className="p-4 text-left text-sm font-medium text-white">Task Name</th>
                                <th className="p-4 text-left text-sm font-medium text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="whitespace-nowrap">
                            {tasks.map((task) => (
                                <tr key={task.id} className="even:bg-blue-50">
                                    <td className="pl-4 w-8">
                                        <input
                                            id={`checkbox-${task.id}`}
                                            type="checkbox"
                                            checked={selectedTasks.includes(task.id)}
                                            onChange={() => toggleSelectTask(task.id)}
                                            className="hidden peer"
                                        />
                                        <label
                                            htmlFor={`checkbox-${task.id}`}
                                            className="relative flex items-center justify-center p-0.5 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-gray-50 w-5 h-5 cursor-pointer bg-blue-500 border border-gray-400 rounded overflow-hidden"
                                        ></label>
                                    </td>
                                    <td className="p-4 text-sm">{task.name}</td>
                                    <td className="p-4">
                                        <button
                                            className="mr-4 text-blue-500 hover:text-blue-700"
                                            onClick={() => handleDeleteSingle(task.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        onClick={handleDeleteSelected}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        disabled={selectedTasks.length === 0}
                    >
                        Delete Selected All Task
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskList;
