import { PlusIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicButton from "../components/BasicButton";
import BasicInput from "../components/BasicInput";
import CategoryPickerButton from "../components/CategoryPickerButton";
import { getCategories } from "../services/CategoryServices";
import { addProduct } from "../services/ProductServices";
import styles from "../styles/AdminPage.module.css";

const errors = {
  name: "პროდუქტის სახელის ველის შევსება აუცილებელია!",
  description: "პროდუქტის აღწერის ველის შევსება აუცილებელია!",
  price: "პროდუქტის ფასის ველის შევსება აუცილებელია!",
  image: "აუცილებელია მინიმუმ 1 სურათის ატვირთვა!",
  category: "აუცილებელია მინიმუმ 1 კატეგორიის არჩევა!",
};

function AddProductPage() {
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [isFetched, setIsFetched] = useState(false);
  const [categories, setCategories] = useState([]);

  const [pickedCategoryIdCollection, setPickedCategoryIdCollection] = useState(
    []
  );

  const navigate = useNavigate();

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [imageError, setImageError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getCategories();
      setCategories(res.data.categories);
      setIsFetched(true);
    })();
  }, []);

  function validateForm() {
    setNameError("");
    setDescriptionError("");
    setPriceError("");
    setImageError("");
    setCategoryError("");
    if (!productName) setNameError(errors.name);
    if (!description) setDescriptionError(errors.description);
    if (!price) setPriceError(errors.price);
    if (images.length == 0) setImageError(errors.image);
    if (pickedCategoryIdCollection.length == 0)
      setCategoryError(errors.category);
    if (
      !productName ||
      !description ||
      !price ||
      images.length == 0 ||
      pickedCategoryIdCollection.length == 0
    ) {
      return false;
    } else {
      return true;
    }
  }

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
    const response = validateForm();
    if (response == false) return;
    const formdata = new FormData();
    formdata.append("name", productName);
    formdata.append("description", description);
    formdata.append("price", price);
    images.forEach((image, index) => {
      formdata.append(`images[${index}]`, image);
    });
    for (let index = 0; index < pickedCategoryIdCollection.length; index++) {
      formdata.append(
        `product_categories_id[]`,
        pickedCategoryIdCollection[index]
      );
    }


    try {
      await addProduct(formdata);
      navigate("/");
    } catch (error) {
      alert("Error");
    }
  }
  if (!isFetched) return;
  return (
    <section>
      <form onSubmit={submitHandler} className={styles.form}>
        <BasicInput
          setValue={(value) => {
            setNameError("");
            setProductName(value);
          }}
          value={productName}
          label="პროდუქტის სახელი"
          name="product-name"
          type="text"
          error={nameError}
        />
        <BasicInput
          setValue={(value) => {
            setDescriptionError("");
            setDescription(value);
          }}
          value={description}
          label="აღწერა"
          name="description"
          type="textarea"
          error={descriptionError}
        />
        <BasicInput
          setValue={(value) => {
            setPriceError("");
            setPrice(value);
          }}
          value={price}
          label="ფასი"
          name="price"
          type="text"
          error={priceError}
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
            onChange={(ev) => {
              setImageError("");
              imagePreviewsHandler(ev);
            }}
            id="images"
            name="images"
            type="file"
            className="opacity-0 absolute top-0 left-0 w-[100%] h-[100%] z-50"
          />
          {imageError && (
            <p className="text-red-600 font-[600] text-[14px] mt-[10px]">
              {imageError}
            </p>
          )}
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
                  if (
                    pickedCategoryIdCollection.length > 1 &&
                    action == "remove"
                  ) {
                    setCategoryError("");
                  }
                  if (action == "add") {
                    setCategoryError("");
                  }
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
        {categoryError && (
          <p className="text-red-600 font-[600] text-[14px]">{categoryError}</p>
        )}
        <div className="w-[10%] flex items-center justify-center mt-[20px]">
          <BasicButton submit={true}>დამატება</BasicButton>
        </div>
      </form>
    </section>
  );
}

export default AddProductPage;
