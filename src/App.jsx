import { useState } from "react";
import PropTypes from "prop-types";
import "./App.css";

const Product = ({
  id,
  title,
  description,
  isLiked = false,
  deleteProduct,
  likeProduct,
}) => {
  return (
    <div key={title} style={{ border: "1px solid" }}>
      <h2>{title}</h2>
      <p>{description}</p>
      {isLiked ? (
        <i
          className="fa-solid fa-heart"
          onClick={() => likeProduct(id, false)}
        ></i>
      ) : (
        <i
          className="fa-regular fa-heart"
          onClick={() => likeProduct(id, true)}
        ></i>
      )}
      <button>Edit</button>
      <button onClick={() => deleteProduct(id)}>Delete</button>
    </div>
  );
};

Product.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string,
  description: PropTypes.string,
  isLiked: PropTypes.bool,
  deleteProduct: PropTypes.func,
  likeProduct: PropTypes.func,
};

function App() {
  const [formData, setFormData] = useState({
    title: "",
  });

  // a simple array state to hold the values of the products in the UI
  const [products, setProducts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Values", formData);
    createProduct(formData);
  };

  // fucntion for create Product
  const createProduct = (pdData) => {
    const temp = {
      ...pdData,
      // use Date.now().toString()
      id: Date.now().toString(),
      isLiked: false,
    };

    setProducts([...products, temp]);
  };

  // Delete Product
  // filter the aray with the particular product
  const deleteProduct = (delId) => {
    setProducts(products.filter((product) => product.id !== delId));
  };

  const likeProduct = (prodId, val) => {
    // Identify the index of the product
    const index = products.findIndex(({ id }) => id === prodId);

    const temp = { ...products[index] };

    temp.isLiked = val;

    const tempProducts = [...products];

    tempProducts[index] = temp;

    setProducts(tempProducts);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create of a product into the UI

  return (
    <>
      {console.log(formData)}
      {console.log(products)}
      <h3>Product Creation / Updation </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleChange}
          name="title"
          id="title"
          placeholder="Enter Title"
        />
        <br />
        <br />
        <textarea
          type="text"
          onChange={handleChange}
          name="description"
          id="description"
          placeholder="Enter Description"
        />
        <br />
        <button type="submit">Submit</button>
        <br />
      </form>
      {/* {products.map(({ title, description }) => (
          <Product key={title} title={title} description={description} />
        ))} */}
      {products.map((prod) => (
        <Product
          key={prod.id}
          likeProduct={likeProduct}
          deleteProduct={deleteProduct}
          {...prod}
        />
      ))}
    </>
  );
}

export default App;
