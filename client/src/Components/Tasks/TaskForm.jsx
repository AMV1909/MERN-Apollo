import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

import { CREATE_TASK } from "../../graphql/Tasks";

export function TaskForm() {
    const { id } = useParams();

    const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
        refetchQueries: ["getProject"],
    });

    const [title, setTitle] = useState("");

    const onChange = ({ target: { value } }) => {
        setTitle(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        createTask({
            variables: {
                title,
                project: id,
            },
        });

        setTitle("");
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error {error.message}</p>;

    return (
        <div className="w-full px-10">
            <form onSubmit={handleSubmit}>
                <input
                    className="bg-zinc-800 text-white w-full p-2 pl-4 rounded-lg mb-2"
                    type="text"
                    name="title"
                    placeholder="Write the title of the task"
                    onChange={onChange}
                />
                <div className="w-full flex justify-center">
                    <button
                        className="bg-sky-900 text-white p-2 px-4 my-2 rounded-lg disabled:bg-zinc-400"
                        disabled={!title || loading}
                    >
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
}
