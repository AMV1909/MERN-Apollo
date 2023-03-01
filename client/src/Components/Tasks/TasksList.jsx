import { TaskCard } from "./TaskCard";

export function TasksList({ tasks }) {
    console.log(tasks);

    return (
        <div
            className="w-full px-10 overflow-y-auto"
            style={{ height: "300px" }}
        >
            {tasks.length > 0 ? (
                tasks.map((task) => <TaskCard key={task._id} task={task} />)
            ) : (
                <p className="text-center text-white">No tasks yet</p>
            )}
        </div>
    );
}
