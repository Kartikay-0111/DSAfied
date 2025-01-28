// ProblemListing.jsx
import React, { useState, useEffect } from 'react';
import { Search, BookmarkPlus } from 'lucide-react';
import { Card, CardContent } from './ui-components';
import { useAuth0 } from '@auth0/auth0-react';

const ProblemsList = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [note, setNote] = useState("");
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const problemsPerPage = 50;
  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();
  // Simulated data loading
  useEffect(() => {
    const fetchProblems = async () => {
      const token = await getAccessTokenSilently();
      try {
        const response = await fetch(
          `http://localhost:3000/api/problem?page=${currentPage}&limit=${problemsPerPage}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Problems not found');
        }

        const data = await response.json();
        // console.log(data);
        setProblems(data.problems || []);
        setFilteredProblems(data.problems || []);
        setTotalPages(data.totalPages || 0); // Use totalPages from API response
      } catch (error) {
        console.error('Error fetching problems:', error.message);
      }
    };

    fetchProblems();
  }, [currentPage]);

  // Filter and sort problems
  useEffect(() => {
    let filtered = [...problems];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(problem =>
        problem.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply topic filters
    if (selectedTopics.length > 0) {
      filtered = filtered.filter(problem => {
        // Split topicTags into an array and trim each tag
        const topics = problem.topicTags.split(',').map(tag => tag.trim());
        return topics.some(tag => selectedTopics.includes(tag));
      });
    }

    // Apply difficulty filters
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter(problem =>
        selectedDifficulties.includes(problem.difficulty)
      );
    }

    // Apply solved/unsolved filter
    if (selectedStatus !== 'all') {
      const isSolved = selectedStatus === 'solved';
      filtered = filtered.filter(problem =>
        isSolved ? solvedProblems.has(problem._id) : !solvedProblems.has(problem._id)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'acceptance':
          return b.acRate - a.acRate;
        default:
          return 0;
      }
    });

    setFilteredProblems(filtered);
  }, [problems, searchQuery, selectedTopics, selectedDifficulties, selectedStatus, sortBy, solvedProblems]);

  // Get all unique topics from problems
  // const allTopics = [...new Set(problems.flatMap(p => p.topicTags))];
  const allTopics = [...new Set(
    problems.flatMap(problem => {
      problem.topicTags += ' ';
      return problem.topicTags.split(',').map(tag => tag.trim());
    })
  )];
  // console.log(allTopics)
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleSolvedToggle = (problemId) => {
    const toggleSolved = async () => {
    const token = await getAccessTokenSilently();
    const auth0Id = user.sub;
    // console.log(token)
    try {
      const response = await fetch(`http://localhost:3000/api/problem/toggleSolved`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          auth0Id,
          problemId,
          solved: !solvedProblems.has(problemId),
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed");
      }
      const data = await response.json();
    } 
    catch (error) {
      console.error(error);
    }
  }
  toggleSolved();

    setSolvedProblems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(problemId)) {
        newSet.delete(problemId);
      } else {
        newSet.add(problemId);
      }
      return newSet;
    });
  };

  const handleAddNote = (problemId) => {
    setSelectedProblemId(problemId);
    fetchNote(problemId);
    document.getElementById("my_modal_1").showModal(); // Open the modal
  };

  const saveNote = async () => {
    if (!note.trim() || !selectedProblemId) {
      alert("Note cannot be empty!");
      return;
    }
    const token = await getAccessTokenSilently();
    const auth0Id = user.sub;
    // console.log(token)
    try {
      const response = await fetch(`http://localhost:3000/api/problem/note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          auth0Id,
          problemId: selectedProblemId,
          note,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to save the note");
      }
  
      const data = await response.json();
      console.log("Note saved successfully:", data);
      alert("Note saved!");
      setNote(""); // Clear the note input
      document.getElementById("my_modal_1").close(); // Close the modal
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Failed to save the note. Please try again.");
    }
  };

  const fetchNote = async (problemId) => {
    const token = await getAccessTokenSilently();
    const auth0Id = user.sub;
    // console.log(auth0Id, problemId);
    try {
      const response = await fetch(`http://localhost:3000/api/problem/note?auth0Id=${auth0Id}&problemId=${problemId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the note");
      }

      const data = await response.json();
      // console.log("Note fetched successfully:", data);
      setNote(data.note || "");
    } catch (error) {
      console.error("Error fetching note:", error);
    }
  };

  const renderPaginationControls = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 rounded-md ${currentPage === i
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
        >
          {i}
        </button>
      );
    }
    return (
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
        >
          «
        </button>
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
        >
          ‹
        </button>
        {pages}
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
        >
          ›
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50"
        >
          »
        </button>
      </div>
    );
  };
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Filters Sidebar */}
      <div className="w-64 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <button
            className="text-sm btn btn-sm btn-error"
            onClick={() => {
              setSelectedTopics([]);
              setSelectedDifficulties([]);
              setSelectedStatus('all');
            }}
          >
            Clear All
          </button>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Status</h3>
          <select
            className="w-full bg-gray-800 rounded p-2"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Problems</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Difficulty</h3>
          {difficulties.map(difficulty => (
            <div key={difficulty} className="flex items-center mb-2">
              <div className="form-control flex flex-row">
                <input type="checkbox"
                  className="checkbox checkbox-accent"
                  checked={selectedDifficulties.includes(difficulty)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSelectedDifficulties(prev =>
                      checked
                        ? [...prev, difficulty]
                        : prev.filter(d => d !== difficulty)
                    );
                  }}
                />
                <label htmlFor={difficulty} className="cursor-pointer ml-2">
                  <span className="text-white">{difficulty}</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Topics Filter */}
        <div>
          <h3 className="font-semibold mb-2">Topics</h3>
          {allTopics.map(topic => (
            <div key={topic} className="flex items-center mb-2">
              <div className="form-control flex flex-row">
                <input type="checkbox"
                  className="checkbox checkbox-accent"
                  checked={selectedTopics.includes(topic)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setSelectedTopics(prev =>
                      checked ? [...prev, topic] : prev.filter(t => t !== topic)
                    );
                  }}
                />
                <label htmlFor={topic} className="ml-2 cursor-pointer">
                  <span className="text-l text-white">{topic}</span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="divider divider-primary lg:divider-horizontal"></div>
      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Search and Sort */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow pl-8"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2" />
            </label>
          </div>

          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <select
              className="bg-gray-800 rounded p-2"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="title">Title</option>
              <option value="difficulty">Difficulty</option>
              <option value="acceptance">Acceptance Rate</option>
            </select>
          </div>
        </div>

        {/* Problems List */}
        <div className="space-y-4 w-5/6 mx-auto">
          {filteredProblems.map(problem => (
            <Card key={problem._id} className="bg-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <input type="checkbox" className="checkbox checkbox-accent"
                      checked={solvedProblems.has(problem._id)}
                      onChange={() => handleSolvedToggle(problem._id)}
                    />
                    <div >
                      <h3 className="text-lg font-semibold">{problem.title}</h3>
                      <div className="flex gap-2 mt-1">
                        <span className={`text-sm px-2 py-1 rounded ${problem.difficulty === 'Easy' ? 'bg-green-600' :
                          problem.difficulty === 'Medium' ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`}>
                          {problem.difficulty}
                        </span>
                        <span className="text-sm text-gray-400">
                          Acceptance Rate: {problem.acRate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-row gap-4 justify-center items-center'>
                    <div className="flex gap-4">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleAddNote(problem._id)}
                      >
                        <BookmarkPlus />
                      </button>
                      <dialog id="my_modal_1" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">
                          <h3 className="font-bold text-lg">Add Note</h3>
                          <div className="modal-action flex flex-col">
                            <div className=''>
                              <textarea name="" id="note" className='h-28 w-10/12 p-2 resize-none' value={note} onChange={(e) => { setNote(e.target.value) }}></textarea>
                            </div>
                            <form method="dialog" className='w-full'>
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn btn-secondary" onClick={() => saveNote(problem._id)}>Save</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                      <button
                        className='btn btn-primary btn-sm'
                        onClick={() => window.open(`https://leetcode.com/problems/${problem.titleSlug}/description/`, '_blank')}
                      >
                        Solve
                      </button>
                    </div>
                    <div className="dropdown dropdown-down">
                      <div tabIndex={0} role="button" className="btn btn-sm">More</div>
                      <ul tabIndex={0} className="dropdown-content menu bg-black rounded-box z-[1] w-32 p-2 shadow">
                        <li><a>Challenge</a></li>
                        <li><a>Ask Doubt</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {renderPaginationControls()}
        </div>
      </div>
    </div>
  );
};

export default ProblemsList;