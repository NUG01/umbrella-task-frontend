import { useState, useEffect } from "react";
import BasicAxios from "../lib/axios";
import DetailsModal from "./DetailsModal";

export default function MainTable({ data }) {
  const [products, setProducts] = useState([]);
  const [fetched, setFeteched] = useState(false);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    setProducts(data);
    setFeteched(true);
  }, []);

  if (products.length == 0) {
    return <h1>პროდუქტები ვერ მოიძებნა!</h1>;
  }
  const keys = Object.keys(data[0])
    .filter((x) => x != "id")
    .filter((x) => x != "created_at");

  async function deleteHandler(id) {
    try {
      await BasicAxios.delete("delete-product/" + id);
      setProducts(products.filter((x) => x.id != id));
    } catch (error) {
      alert("Cant be deleted!");
    }
  }

  async function detailsHandler(id) {
    setDetails(products.find((x) => x.id == id));
    setShowDetailsModal(true);
  }

  if (!fetched) return;
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {showDetailsModal && (
        <div>
          <div
            onClick={() => setShowDetailsModal(false)}
            className="absolute top-0 left-0 bg-gray-200 opacity-[0.6] w-[100vw] h-[100vh] z-[50]"
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] shadow-md border-[2px] border-solid rounded-[10px]">
            <DetailsModal
              closeModal={() => {
                setDetails(null);
                setShowDetailsModal(false);
              }}
              detail={details}
            />
          </div>
        </div>
      )}

      <div className="sm:flex sm:items-center"></div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {keys.map((key, i) => {
                      return (
                        <th
                          key={i}
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          {key == "category_names"
                            ? "Category name"
                            : key.replaceAll("_", " ")}
                        </th>
                      );
                    })}
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.map((product) => (
                    <tr key={product.id}>
                      {keys.map((key, i) => {
                        if (key == "id") return;
                        return (
                          <td
                            key={i}
                            className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                          >
                            {key == "category_names" && product[key][0]}
                            {key == "description" &&
                              (product[key].length > 30 ? "..." : product[key])}
                            {key == "images" && (
                              <img
                                className="w-[45px] h-[45px] rounded-[4px]"
                                src={
                                  import.meta.env.VITE_BASE_URL +
                                  product[key][0].path
                                }
                              />
                            )}
                            {key != "category_names" &&
                              key != "images" &&
                              key != "description" &&
                              product[key]}
                          </td>
                        );
                      })}

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => detailsHandler(product.id)}
                          type="button"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => deleteHandler(product.id)}
                          type="button"
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
