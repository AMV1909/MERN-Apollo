import { useState } from "react";
import { useMutation } from "@apollo/client";
import { AiOutlineDelete } from "react-icons/ai";
import { BiCheck, BiX } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosRadioButtonOff } from "react-icons/io";

import { CHANGE_STATE_TASK, DELETE_TASK } from "../../graphql/Tasks";

export function TaskCard({ task: { _id, title, state } }) {
    const [checked, setChecked] = useState(state);
    const [confirm, setConfirm] = useState(false);

    const [changeStateTask] = useMutation(CHANGE_STATE_TASK, {
        refetchQueries: ["getProject"],
    });

    const [deleteTask] = useMutation(DELETE_TASK, {
        refetchQueries: ["getProject"],
    });

    const handleChangeState = () => {
        setChecked(!checked);

        changeStateTask({
            variables: {
                id: _id,
                state: !checked,
            },
        });
    };

    const handleDelete = () => {
        deleteTask({
            variables: {
                id: _id,
            },
        });
    };

    return (
        <div className="flex">
            <div className="bg-zinc-800 w-full rounded-lg shadow-lg shadow-black p-4 mb-2 hover:bg-zinc-700 flex justify-between">
                <h1 className={`text-sm ${checked ? ("line-through text-gray-400"):("")}`}>{title}</h1>
                {confirm ? (
                    <button className="flex space-x-4">
                        <BiCheck
                            className="hover:text-green-500"
                            size={20}
                            onClick={() => {
                                setConfirm(false);
                                handleDelete();
                            }}
                        />
                        <BiX
                            className="hover:text-red-500"
                            size={20}
                            onClick={() => setConfirm(false)}
                        />
                    </button>
                ) : (
                    <button onClick={() => setConfirm(true)}>
                        <AiOutlineDelete className="hover:text-red-500" />
                    </button>
                )}
            </div>
            <div className="flex items-center mb-2 ml-5">
                {checked ? (
                    <AiOutlineCheckCircle
                        className="text-white cursor-pointer"
                        size={30}
                        onClick={() => handleChangeState()}
                    />
                ) : (
                    <IoIosRadioButtonOff
                        className="text-white cursor-pointer"
                        size={30}
                        onClick={() => handleChangeState()}
                    />
                )}
            </div>
        </div>
    );
}
