export default function Example({ label, name, type, value, setValue }) {
  return (
    <div className="w-[70%]">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900 font-[500]"
      >
        {label}
      </label>
      <div className="mt-2">
        {type != "textarea" && name != "price" && (
          <input
            name={name}
            id={name}
            type={type}
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
            className={`block w-full h-[45px] pl-[5px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
          ring-inset ring-gray-300 focus:ring-2
           focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          />
        )}
        {type == "textarea" && name != "price" && (
          <textarea
            name={name}
            id={name}
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
            className={`block w-full h-[45px] p-[5px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
          ring-inset ring-gray-300 focus:ring-2
           focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
          />
        )}
      </div>
      {name == "price" && (
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
            className="block w-full h-[45px] rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
            aria-describedby="price-currency"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-gray-500 sm:text-sm" id="price-currency">
              ლარი
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
