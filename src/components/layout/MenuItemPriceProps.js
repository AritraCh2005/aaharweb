"use client"

import { useState } from "react"
import Plus from "../icons/Plus"
import Trash from "../icons/Trash"
import ChevronDown from "../icons/ChevronDown"
import ChevronUp from "../icons/ChevronUp"

export default function MenuItemPriceProps({ name, addLabel, props, setProps }) {
  const [isOpen, setIsOpen] = useState(false)

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }]
    })
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove))
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value
    setProps((prevSizes) => {
      const newSizes = [...prevSizes]
      newSizes[index][prop] = newValue
      return newSizes
    })
  }

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between p-4 text-left font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        type="button"
      >
        <div className="flex items-center gap-2">
          {isOpen ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-primary" />}
          <span>{name}</span>
        </div>
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
          {props?.length || 0}
        </span>
      </button>

      <div className={`px-4 pb-4 ${isOpen ? "block" : "hidden"}`}>
        <div className="space-y-4 mt-2">
          {props?.length > 0 &&
            props.map((size, index) => (
              <div
                className="grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-3 items-end bg-white p-3 rounded-lg border border-gray-200"
                key={index}
              >
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                  <input
                    type="text"
                    placeholder={`${name.slice(0, -1)} name`}
                    value={size.name}
                    onChange={(ev) => editProp(ev, index, "name")}
                    className="text-gray-800 border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Extra price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={size.price}
                      onChange={(ev) => editProp(ev, index, "price")}
                      className="text-gray-800 border border-gray-300 p-2 pl-8 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => removeProp(index)}
                    className="bg-white p-2 rounded-lg border border-gray-300 hover:bg-red-50 hover:border-red-200 transition-colors group"
                    title="Remove item"
                  >
                    <Trash className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
                  </button>
                </div>
              </div>
            ))}

          <button
            type="button"
            onClick={addProp}
            className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium mt-4 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>{addLabel}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
