import {createContext} from 'react'
import {IWorkers} from "../../models";

interface IWorkerContext{
    worker: IWorkers | null,
    setWorker: (worker: IWorkers | null) => void
}

export const WorkerContext = createContext<IWorkerContext | undefined>(undefined)