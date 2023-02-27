import { useQuery } from "@apollo/client";

import { GET_PROJECTS } from "../../graphql/Projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectList() {
    const {
        loading,
        error,
        data: { projects = [] } = {},
    } = useQuery(GET_PROJECTS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error {error.message}</p>;

    return (
        <div
            className="overflow-y-auto w-full px-5"
            style={{ height: "440px" }}
        >
            {projects.length > 0 ? (
                projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))
            ) : (
                <p className="text-center text-white">No projects yet</p>
            )}
        </div>
    );
}
