import { FiFileText, FiCheckCircle } from "react-icons/fi";

 const ResumeStrength = ({ progress, profile, onImprove }) => {


  const completionItems = [
    {
      label: "Work experience added",
      completed: !!profile?.experience,
    },
    {
      label: "Title specified",
      completed: !!profile?.designation,
    },
    {
      label: "Add at least 3 skills",
      completed: profile?.skills?.length >= 3,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-500 p-2 rounded-xl">
          <FiFileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Resume Strength
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Complete your profile to get better matches
          </p>
        </div>
      </div>

      <div className="mb-3">
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-teal-400 to-emerald-500 h-3 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold text-gray-900 dark:text-white">
          {progress}% Complete
        </span>
        <button
          onClick={onImprove}
          className="text-sm bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-all"
        >
          Improve Now
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        {completionItems.map((item, index) => (
          <p key={index} className="flex items-center gap-2 mb-1">
            <FiCheckCircle
              className={item.completed ? "text-teal-500" : "text-gray-400"}
            />
            <span>{item.label}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default ResumeStrength