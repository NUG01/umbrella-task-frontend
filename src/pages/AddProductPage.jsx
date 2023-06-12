import BasicInput from "../components/BasicInput";
import styles from "../styles/AdminPage.module.css";
import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import CategoryPickerButton from "../components/CategoryPickerButton";
import { getCategories } from "../services/CategoryServices";
import BasicButton from "../components/BasicButton";
import BasicAxios from "../lib/axios";
import MediaAxios from "../lib/axios/MediaAxios";
import { addProduct } from "../services/ProductServices";

function AddProductPage() {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [isFetched, setIsFetched] = useState(false);
  const [categories, setCategories] = useState([]);

  const [pickedCategories, setPickedCategories] = useState([]);
  const [pickedCategoryIdCollection, setPickedCategoryIdCollection] = useState(
    []
  );

  useEffect(() => {
    (async () => {
      const res = await getCategories();
      setCategories(res.data.categories);
      setIsFetched(true);
    })();
  }, []);

  function imagePreviewsHandler(ev) {
    const file = ev.target.files[0];

    setImagePreviews([...imagePreviews, file]);
    setImages([...images, file]);

    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      setImagePreviews([...imagePreviews, dataURL]);
    };
    reader.readAsDataURL(file);
  }

  function categoryCheckboxClickHandler(action, cat) {
    if (action == "remove" && pickedCategoryIdCollection.includes(cat.id)) {
      for (let index = 0; index < pickedCategoryIdCollection.length; index++) {
        if (pickedCategoryIdCollection[index] == cat.id) {
          setPickedCategoryIdCollection((oldArray) =>
            oldArray.filter((x) => x != cat.id)
          );
        }
      }
    } else {
      setPickedCategoryIdCollection((oldArray) => [...oldArray, cat.id]);
    }
  }

  async function submitHandler(ev) {
    ev.preventDefault();
    const data = [
      productName,
      description,
      price,
      pickedCategoryIdCollection,
      images,
    ];
    try {
      const res = await addProduct(data);
      console.log(res);
    } catch (error) {}
  }
  if (!isFetched) return;
  return (
    <section>
      <form onSubmit={submitHandler} className={styles.form}>
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
          type="textarea"
        />
        <BasicInput
          setValue={(value) => {
            setPrice(value);
          }}
          value={price}
          label="ფასი"
          name="price"
          type="text"
        />
        <div className="relative mt-[20px]">
          <button
            type="button"
            className="rounded-full flex items-center  justify-center bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span>სურათის დამატება</span>
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <input
            onChange={(ev) => imagePreviewsHandler(ev)}
            id="images"
            name="images"
            type="file"
            className="opacity-0 absolute top-0 left-0 w-[100%] h-[100%] z-50"
          />
        </div>
        <div className="grid grid-cols-5 mt-[20px] gap-[12px] w-[70%] justify-items-center">
          {imagePreviews.map((img, i) => {
            return (
              <img
                key={i}
                className="h-[90px] w-[90px] object-fit rounded-[4px]"
                src={img}
              />
            );
          })}
        </div>
        <h3>აირჩიე სასურველი კატეგორიები</h3>
        <div
          className={`grid grid-cols-6 gap-[8px] justify-items-center ${
            categories.length > 0
              ? "border-b-[2px] border-b-[solid] border-b-indigo-500 pb-[10px]"
              : undefined
          }`}
        >
          {categories.map((cat) => {
            return (
              <CategoryPickerButton
                pickClick={(action) => {
                  categoryCheckboxClickHandler(action, cat);
                }}
                picked={pickedCategoryIdCollection.includes(cat.id)}
                name={cat.name}
                id={cat.id}
                key={cat.id}
              />
            );
          })}
        </div>
        <div className="w-[10%] flex items-center justify-center mt-[20px]">
          <BasicButton submit={true}>დამატება</BasicButton>
        </div>
      </form>
    </section>
  );
}

export default AddProductPage;
