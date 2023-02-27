import { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_PROJECT } from "../../graphql/Projects";

export function ProjectForm() {
    const [createProject, { loading, error: message }] = useMutation(CREATE_PROJECT, {
        refetchQueries: ["getProjects"],
    });

    const [project, setProject] = useState({
        name: "",
        description: "",
    });

    const onChange = ({ target: { name, value } }) => {
        setProject({
            ...project,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        createProject({
            variables: {
                name: project.name,
                description: project.description,
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-2/5">
            {message && <p>{message}</p>}

            <input
                className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
                type="text"
                name="name"
                placeholder="Write the name of the project"
                onChange={onChange}
            />
            <textarea
                className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
                name="description"
                rows="3"
                placeholder="Write the description of the project (optional)"
                onChange={onChange}
            ></textarea>
            <div className="w-full flex justify-center">
                <button
                    className="bg-blue-500 px-4 py-1 rounded-md text-lg mb-3 disabled:bg-zinc-400"
                    disabled={!project.name || loading}
                >
                    Save
                </button>
            </div>
        </form>
    );
}
