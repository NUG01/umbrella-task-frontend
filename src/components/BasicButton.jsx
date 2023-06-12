export default function BasicButton({ children, submit }) {
  return (
    <>
      <button
        type={submit ? "submit" : "button"}
        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        {children}
      </button>
    </>
  );
}
