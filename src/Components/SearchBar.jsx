import { useState } from "react"
import { BsSearch } from "react-icons/bs"
import {useGlobalColorContext} from "../Contexts/GlobalColorContext"

export default function SearchBar({ onSearch, tasks }) {
  const [searchTerm, setSearchTerm] = useState("")

  const {colorsComponent} = useGlobalColorContext()

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    if (onSearch) onSearch(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) onSearch(searchTerm)
  }




  return (
    <form
      onSubmit={handleSubmit}
      style={{borderColor: colorsComponent.Border, backgroundColor: colorsComponent.TextIO}}
      className="flex items-center gap-2 border-2 border-double rounded-md px-2 py-1 w-72 h-10 shadow-sm"
    >
      <BsSearch className="text-lg" style={{color: colorsComponent.Text}} />
      <input
        type="text"
        disabled={tasks.length === 0}
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        style={{color: colorsComponent.Text}}
        className="flex-1 outline-none placeholder-gray-400 bg-transparent"
      />
    </form>
  )
}
