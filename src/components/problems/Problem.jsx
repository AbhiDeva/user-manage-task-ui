import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProblemNavbar from "./ProblemNavbar";
import { MdCode, MdSearch, MdFilterList, MdCreate, MdAdd } from 'react-icons/md';
import { getDifficultyBadgeClass } from '../../utils/index.js';
import { toast } from 'sonner';
import { useGetAllProblemsQuery, useCreateProblemMutation } from '../../redux/slices/api/problemApiSlice.js';
import { useSelector } from 'react-redux';
import CreateProblemModal from "./CreateProblemModal"

const Problem = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);

    // Fetch problems from API
    const { data: problemsData, isLoading, error, refetch } = useGetAllProblemsQuery({
        difficulty: selectedDifficulty === 'All' ? '' : selectedDifficulty,
        category: '',
        search: searchTerm,
    });

    console.log(problemsData)

    // Create problem mutation
    const [createProblem, { isLoading: isCreating }] = useCreateProblemMutation();
    const problems = problemsData && problemsData.data  || [];

    const filteredProblems = problems;
    // const filteredProblems = problems & problems.filter((problem) => {
    //     const matchesSearch = searchTerm ? (problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         problem.category.toLowerCase().includes(searchTerm.toLowerCase())) : problem;
    //     const matchesDifficulty = selectedDifficulty === " " || problem.difficulty === selectedDifficulty;
    //     return matchesSearch && matchesDifficulty;
    // });
 
    const easyProblemsCount = problems.filter((p) => p.difficulty === "Easy").length;
    const mediumProblemsCount = problems.filter((p) => p.difficulty === "Medium").length;
    const hardProblemsCount = problems.filter((p) => p.difficulty === "Hard").length;

     // Handle problem creation
    const handleCreateProblem = async (problemData) => {
        try {
            await createProblem(problemData).unwrap();
            toast.success('Problem created successfully!');
            setIsModalOpen(false);
            refetch(); // Refresh the problems list
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to create problem');
            console.error('Create problem error:', error);
        }
    };


    return (
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* HEADER */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                    <h1 className="text-2xl mb-3 text-blue-700">
                        Practice Problems
                    </h1>
                    <p className="text-gray-400 text-md">
                        Sharpen your coding skills with these curated problems
                    </p>
                    </div>

                    {/* Admin Create Button */}
                    {user?.isAdmin && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-purple-500/50"
                        >
                            <MdAdd className="w-5 h-5" />
                            Create Problem
                        </button>
                    )}
                </div>

                {/* SEARCH AND FILTER */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4">
                    {/* Search Bar */}
                    <div className="flex-1 relative">
                        <MdSearch className="absolute left-4  top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                        <input
                            type="text"
                            placeholder="Search problems..."
                            className="w-full pl-12 pr-4 py-3.5 bg-gradient-to-r from-white-800/80 to-white-900/80 border border-black-500/30 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:border-black-500 focus:ring-2 focus:ring-black-500/50 transition-all shadow-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Difficulty Filter */}
                    <div className="flex items-center gap-2 relative">
                        <MdFilterList className="w-5 h-5 text-blue-400 left-4 absolute left-4  top-1/2" />
                        <select
                            className="px-5 py-3.5 bg-gradient-to-r from-white-800/80 to-white-900/80 border border-black-500/30 rounded-xl text-black focus:outline-none focus:border-black-500 focus:ring-2 focus:ring-black-500/50 transition-all shadow-lg cursor-pointer"
                            value={selectedDifficulty}
                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                        >
                            <option value="All">All Levels</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>
                </div>

                {/* PROBLEMS LIST */}
                <div className="space-y-5">
                    {filteredProblems.length === 0 ? (
                        <div className="bg-gradient-to-br from-blue-900/20 via-gray-900/50 to-indigo-900/20 backdrop-blur-sm rounded-2xl border border-blue-500/30 shadow-2xl p-12 text-center">
                            <MdSearch className="w-16 h-16 mx-auto text-blue-400/50 mb-4" />
                            <p className="text-xl text-gray-300 mb-2">No problems found</p>
                            <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        filteredProblems && filteredProblems.map((problem, index) => (
                            <div
                                key={problem.id}
                                className="group relative bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                            >

             

                                <div className="relative p-7">
                                    <div className="flex items-center justify-between gap-6">

                                        {/* LEFT SIDE */}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-5 mb-4">

                                                {/* ICON */}
                                                <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm">
                                                    <MdCode className="w-4 h-4 text-white" />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2 flex-wrap">

                                                        {/* TITLE */}
                                                        <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                                            {problem.title}
                                                        </h2>

                                                        {/* DIFFICULTY BADGE */}
                                                        <span
                                                            className={`px-4 py-1.5 rounded-full text-xs font-bold ${getDifficultyBadgeClass(
                                                                problem.difficulty
                                                            )} transform group-hover:scale-110 transition-transform duration-300`}
                                                        >
                                                            {problem.difficulty}
                                                        </span>
                                                    </div>

                                                    {/* CATEGORY */}
                                                    <p className="text-sm font-medium text-blue-600">
                                                        {problem.category}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* DESCRIPTION */}
                                            <p className="text-gray-600 leading-relaxed text-base">
                                                {problem.description.text}
                                            </p>
                                        </div>

                                        {/* RIGHT SIDE BUTTON */}
                                        <div className="flex flex-col items-center gap-2 bg-blue-50 px-5 py-4 rounded-xl border border-blue-200 transition-all duration-300">
                                            <Link
                                                key={problem._id}
                                                to={`/problem/${problem._id}`}
                                                className="card bg-base-100 hover:scale-[1.01] transition-transform"
                                            >
                                                <span className="font-bold text-sm text-blue-600">
                                                    Solve
                                                </span>
                                                <MdCreate className="w-6 h-6 text-blue-500 group-hover:translate-x-2 transition-all duration-300" />
                                            </Link>
                                        </div>


                                    </div>
                                </div>

                                {/* Bottom bar */}
                                <div className="h-1 bg-blue-500/70 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                            </div>

                        ))
                    )}
                </div>



                <div className="mt-16 relative bg-gradient-to-br from-gray-900/20 via-gray-900/40 to-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-400/20 shadow-2xl overflow-hidden">

                    {/* Soft white glow */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-gray-200/20 to-white/20 rounded-2xl opacity-30 blur-2xl"></div>

                    <div className="relative p-8">
                        <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent text-black">
                            Statistics Overview
                        </h3>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

                            {/* Total Problems (Now white theme) */}
                            <div className="group text-center p-6 bg-gradient-to-br from-white/10 via-gray-200/10 to-white/10 rounded-xl border border-gray-300/20 hover:border-gray-200/40 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-white/20">
                                <div className="text-sm font-semibold text-blue-200 mb-2">Total Problems</div>
                                <div className="text-4xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                    {problems.length}
                                </div>
                            </div>

                            {/* Easy */}
                            <div className="group text-center p-6 bg-gradient-to-br from-green-600/20 via-green-500/10 to-emerald-600/20 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-green-500/30">
                                <div className="text-sm font-semibold text-green-300 mb-2">Easy</div>
                                <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                    {easyProblemsCount}
                                </div>
                            </div>

                            {/* Medium */}
                            <div className="group text-center p-6 bg-gradient-to-br from-yellow-600/20 via-yellow-500/10 to-orange-600/20 rounded-xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-yellow-500/30">
                                <div className="text-sm font-semibold text-yellow-300 mb-2">Medium</div>
                                <div className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                                    {mediumProblemsCount}
                                </div>
                            </div>

                            {/* Hard */}
                            <div className="group text-center p-6 bg-gradient-to-br from-red-600/20 via-red-500/10 to-indigo-600/20 rounded-xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/30">
                                <div className="text-sm font-semibold text-red-300 mb-2">Hard</div>
                                <div className="text-4xl font-black bg-gradient-to-r from-red-400 to-indigo-400 bg-clip-text text-transparent">
                                    {hardProblemsCount}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

              {/* Create Problem Modal */}
            <CreateProblemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateProblem}
            />

        </div>
    );
}

export default Problem