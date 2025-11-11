import { useState, useEffect } from "react"





const useTasks = () => {
    const [tasks, setTasks] = useState(
        [
          {
            id: 1,
            text: "Task 1",
            describe: "Description 1",
            done: false, 
            callTime: null
          }
        ]
    )

    const [selectedTask, setSelectedTask] = useState(tasks[0])

    const [filteredTasks, setFilteredTasks] = useState(tasks)

    const AddTask = () => {
        const nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1
        const newTask = { id: nextId, text: `Task ${nextId}`, describe: `Description ${nextId}`, done: false, callTime: null }
        setTasks(prev => [...prev, newTask])
        setSelectedTask(newTask)
        console.log("added task")
    }


    const DeleteAllTask = () => {
        setTasks([])
        setSelectedTask(null)

        console.log("deleted task")
    }

    const UpdateTask = () => {
        setTasks(tasks.map((task) => task.id === tasks.length ? {...task, done: !task.done} : task))
        console.log("updated task")
    }

    const SaveTaskEdit = () => {
        setTasks(tasks.map((t) => t.id === selectedTask.id ? {...t, text: selectedTask.text, describe: selectedTask.describe, callTime: selectedTask.callTime} : t))
    }

    useEffect(() => setFilteredTasks(tasks), [tasks])

    return {
        AddTask,
        DeleteAllTask,
        UpdateTask, 
        SaveTaskEdit,
        tasks, setTasks,
        selectedTask, setSelectedTask,
        filteredTasks, setFilteredTasks
    }
}

export default useTasks