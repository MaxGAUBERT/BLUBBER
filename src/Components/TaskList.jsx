import  { useGlobalColorContext } from "../Contexts/GlobalColorContext";



export default function TaskList({tasks, setTasks, showEditWindow, setShowEditWindow, setSelectedTask}) {

    const {colorsComponent} = useGlobalColorContext()
    return (
        <div className="space-y-4" style={{backgroundColor: colorsComponent.Background, justifyContent: "flex-start"}}>
            {tasks.map((task) => {
                return <div key={task.id}>
                    <label>
                        {task.text}
                    </label>
                

                    <input type="checkbox" checked={task.done} onChange={() => {
                        setTasks(tasks.map((t) => t.id === task.id ? {...t, done: !t.done} : t))
                    }
                    }/>

                    <p>
                        {task.callTime || "No remind defined !"}
                    </p>

                    <button style={{marginTop: "5px", marginLeft: 5}} onClick={() => {setShowEditWindow(!showEditWindow); setSelectedTask(task)}}>
                        Edit
                    </button>

                    <button style={{marginTop: "5px", marginLeft: 5}} onClick={() => {
                        setTasks(tasks.filter((t) => t.id !== task.id))
                    }}>Delete</button>

                    <br></br>
                    <p>
                        {task.describe}
                    </p>


                </div>
            })}

        </div>
    )
}