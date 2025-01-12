import React from 'react'

const Problem = () => {
    return (
        <div className="flex lg:flex-row flex-col p-6 rounded-md border border-orange-400 md:w-4/5 mx-auto w-full">
            <label className="swap swap-flip text-2xl mr-3">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />

                <div className="swap-on">😈</div>
                <div className="swap-off">😇</div>
            </label>
            <div className="flex flex-col basis-8/12">
                <span className="font-medium text-lg text-orange-900">10 January</span>
                <p className="mt-2 text-xl font-extrabold">Count distinct elements in every window.</p>
                <p className="">Google</p>
            </div>
            <div className='flex flex-row justify-center basis-3/12'>
                <div className="flex flex-col">
                    <button className="btn btn-primary">Solve</button>
                    <div className='flex flex-row justify-center mt-4 mb-4'>
                        <span className="lg:tooltip pr-1 border-r" data-tip="difficulty">
                            Easy
                        </span>
                        <span className="lg:tooltip pr-1 pl-1 border-r" data-tip="submissions">
                            130K
                        </span>
                        <span className="lg:tooltip pl-1" data-tip="Accuracy">
                            70%
                        </span>
                    </div>
                </div>
            </div>
            <div className='basis-1/12 flex justify-center'>
                <div className="dropdown dropdown-right">
                    <div tabIndex={0} role="button" className="btn">More</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-black rounded-box z-[1] w-52 p-2 shadow">
                        <li><a>Challenge</a></li>
                        <li><a>Ask Doubt</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Problem
