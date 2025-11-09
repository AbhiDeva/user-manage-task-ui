import React, { useState } from 'react';
import { MdClose, MdAdd, MdDelete, MdCode } from 'react-icons/md';

const CreateProblemModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    difficulty: 'Easy',
    category: '',
    description: {
      text: '',
      notes: [''],
    },
    examples: [
      {
        input: '',
        output: '',
        explanation: '',
      },
    ],
    constraints: [''],
    starterCode: {
      javascript: '',
      python: '',
      java: '',
      cpp: '',
      typescript: '',
    },
    testCases: [
      {
        input: '',
        expectedOutput: '',
        isHidden: false,
      },
    ],
  });

  const [currentTab, setCurrentTab] = useState('basic');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  // All your handler functions remain the same...
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData({ ...formData, slug });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDescriptionChange = (field, value) => {
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        [field]: value,
      },
    });
  };

  const handleNoteChange = (index, value) => {
    const newNotes = [...formData.description.notes];
    newNotes[index] = value;
    handleDescriptionChange('notes', newNotes);
  };

  const addNote = () => {
    handleDescriptionChange('notes', [...formData.description.notes, '']);
  };

  const removeNote = (index) => {
    const newNotes = formData.description.notes.filter((_, i) => i !== index);
    handleDescriptionChange('notes', newNotes);
  };

  const handleExampleChange = (index, field, value) => {
    const newExamples = [...formData.examples];
    newExamples[index][field] = value;
    setFormData({ ...formData, examples: newExamples });
  };

  const addExample = () => {
    setFormData({
      ...formData,
      examples: [...formData.examples, { input: '', output: '', explanation: '' }],
    });
  };

  const removeExample = (index) => {
    const newExamples = formData.examples.filter((_, i) => i !== index);
    setFormData({ ...formData, examples: newExamples });
  };

  const handleConstraintChange = (index, value) => {
    const newConstraints = [...formData.constraints];
    newConstraints[index] = value;
    setFormData({ ...formData, constraints: newConstraints });
  };

  const addConstraint = () => {
    setFormData({ ...formData, constraints: [...formData.constraints, ''] });
  };

  const removeConstraint = (index) => {
    const newConstraints = formData.constraints.filter((_, i) => i !== index);
    setFormData({ ...formData, constraints: newConstraints });
  };

  const handleStarterCodeChange = (language, value) => {
    setFormData({
      ...formData,
      starterCode: {
        ...formData.starterCode,
        [language]: value,
      },
    });
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...formData.testCases];
    newTestCases[index][field] = value;
    setFormData({ ...formData, testCases: newTestCases });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [
        ...formData.testCases,
        { input: '', expectedOutput: '', isHidden: false },
      ],
    });
  };

  const removeTestCase = (index) => {
    const newTestCases = formData.testCases.filter((_, i) => i !== index);
    setFormData({ ...formData, testCases: newTestCases });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Container - FIXED: Added proper centering */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-purple-500/30 shadow-2xl w-full max-w-5xl my-8">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <MdCode className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Create New Problem
                </h2>
                <p className="text-sm text-gray-400">Add a new coding challenge</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <MdClose className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-800 bg-gray-900/50 overflow-x-auto">
            {['basic', 'description', 'examples', 'constraints', 'code', 'testCases'].map((tab) => (
              <button
                key={tab}
                onClick={() => setCurrentTab(tab)}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-all ${
                  currentTab === tab
                    ? 'border-b-2 border-purple-500 text-purple-400 bg-purple-500/10'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Form Content - FIXED: Added max-height with proper scrolling */}
          <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 240px)' }}>
            {/* Basic Info Tab */}
            {currentTab === 'basic' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={generateSlug}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder="Two Sum"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slug <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder="two-sum"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Difficulty <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                      placeholder="Array, Hash Table"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Description Tab */}
            {currentTab === 'description' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Problem Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.description.text}
                    onChange={(e) => handleDescriptionChange('text', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all min-h-[150px]"
                    placeholder="Given an array of integers nums and an integer target..."
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-300">Notes (Optional)</label>
                    <button
                      type="button"
                      onClick={addNote}
                      className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      <MdAdd className="w-4 h-4" />
                      Add Note
                    </button>
                  </div>
                  {formData.description.notes.map((note, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={note}
                        onChange={(e) => handleNoteChange(index, e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        placeholder="Additional note..."
                      />
                      {formData.description.notes.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeNote(index)}
                          className="p-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          <MdDelete className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Examples Tab */}
            {currentTab === 'examples' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-300">
                    Examples <span className="text-red-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={addExample}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    <MdAdd className="w-4 h-4" />
                    Add Example
                  </button>
                </div>

                {formData.examples.map((example, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-400">
                        Example {index + 1}
                      </span>
                      {formData.examples.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeExample(index)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          <MdDelete className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Input</label>
                      <textarea
                        value={example.input}
                        onChange={(e) => handleExampleChange(index, 'input', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        placeholder="nums = [2,7,11,15], target = 9"
                        rows="2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Output</label>
                      <textarea
                        value={example.output}
                        onChange={(e) => handleExampleChange(index, 'output', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        placeholder="[0,1]"
                        rows="2"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Explanation (Optional)
                      </label>
                      <textarea
                        value={example.explanation}
                        onChange={(e) => handleExampleChange(index, 'explanation', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                        placeholder="Because nums[0] + nums[1] == 9, we return [0, 1]"
                        rows="2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

             {/* Constraints Tab */}
          {currentTab === 'constraints' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-300">Constraints</label>
                <button
                  type="button"
                  onClick={addConstraint}
                  className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  <MdAdd className="w-4 h-4" />
                  Add Constraint
                </button>
              </div>

               {formData.constraints.map((constraint, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={constraint}
                    onChange={(e) => handleConstraintChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                    placeholder="2 <= nums.length <= 10^4"
                  />
                  {formData.constraints.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeConstraint(index)}
                      className="p-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <MdDelete className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}


           {/* Starter Code Tab */}
          {currentTab === 'code' && (
            <div className="space-y-4">
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {['javascript', 'python', 'java', 'cpp', 'typescript'].map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                      selectedLanguage === lang
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </button>
                ))}
              </div>

                <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Starter Code for {selectedLanguage}
                </label>
                <textarea
                  value={formData.starterCode[selectedLanguage]}
                  onChange={(e) => handleStarterCodeChange(selectedLanguage, e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg text-white font-mono text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all min-h-[300px]"
                  placeholder={`function twoSum(nums, target) {\n  // Your code here\n}`}
                />
              </div>
            </div>
          )}

           {/* Test Cases Tab */}
          {currentTab === 'testCases' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-300">
                  Test Cases <span className="text-red-400">*</span>
                </label>
                <button
                  type="button"
                  onClick={addTestCase}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <MdAdd className="w-4 h-4" />
                  Add Test Case
                </button>
              </div>
               {formData.testCases.map((testCase, index) => (
                <div
                  key={index}
                  className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-400">
                      Test Case {index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 text-sm text-gray-400">
                        <input
                          type="checkbox"
                          checked={testCase.isHidden}
                          onChange={(e) =>
                            handleTestCaseChange(index, 'isHidden', e.target.checked)
                          }
                          className="rounded bg-gray-700 border-gray-600"
                        />
                        Hidden
                      </label>
                       {formData.testCases.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTestCase(index)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          <MdDelete className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                      <label className="block text-xs text-gray-400 mb-1">Input</label>
                    <textarea
                      value={testCase.input}
                      onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm font-mono focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                      placeholder="[2,7,11,15]\n9"
                      rows="3"
                    />
                  </div>

                   <div>
                    <label className="block text-xs text-gray-400 mb-1">Expected Output</label>
                    <textarea
                      value={testCase.expectedOutput}
                      onChange={(e) =>
                        handleTestCaseChange(index, 'expectedOutput', e.target.value)
                      }
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white text-sm font-mono focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                      placeholder="[0,1]"
                      rows="2"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

            {/* Constraints, Code, and TestCases tabs remain the same... */}
            {/* I'll include them in the next part for brevity */}
          </div>

          {/* Footer - FIXED: Made sticky */}
          <div className="sticky bottom-0 flex items-center justify-between p-6 border-t border-gray-800 bg-gray-900/95 backdrop-blur-sm rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:scale-105 transition-transform shadow-lg shadow-purple-500/50"
            >
              Create Problem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProblemModal;