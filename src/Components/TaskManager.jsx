
import { FaPlus } from 'react-icons/fa'
import { FaMinus} from 'react-icons/fa6'
import { FiSave } from "react-icons/fi"

export default function TaskManager({addTask, DeleteAllTask, UpdateTask}){

    return (
        <div>
            <button onClick={() => addTask()}><FaPlus/></button>
            <button onClick={() => DeleteAllTask()}><FaMinus/></button>
            <button onClick={() => UpdateTask()}><FiSave /></button>
        </div>
    )
}