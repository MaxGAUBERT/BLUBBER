import { useState } from "react"






const useModals = () => {
    const [showEditWindow, setShowEditWindow] = useState(false)

    return {showEditWindow, setShowEditWindow}
}

export default useModals;