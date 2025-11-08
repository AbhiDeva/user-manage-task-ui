export const formatDate = (date) => {
  // Get the month, day, and year
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  // Format the date as "MM dd, yyyy"
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export function dateFormatter(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) {
    return "Invalid Date";
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getInitials(fullName) {
  const names = fullName.split(" ");

  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

  const initialsStr = initials.join("");

  return initialsStr;
}

export const updateURL = ({ searchTerm, navigate, location }) => {
  const params = new URLSearchParams();

  if (searchTerm) {
    params.set("search", searchTerm);
  }

  const newURL = `${location?.pathname}?${params.toString()}`;
  navigate(newURL, { replace: true });

  return newURL;
};

export const PRIOTITYSTYELS = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-blue-600",
};

export const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

export const BGS = [
  "bg-blue-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-green-600",
];

export const getCompletedSubTasks = (items) => {
  const totalCompleted = items?.filter((item) => item?.isCompleted).length;

  return totalCompleted;
};

export function countTasksByStage(tasks) {
  let inProgressCount = 0;
  let todoCount = 0;
  let completedCount = 0;

  tasks?.forEach((task) => {
    switch (task.stage.toLowerCase()) {
      case "in progress":
        inProgressCount++;
        break;
      case "todo":
        todoCount++;
        break;
      case "completed":
        completedCount++;
        break;
      default:
        break;
    }
  });

  return {
    inProgress: inProgressCount,
    todo: todoCount,
    completed: completedCount,
  };
}


export const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      //return "badge-success";
      //return "bg-green-500/20 text-green-400 border-green-500/30"
      return "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/50"
    case "medium":
      //return "badge-warning";
      //return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      return "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/50"
    case "hard":
    //  return "badge-error";
    //return "bg-red-500/20 text-red-400 border-red-500/30"
    return "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg shadow-red-500/50"
    default:
      //return "badge-ghost";
      //return "bg-gray-500/20 text-gray-400 border-gray-500/30"
     return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
  }
};