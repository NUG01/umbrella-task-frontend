import { CheckCircleIcon } from "@heroicons/react/20/solid";
function CategoryPickerButton({ picked, name, id, pickClick }) {
  return (
    <button
      onClick={() => pickClick(picked ? "remove" : "add")}
      type="button"
      className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      {name}
      {picked && (
        <CheckCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}

export default CategoryPickerButton;
