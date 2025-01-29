// components/ProblemsList/index.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Menu } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import FiltersPanel from './FiltersPanel';
import ProblemsTable from './ProblemsTable';
import SearchSort from './SearchSort';
import PaginationControls from './PaginationControls';
import NoteModal from './NoteModal';

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const problemsPerPage = 50;
  const { user, getAccessTokenSilently } = useAuth0();

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

  const handleAddNote = async (problemId) => {
    setSelectedProblemId(problemId);
    await fetchNote(problemId);
    document.getElementById("problem_note_modal").showModal();
  };

  const saveNote = async () => {
    if (!note.trim() || !selectedProblemId) {
      alert("Note cannot be empty!");
      return;
    }
    const token = await getAccessTokenSilently();
    const auth0Id = user.sub;
    console.log(token)
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
      document.getElementById("problem_note_modal").close(); // Close the modal
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

  return (
    <div className="min-h-screen bg-gray-900 text-white relative flex flex-row">
      {/* Mobile Filter Toggle Button */}
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="lg:hidden fixed top-16 right-12 z-50 btn btn-circle btn-sm btn-primary"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Filters Sidebar - Responsive */}
      <div className={`
        fixed inset-y-0 left-0 top-16 z-40 w-64 transform 
        ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 transition-transform duration-300 ease-in-out
        bg-gray-900 p-4 overflow-y-auto
      `}>
        <FiltersPanel
          selectedTopics={selectedTopics}
          setSelectedTopics={setSelectedTopics}
          selectedDifficulties={selectedDifficulties}
          setSelectedDifficulties={setSelectedDifficulties}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          allTopics={[...new Set(problems.flatMap(problem =>
            (problem.topicTags + ' ').split(',').map(tag => tag.trim())
          ))]}
        />
      </div>

      {/* Overlay for mobile filter */}
      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      {/* Main Content - Responsive */}
      <div className={`
        flex-1 p-4 transition-all duration-300 ease-in-out
        lg:ml-64 ml-0 pt-16 lg:pt-4
      `}>
        <SearchSort
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <ProblemsTable
          filteredProblems={filteredProblems}
          solvedProblems={solvedProblems}
          handleSolvedToggle={handleSolvedToggle}
          handleAddNote={handleAddNote}
        />

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />

        <NoteModal
          note={note}
          setNote={setNote}
          saveNote={saveNote}
        />
      </div>
    </div>
  );
};

export default ProblemsList;