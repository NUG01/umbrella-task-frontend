import React from "react";
import CloseIcon from "../assets/icons/CloseIcon";
function DetailsModal({ detail, closeModal }) {
  function convertDate(createdAtDate) {
    const date = new Date(createdAtDate);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  return (
    <div className="z-100 w-[50vw] relative overflow-y-scroll bg-white rounded-[10px]">
      <div
        onClick={closeModal}
        className="absolute top-0 right-0 -trasnlate-x-1/2 cursor-pointer"
      >
        <CloseIcon />
      </div>
      <div className="border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div
            className={`px-4 m:grid sm:grid-cols-3 sm:gap-4 sm:px-3 bg-gray-100`}
          ></div>
        </dl>
        <dl className="divide-y divide-gray-100">
          {Object.keys(detail).map((key, i) => {
            if (key == "id") return;
            return (
              <div
                key={i}
                className={`${
                  i % 2 == 0 ? "bg-gray-200" : "bg-gray-100"
                } px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3`}
              >
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {key.replaceAll("_", " ")}
                </dt>

                <dd
                  className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"
                  style={{ wordBreak: "break-all" }}
                >
                  {key == "category_names" &&
                    detail[key].map((cat, i) => {
                      return cat + (detail[key].length == i + 1 ? "" : ", ");
                    })}
                  {key == "price" && detail[key] + " ლარი"}

                  {key == "images" &&
                    detail[key].map((img, i) => {
                      return (
                        <img
                          key={i}
                          className="w-[45px] h-[45px] rounded-[4px] inline ml-[10px] mt-[5px]"
                          src={import.meta.env.VITE_BASE_URL + img.path}
                        />
                      );
                    })}
                  {key != "category_names" &&
                    key != "images" &&
                    key != "created_at" &&
                    key != "updated_at" &&
                    key != "price" &&
                    detail[key]}
                  {key == "created_at" && convertDate(detail[key])}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}

export default DetailsModal;
