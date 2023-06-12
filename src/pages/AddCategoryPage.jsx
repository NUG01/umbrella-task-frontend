import { useEffect, useState } from "react";
import BasicButton from "../components/BasicButton";
import BasicInput from "../components/BasicInput";
import { addCategory, getCategories } from "../services/CategoryServices";
import styles from "../styles/AdminPage.module.css";
function AddCategoryPage() {
  const [category, setCategory] = useState("");
  const [errorValue, setErrorValue] = useState("");

  const [isFetched, setIsFetched] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getCategories();
      setCategories(res.data.categories);
      setIsFetched(true);
    })();
  }, []);

  async function submitHandler(ev) {
    ev.preventDefault();
    setErrorValue("");
    try {
      if (!category) {
        setErrorValue("კატეგორიის ველის შევსება აუცილებელია!");
        return;
      }
      const res = await addCategory(category);
      if (categories.length > 0) {
        setCategories((oldArray) => [res.data.category, ...oldArray]);
      } else {
        setCategories([res.data.category]);
      }
      setCategory("");
    } catch (error) {
      setErrorValue(error.response.data.message);
    }
  }

  if (!isFetched) return;
  return (
    <section>
      <form onSubmit={submitHandler} className={styles.form}>
        <BasicInput
          setValue={(value) => {
            setCategory(value);
          }}
          value={category}
          label="შეიყვანეთ კატეგორია"
          name="category"
          type="text"
        />
        {errorValue && (
          <p className="text-[14px] text-red-600 font-[500] mt-[5px]">
            {errorValue}
          </p>
        )}
        <div className="w-[70%] flex items-center justify-end">
          <BasicButton submit={true}>დამატება</BasicButton>
        </div>
      </form>
      <div className={styles.form}>
        <p className="block text-[16px] text-sm font-medium leading-6 text-gray-900 font-[500]">
          კატეგორიები
        </p>
        <div
          className={`w-[70%] rounded-md max-h-[300px] overflow-y-scroll ${
            categories.length == 0 ? undefined : "bg-[#fff]"
          }`}
        >
          {categories.length > 0 &&
            categories.map((cat, i) => {
              return (
                <div
                  className="p-[7px] font-[600] flex items-center justify-center border-b-[1px] border-b-[solid]"
                  key={i}
                >
                  <span>{cat.name}</span>
                </div>
              );
            })}
          {categories.length == 0 && (
            <div className="flex items-center justify-center">
              <h3>კატეგორიები ვერ მოიძებნა!</h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AddCategoryPage;
