import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Projects } from "./Pages/Projects";
import { ProjectDetails } from "./Pages/ProjectDetails";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
});

export function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="w-full h-screen flex items-center justify-center">
                    <Routes>
                        <Route path="/" element={<Navigate to="/projects" />} />

                        <Route path="/projects" element={<Projects />} />
                        <Route
                            path="/projects/:id"
                            element={<ProjectDetails />}
                        />

                        <Route path="*" element={<h1>404</h1>} />
                    </Routes>

                    <ToastContainer />
                </div>
            </Router>
        </ApolloProvider>
    );
}
