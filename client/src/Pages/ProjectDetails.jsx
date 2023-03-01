import { useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-hot-toast";

import { GET_PROJECT } from "../graphql/Projects";
import { DELETE_PROJECT } from "../graphql/Projects";
import { TaskForm } from "../Components/Tasks/TaskForm";
import { TasksList } from "../Components/Tasks/TasksList";

export function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        loading,
        error,
        data: { project: { name, description, tasks } = {} } = {},
    } = useQuery(GET_PROJECT, {
        variables: { id },
    });

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        refetchQueries: ["getProjects"],
    });

    const handleDelete = () => {
        toast(
            (t) => (
                <div className="my-5">
                    <p className="text-center mb-5">
                        Are you sure you want to delete this project?
                    </p>
                    <div className="flex justify-between mx-16">
                        <button
                            className="bg-red-500 hover:bg-red-600 font-bold py-2 px-4 rounded"
                            onClick={() => {
                                deleteProject({ variables: { id } });
                                navigate("/projects");
                                toast.dismiss(t.id);
                            }}
                        >
                            Delete
                        </button>
                        <button
                            className="bg-green-500 hover:bg-green-600 font-bold py-2 px-4 rounded"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ),
            {
                duration: Infinity,
                style: {
                    background: "#101010",
                    color: "#FFFFFF",
                },
            }
        );
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error {error.message}</p>;

    return (
        <div className="bg-zinc-900 rounded-lg shadow-lg shadow-black p-8 w-3/5 max-w-5xl">
            <div className="mb-2 flex justify-between">
                <button
                    className="w-28 p-2 hover:underline flex justify-between"
                    onClick={() => navigate("/projects")}
                >
                    <BsArrowLeft className="my-0.5" size={20} />
                    Go Back
                </button>
                <div>
                    <h1 className="text-2xl text-center">{name}</h1>
                    <p className="text-center">{description}</p>
                </div>
                <button
                    className="w-24 p-2 hover:underline hover:text-red-500 flex justify-between"
                    onClick={() => handleDelete()}
                >
                    Delete
                    <AiOutlineDelete className="my-0.5" size={20} />
                </button>
            </div>

            <div className="w-full flex justify-center py-10">
                <TaskForm />
                <TasksList tasks={tasks} />
            </div>
        </div>
    );
}
