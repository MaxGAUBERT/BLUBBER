import { useState, useEffect } from "react"

export default function useTasks() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Task 1",
      describe: "Description 1",
      done: false,
      callTime: null,
    },
  ])

  const [selectedTask, setSelectedTask] = useState(tasks[0])
  const [filteredTasks, setFilteredTasks] = useState(tasks)
  const [sortedTasks, setSortedTasks] = useState(tasks)
  const [showEditWindow, setShowEditWindow] = useState(false)

  // --- Gestion des tâches ---
  const AddTask = () => {
    const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1
    const newTask = {
      id: nextId,
      text: `Task ${nextId}`,
      describe: `Description ${nextId}`,
      done: false,
      callTime: null,
    }
    setTasks((prev) => [...prev, newTask])
    setSelectedTask(newTask)
  }

  const DeleteAllTask = () => {
    setTasks([])
    setSelectedTask(null)
  }

  const UpdateTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  const SaveTaskEdit = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === selectedTask.id
          ? {
              ...t,
              text: selectedTask.text,
              describe: selectedTask.describe,
              callTime: selectedTask.callTime,
            }
          : t
      )
    )
  }

  // --- Filtrage ---
  const handleSearch = (query) => {
    if (!query) {
      setFilteredTasks(tasks)
      return
    }
    const q = query.toLowerCase()
    const filtered = tasks.filter(
      (t) =>
        t.text.toLowerCase().includes(q) ||
        (t.describe && t.describe.toLowerCase().includes(q))
    )
    setFilteredTasks(filtered)
  }

  // --- Tri ---
  const handleSort = (order) => {
    const base = [...filteredTasks]
    const sorted = base.sort((a, b) => {
      const dateA = a.callTime ? new Date(a.callTime).getTime() : 0
      const dateB = b.callTime ? new Date(b.callTime).getTime() : 0
      return order === "asc" ? dateA - dateB : dateB - dateA
    })
    setSortedTasks(sorted)
  }

  // --- Synchronisation automatique ---
  useEffect(() => {
    setFilteredTasks(tasks)
    setSortedTasks(tasks)
  }, [tasks])

  return {
    // états principaux
    tasks,
    setTasks,
    selectedTask,
    setSelectedTask,
    filteredTasks,
    sortedTasks,
    showEditWindow,
    setShowEditWindow,

    // actions
    AddTask,
    DeleteAllTask,
    UpdateTask,
    SaveTaskEdit,
    handleSearch,
    handleSort,
  }
}
