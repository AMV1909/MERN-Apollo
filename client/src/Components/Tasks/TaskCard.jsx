import { useMutation } from "@apollo/client";
import { AiOutlineDelete } from "react-icons/ai";

import { DELETE_TASK } from "../../graphql/Tasks";

export function TaskCard({ task: { _id, title } }) {
    const [deleteTask] = useMutation(DELETE_TASK, {
        refetchQueries: ["getProject"],
    });

    const handleDelete = () => {
        deleteTask({
            variables: {
                id: _id,
            },
        });
    };

    return (
        <div className="bg-zinc-800 w-full rounded-lg shadow-lg shadow-black p-4 mb-2 hover:bg-zinc-700 flex justify-between">
            <h1 className="text-sm">{title}</h1>
            <button onClick={() => handleDelete()}>
                <AiOutlineDelete />
            </button>
        </div>
    );
}
