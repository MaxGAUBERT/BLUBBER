import { useGlobalColorContext } from "../Contexts/GlobalColorContext"
import useData from "../Hooks/useData"







export default function SaveSystem({showSaveModal, setShowSaveModal}){
    const {savedTasks, setSavedTasks } = useData()
    const {colorsComponent} = useGlobalColorContext()


    return (
        <div className="fixed inset-0 flex items-center justify-center z-[1200] overflow-auto">
            <div style={{backgroundColor: colorsComponent.Background, color: colorsComponent.Text, borderColor: colorsComponent.BorderModals}} className="p-5 border-4 rounded-lg w-[300px] h-[300px] shadow-lg border-double flex flex-col">
                <label className="block text-center">
                    Save tasks
                </label>

                <div className="mt-5">
                    <input type="text" placeholder="File name: " onChange={(e) => setSavedTasks(e.target.value)} value={savedTasks}></input>

                    <button onClick={() => setShowSaveModal(!showSaveModal)}>
                        Cancel
                    </button>
                </div>


            

            </div>
        </div>
)
}