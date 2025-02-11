import React from 'react'

const Platformcard = ({logo,problems,rating}) => {
    // console.log(logo)
    return (
        <div className="flex items-center justify-center bg-base-200 p-4 rounded-lg space-x-4 w-full">
            {/* Left section */}
            <div className="flex-1 flex flex-col items-center border-r border-gray-700">
                <span className="text-gray-400 text-sm">Total problems solved</span>
                <span className="text-white text-3xl font-bold">{problems}</span>
            </div>

            {/* Center icon */}
            <div className="flex items-center justify-center rounded-full p-6 border border-gray-700">
                <img src={`${logo}`} />
            </div>

            {/* Right section */}
            <div className="flex-1 flex flex-col items-center border-l border-gray-700">
                <span className="text-gray-400 text-sm">Max Rating</span>
                <span className="text-white text-3xl font-bold">{rating}</span>
            </div>
        </div>

    )
}

export default Platformcard