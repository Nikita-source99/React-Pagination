import { useEffect, useState } from "react";
import "./styles.css";

const ProductCard = ({ product }: { product: any }) => {
  return (
    <div className="product-card">
      <img
        src={product.images}
        alt={product.title}
        style={{ width: "200px" }}
      />
      <h3 style={{ width: "200px", color: "#787878", height: "55px" }}>
        {product.title}
      </h3>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default function App() {
  const [Products, setProducts] = useState<any[]>([]);
  const pageNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  console.log("Products", Products);

  const fetchData = async () => {
    try {
      const data = await fetch("https://dummyjson.com/products?limit=100");
      const jsonData = await data.json();
      setProducts(jsonData.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let totalPages = Products.length - 1;
  let totalPage = Math.ceil(totalPages / itemsPerPage);
  let startIndex = (currentPage - 1) * 10;
  let selectedProducts = Products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="App">
      <h1>React - Pagination</h1>
      <div>
        <button
          className="pageNum"
          style={{ background: "yellow" }}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage == 1}
        >
          ◀️
        </button>
        {pageNum.map((i) => {
          return (
            <button
              className="pageNum"
              key={i}
              onClick={() => setCurrentPage(i)}
              style={{
                background: currentPage === i ? "pink" : "",
                border: currentPage === i ? "3px solid gray " : "",
              }}
            >
              {i}
            </button>
          );
        })}
        <button
          className="pageNum"
          style={{ background: "yellow" }}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPage}
        >
          ▶️
        </button>
      </div>

      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {" "}
        {selectedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
