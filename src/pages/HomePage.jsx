import MainTable from "../components/MainTable";
import styles from "../styles/HomePage.module.css";
import BasicButton from "../components/BasicButton.jsx";
import { NavLink } from "react-router-dom";
import BasicAxios from "../lib/axios";
import { useState, useEffect } from "react";
import BasicInput from "../components/BasicInput";

function HomePage() {
  const [isFetched, setIsFetched] = useState(false);
  const [filterError, setFilterError] = useState(false);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await BasicAxios.get("products");
        setData(res.data);
        setIsFetched(true);
      } catch (error) {
        alert("Error");
      }
    })();
  }, []);

  async function filterHandler(ev) {
    ev.preventDefault();
    setFilterError(false);
    if (categoryName || description || price || productName) {
      const res = await BasicAxios.get(
        `products?category_name=${categoryName}&description=${description}&price=${price}&product_name=${productName}`
      );
      if (!res.data.length == 0) {
        setData(res.data);
        return;
      } else {
        setFilterError(true);
        setTimeout(() => {
          setFilterError(false);
        }, 7200);
      }
    }
    const res = await BasicAxios.get("products");
    setData(res.data);
  }

  if (!isFetched) return;
  return (
    <section>
      <NavLink
        to="/admin/add-product"
        className="absolute right-0 top-0 -translate-x-1/2  translate-y-1/2"
      >
        <BasicButton>პანელზე გადასვლა</BasicButton>
      </NavLink>
      <div
        className={styles.tableContainer}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <form onSubmit={filterHandler} className="flex gap-[10px]">
          <BasicInput
            setValue={(value) => {
              setProductName(value);
            }}
            value={productName}
            label="პროდუქტის სახელი"
            name="product-name"
            type="text"
          />
          <BasicInput
            setValue={(value) => {
              setDescription(value);
            }}
            value={description}
            label="აღწერა"
            name="description"
            type="text"
          />
          <BasicInput
            setValue={(value) => {
              setCategoryName(value);
            }}
            value={categoryName}
            label="კატეგორია"
            name="category-name"
            type="text"
          />
          <BasicInput
            setValue={(value) => {
              setPrice(value);
            }}
            value={price}
            label="მაქსიმალური ფასი"
            name="price"
            type="text"
          />
          <div className="w-[70%] flex items-end justify-end mb-[5px]">
            <BasicButton submit={true}>გაფილტვრა</BasicButton>
          </div>
        </form>
        {filterError && (
          <p className="text-[14px] font-[600] text-red-600 mt-[10px]">
            შესაბამისი ფილტრით მონაცემები ვერ მოიძებნა, ამიტომ ცხრილი არ
            განახლდა.
          </p>
        )}
        <MainTable data={data}></MainTable>
      </div>
    </section>
  );
}

export default HomePage;
