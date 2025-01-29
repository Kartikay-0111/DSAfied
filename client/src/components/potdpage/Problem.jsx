import React, { useEffect, useState } from "react";
import { BookmarkPlus, Check, X } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";

const Problem = ({ problemId, onSolve }) => {
    const [problem, setProblem] = useState(null);
    const [isSolved, setIsSolved] = useState(false);
    const [note, setNote] = useState("");
    const { user, getAccessTokenSilently } = useAuth0();
    
    useEffect(() => {
        const fetchProblem = async () => {
            const token = await getAccessTokenSilently();
            try {
                // Fetch problem details
                const response = await fetch(`http://localhost:3000/api/problem/${problemId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setProblem(data);

                // Fetch solved status
                const solvedResponse = await fetch(
                    `http://localhost:3000/api/userproblem/?auth0Id=${user.sub}&problemId=${problemId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );
                const solvedData = await solvedResponse.json();
                setIsSolved(solvedData.solved);
            } catch (error) {
                console.error("Error fetching problem data:", error);
            }
        };
        fetchProblem();
    }, [problemId, user.sub, getAccessTokenSilently]);

    const handleSolvedToggle = async () => {
        const token = await getAccessTokenSilently();
        try {
            const response = await fetch(`http://localhost:3000/api/problem/toggleSolved`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    auth0Id: user.sub,
                    problemId,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update solved status");
            }

            setIsSolved(!isSolved);
            onSolve();
        } catch (error) {
            console.error("Error toggling solved status:", error);
        }
    };

    const handleAddNote = async () => {
        await fetchNote();
        document.getElementById("problem_note_modal").showModal();
    };

    const fetchNote = async () => {
        const token = await getAccessTokenSilently();
        try {
            const response = await fetch(
                `http://localhost:3000/api/problem/note?auth0Id=${user.sub}&problemId=${problemId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch note");
            }

            const data = await response.json();
            setNote(data.note || "");
        } catch (error) {
            console.error("Error fetching note:", error);
        }
    };

    const saveNote = async () => {
        if (!note.trim()) {
            alert("Note cannot be empty!");
            return;
        }

        const token = await getAccessTokenSilently();
        try {
            const response = await fetch(`http://localhost:3000/api/problem/note`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    auth0Id: user.sub,
                    problemId,
                    note,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save note");
            }

            alert("Note saved successfully!");
            document.getElementById("problem_note_modal").close();
        } catch (error) {
            console.error("Error saving note:", error);
            alert("Failed to save note");
        }
    };

    if (!problem) {
        return <div className="animate-pulse">Loading...</div>;
    }

    return (
        <>
            <div className="flex lg:flex-row flex-col p-6 rounded-md border border-orange-400 md:w-4/5 mx-auto w-full mb-2">
                <div className="flex items-center mr-3">
                    <button
                        onClick={handleSolvedToggle}
                        className={`btn btn-circle btn-sm ${isSolved ? 'btn-success' : 'btn-error'
                            }`}
                    >
                        {isSolved ? <Check size={16} /> : <X size={16} />}
                    </button>
                </div>
                <div className="flex flex-col basis-8/12">
                    <span className="font-medium text-lg text-orange-900">
                        {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
                    </span>
                    <p className="mt-2 text-xl font-extrabold">{problem.title}</p>
                    <span className="text-sm italic text-gray-500 mt-1">{problem.topicTags}</span>
                </div>
                <div className="flex flex-row justify-center basis-3/12">
                    <div className="flex flex-col">
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => window.open(`https://leetcode.com/problems/${problem.titleSlug}/description/`, '_blank')}
                        >
                            {isSolved ? "Solved" : "Solve"}
                        </button>
                        <div className="flex flex-row justify-center mt-4 mb-4">
                            <span className="lg:tooltip pr-1 border-r" data-tip="difficulty">
                                {problem.difficulty}
                            </span>
                            <span className="lg:tooltip pr-1 pl-1 border-r" data-tip="submissions">
                                {Math.round(problem.popularity)}K
                            </span>
                            <span className="lg:tooltip pl-1" data-tip="Accuracy">
                                {problem.acRate.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </div>
                <div className="basis-1/12 flex lg:flex-col gap-2 sm:mx-auto lg:mx-0">
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={handleAddNote}
                    >
                        <BookmarkPlus />
                    </button>
                    <div className="dropdown dropdown-right">
                        <div tabIndex={0} role="button" className="btn btn-info btn-sm">
                            More
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-black rounded-box z-[1] w-52 p-2 shadow">
                            <li><a>Challenge</a></li>
                            <li><a>Ask Doubt</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Note Modal */}
            <dialog id="problem_note_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Add Note</h3>
                    <textarea
                        className="textarea textarea-bordered w-full h-48 mt-4"
                        placeholder="Add your notes here..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={saveNote}>Save</button>
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

const DailyProblems = ({ problemIds, onSolve }) => {
    return (
        <div>
            {problemIds.map((problem) => (
                <Problem
                    key={problem._id}
                    problemId={problem._id}
                    onSolve={onSolve}
                />
            ))}
        </div>
    );
};
export default DailyProblems;