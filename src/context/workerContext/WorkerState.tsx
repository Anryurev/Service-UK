import React, {useState} from "react";
import {WorkerContext} from "./WorkerContext";
import {IWorkers} from "../../models";

interface IExecutorState{
    children: React.ReactNode
}

export const WorkerState = ({children}: IExecutorState) => {

    const [worker, setWorker] = useState<IWorkers | null>(null)

    return (

        <WorkerContext.Provider value={{
            worker, setWorker
        }}>
            {children}
        </WorkerContext.Provider>
    )
}