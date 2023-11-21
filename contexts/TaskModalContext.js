import { createContext, useState } from "react";

export const TaskModalContext = createContext(null)

const TaskModalContextProvider = (props) => {
    const [addTaskModalOpen, setAddTaskModalOpen] = useState(false)
    const contextValue = {addTaskModalOpen, setAddTaskModalOpen}

    return (
        <TaskModalContext.Provider value={contextValue}>
            {props.children}
        </TaskModalContext.Provider>
    )
}

export default TaskModalContextProvider