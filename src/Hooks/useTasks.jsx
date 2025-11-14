import { useState, useEffect } from "react"

export default function useTasks() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1", describe: "Description 1", done: false, callTime: null },
  ])

  const [savedTasks, setSavedTasks] = useState("")

  const [selectedTask, setSelectedTask] = useState(tasks[0])
  const [showEditWindow, setShowEditWindow] = useState(false)
  const [displayedTasks, setDisplayedTasks] = useState(tasks)
  const [sortOrder, setSortOrder] = useState(null)

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


  // --- Recherche ---
  const handleSearch = (query) => {
    const q = query?.toLowerCase() || ""
    const filtered = tasks.filter(
      (t) =>
        t.text.toLowerCase().includes(q) ||
        (t.describe && t.describe.toLowerCase().includes(q))
    )
    applySort(filtered, sortOrder)
  }

  // --- Tri ---
  const applySort = (list, order) => {
    if (!order) {
      setDisplayedTasks(list)
      return
    }
    const sorted = [...list].sort((a, b) => {
      const dateA = a.callTime ? new Date(a.callTime).getTime() : 0
      const dateB = b.callTime ? new Date(b.callTime).getTime() : 0
      return order === "asc" ? dateA - dateB : dateB - dateA
    })
    setDisplayedTasks(sorted)
  }

  const handleSort = (order) => {
    setSortOrder(order)
    applySort(displayedTasks, order)
  }

  // --- Sync global ---
  useEffect(() => {
    applySort(tasks, sortOrder)
  }, [tasks])

  const SaveTasksToFile = () => {
    if (!tasks) return
    const blob = new Blob([JSON.stringify(tasks, null, 2)], {type: "application/json"})
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = savedTasks
    a.click()

    URL.revokeObjectURL(url)
  }

  const UploadTasks = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = (e) => {
    try {
      const json = JSON.parse(e.target.result)

      if (!Array.isArray(json)) {
        console.error("Invalid JSON: expected an array of tasks.")
        return
      }

      setTasks(json)
      console.log("Tasks uploaded:", json)

    } catch (err) {
      console.error("Invalid JSON file format.", err)
    }
  }

  reader.readAsText(file)
}


  return {
    tasks,
    setTasks,
    displayedTasks,
    selectedTask,
    setSelectedTask,
    handleSearch,
    handleSort,
    DeleteAllTask, 
    AddTask, 
    showEditWindow, 
    setShowEditWindow,
    SaveTaskEdit, 
    SaveTasksToFile,
    UploadTasks
  }
}
