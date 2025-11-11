





export default function ReminderPanel({selectedTask}){

    return (
        <div className="fixed inset-0 bg-[rgba(225,199,199,0.5)] flex items-center justify-center z-[1000] overflow-auto">
            <div className="bg-white p-5 border-4 border-black rounded-lg w-[800px] h-[400px] text-center shadow-lg border-double text-black">
                <p className="text-xl font-semibold mb-4">
                    {selectedTask.describe}
                </p>
            </div>
        </div>
    )
}