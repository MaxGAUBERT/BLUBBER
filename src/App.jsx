import TaskList from "./Components/TaskList"
import TaskManager from "./Components/TaskManager"
import useTasks from "./Hooks/useTasks"
import useModals from "./Hooks/useModals"
import SearchBar from "./Components/SearchBar"
import GlobalColorContextProvider from "./Contexts/GlobalColorContext"
import EditModal from "./Components/EditModal"
import useReminders from "./Hooks/useReminders"
import ReminderPanel from "./Components/ReminderPanel"
import { HiOutlineBellAlert } from "react-icons/hi2";

export default function App() {
  const {
    AddTask,
    DeleteAllTask,
    UpdateTask,
    SaveTaskEdit,
    tasks,
    setTasks,
    selectedTask,
    setSelectedTask,
    filteredTasks,
    setFilteredTasks,
  } = useTasks()

  const { showEditWindow, setShowEditWindow } = useModals()
  const hasReminder = useReminders(tasks)

  const handleSearch = (query) => {
    if (!query) {
      setFilteredTasks(tasks)
      return
    }
    const q = query.toLowerCase()
    const results = tasks.filter(
      (t) =>
        t.text.toLowerCase().includes(q) ||
        (t.describe && t.describe.toLowerCase().includes(q))
    )
    setFilteredTasks(results)
  }

  return (
    <GlobalColorContextProvider>
      <div className="relative font-['Roboto_Mono'] italic w-[100vw] h-[100vh] overflow-hidden bg-gray-800 text-white">
        <h1 className="absolute text-[30px] flex flex-row top-0 left-4 font-bold">
          BLUBBER <HiOutlineBellAlert className="ml-3 bg-green-400" color="red" size={30}/>
        </h1>
        <p className="absolute top-8">
            Advanced task manager
        </p>

        <div className="absolute flex flex-col p-2 bg-gray-700 overflow-auto w-[1000px] h-[700px] max-h-[800px] top-0 right-0 border-4 border-gray-500 border-double rounded">
          <div className="mt-2 ml-3">
            <SearchBar onSearch={handleSearch} tasks={tasks} />
          </div>
          
          <div className="relative ml-5">
            <TaskList
              tasks={filteredTasks}
              setTasks={setTasks}
              showEditWindow={showEditWindow}
              setShowEditWindow={setShowEditWindow}
              setSelectedTask={setSelectedTask}
          />
          </div>         
        </div>

        {showEditWindow && (
          <EditModal
            showEditWindow={showEditWindow}
            setShowEditWindow={setShowEditWindow}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            SaveTaskEdit={SaveTaskEdit}
          />
        )}

        {hasReminder && <ReminderPanel selectedTask={selectedTask}/>}

        <div className="fixed bottom-0">
          <TaskManager
            addTask={AddTask}
            UpdateTask={UpdateTask}
            DeleteAllTask={DeleteAllTask}
          />
        </div>
      </div>
    </GlobalColorContextProvider>
  )
}
