import { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Search,
  Calendar,
  Tag,
  AlertCircle,
  Moon,
  Sun,
  Filter,
  CheckCircle2,
  Circle
} from 'lucide-react';

const PRIORITIES = {
  high: { label: 'High', color: 'bg-red-500', textColor: 'text-red-600', bgLight: 'bg-red-50' },
  medium: { label: 'Medium', color: 'bg-yellow-500', textColor: 'text-yellow-600', bgLight: 'bg-yellow-50' },
  low: { label: 'Low', color: 'bg-green-500', textColor: 'text-green-600', bgLight: 'bg-green-50' }
};

const CATEGORIES = ['Personal', 'Work', 'Shopping', 'Health', 'Other'];

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [selectedCategory, setSelectedCategory] = useState('Personal');
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        priority: selectedPriority,
        category: selectedCategory,
        dueDate: selectedDate,
        createdAt: new Date().toISOString()
      };
      setTodos([newTodo, ...todos]);
      setInputValue('');
      setSelectedDate('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const saveEdit = () => {
    if (editingText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText } : todo
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'active' && !todo.completed) ||
      (filterStatus === 'completed' && todo.completed);
    const matchesPriority = filterPriority === 'all' || todo.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className={`text-4xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              My Tasks
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-full transition-all duration-300 ${
                darkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>

          {/* Progress Bar */}
          <div className={`p-4 rounded-xl ${
            darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
          }`}>
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Progress
              </span>
              <span className={`text-sm font-bold ${
                darkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                {completedCount}/{totalCount} completed
              </span>
            </div>
            <div className={`w-full h-3 rounded-full overflow-hidden ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className={`p-6 rounded-xl mb-6 ${
          darkMode ? 'bg-gray-800 shadow-xl' : 'bg-white shadow-lg'
        }`}>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new task..."
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500'
                  : 'bg-gray-50 border-gray-200 text-gray-800 focus:border-purple-500 focus:bg-white'
              } outline-none`}
            />
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Plus size={20} />
              Add
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className={`block text-sm font-medium mb-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Priority
              </label>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border-2 transition-all ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-200'
                } outline-none focus:border-purple-500`}
              >
                {Object.entries(PRIORITIES).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border-2 transition-all ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-200'
                } outline-none focus:border-purple-500`}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Due Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border-2 transition-all ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-gray-50 border-gray-200'
                } outline-none focus:border-purple-500`}
              />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={`p-4 rounded-xl mb-6 ${
          darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                darkMode ? 'text-gray-400' : 'text-gray-400'
              }`} size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className={`w-full pl-10 pr-4 py-2 rounded-lg border-2 transition-all ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-50 border-gray-200'
                } outline-none focus:border-purple-500`}
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-3 py-2 rounded-lg border-2 transition-all ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-50 border-gray-200'
              } outline-none focus:border-purple-500`}
            >
              <option value="all">All Tasks</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className={`px-3 py-2 rounded-lg border-2 transition-all ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-gray-50 border-gray-200'
              } outline-none focus:border-purple-500`}
            >
              <option value="all">All Priorities</option>
              {Object.entries(PRIORITIES).map(([key, { label }]) => (
                <option key={key} value={key}>{label} Priority</option>
              ))}
            </select>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className={`text-center py-12 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
            }`}>
              <CheckCircle2 size={48} className={`mx-auto mb-3 ${
                darkMode ? 'text-gray-600' : 'text-gray-300'
              }`} />
              <p className={`text-lg ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {searchTerm || filterStatus !== 'all' || filterPriority !== 'all'
                  ? 'No tasks match your filters'
                  : 'No tasks yet. Add one to get started!'}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`p-4 rounded-xl transition-all duration-200 ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-750 shadow-xl'
                    : 'bg-white hover:shadow-xl shadow-lg'
                } ${todo.completed ? 'opacity-75' : ''}`}
              >
                {editingId === todo.id ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      className={`flex-1 px-3 py-2 rounded-lg border-2 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white'
                          : 'bg-gray-50 border-gray-200'
                      } outline-none focus:border-purple-500`}
                      autoFocus
                    />
                    <button
                      onClick={saveEdit}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleComplete(todo.id)}
                      className={`mt-1 flex-shrink-0 transition-all duration-200 ${
                        todo.completed
                          ? 'text-green-500'
                          : darkMode ? 'text-gray-500 hover:text-green-400' : 'text-gray-400 hover:text-green-500'
                      }`}
                    >
                      {todo.completed ? (
                        <CheckCircle2 size={24} className="fill-current" />
                      ) : (
                        <Circle size={24} />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className={`text-lg ${
                          todo.completed
                            ? darkMode ? 'line-through text-gray-500' : 'line-through text-gray-400'
                            : darkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {todo.text}
                        </p>
                        <div className="flex gap-1 flex-shrink-0">
                          <button
                            onClick={() => startEdit(todo)}
                            className={`p-2 rounded-lg transition-all ${
                              darkMode
                                ? 'hover:bg-gray-700 text-blue-400'
                                : 'hover:bg-blue-50 text-blue-500'
                            }`}
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className={`p-2 rounded-lg transition-all ${
                              darkMode
                                ? 'hover:bg-gray-700 text-red-400'
                                : 'hover:bg-red-50 text-red-500'
                            }`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 items-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          darkMode
                            ? `${PRIORITIES[todo.priority].color} bg-opacity-20 ${PRIORITIES[todo.priority].textColor}`
                            : `${PRIORITIES[todo.priority].bgLight} ${PRIORITIES[todo.priority].textColor}`
                        }`}>
                          <AlertCircle size={12} />
                          {PRIORITIES[todo.priority].label}
                        </span>

                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          darkMode
                            ? 'bg-blue-500 bg-opacity-20 text-blue-400'
                            : 'bg-blue-50 text-blue-600'
                        }`}>
                          <Tag size={12} />
                          {todo.category}
                        </span>

                        {todo.dueDate && (
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            isOverdue(todo.dueDate)
                              ? darkMode
                                ? 'bg-red-500 bg-opacity-20 text-red-400'
                                : 'bg-red-50 text-red-600'
                              : darkMode
                                ? 'bg-purple-500 bg-opacity-20 text-purple-400'
                                : 'bg-purple-50 text-purple-600'
                          }`}>
                            <Calendar size={12} />
                            {new Date(todo.dueDate).toLocaleDateString()}
                            {isOverdue(todo.dueDate) && ' (Overdue)'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Stats */}
        {todos.length > 0 && (
          <div className={`mt-6 p-4 rounded-xl text-center ${
            darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'
          }`}>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {filteredTodos.length} {filteredTodos.length === 1 ? 'task' : 'tasks'} shown
              {(searchTerm || filterStatus !== 'all' || filterPriority !== 'all') &&
                ` • ${todos.length} total`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
