
import PageHeading from "./PageHeading";
import ProductListings from "./ProductListings";
import apiClient from "../api/apiClient";
import { useState, useEffect} from "react";
import { useLoaderData } from "react-router-dom";


export default function Home() {

// const [products, setProducts] = useState([]);
// const [loading, setLoading] = useState();
// const [error, setError] = useState(null);

// useEffect(() =>{
//   fetchProducts();
// },[])

// const fetchProducts= async()=>{

//   try{
//       setLoading(true); // set loading state to true
//      const response = await apiClient.get("/products"); // Axios get request
//   setProducts(response.data); // update  products state with the fetched data
//   }catch(error){

// setError(
//   error.response?.data?.message || "An error occurred while fetching products."
// ); // extract error message if available

//   }finally{
// setLoading(false); // set loading state to false
//   }

 
// };

// if(loading){
//   return(
//     <div className="flex items-center justify-center h-screen">
//       <p className="text-xl font-semibold">Loading products...</p>
//     </div>
//   );
// }
// if(error){
//   return(
//     <div className="flex items-center justify-center h-screen">
//       <p className="text-xl font-semibold text-red-500">Error:{error}</p>
//     </div>    
//   );
// }

  const products = useLoaderData();

  return (
    <div className="max-w-[1152px] mx-auto px-6 py-8">
      <PageHeading title="Explore Crazy Stickers!">
        Add a touch of creativity to your space with our wide range of fun and
        unique stickers. Perfect for any occasion!
      </PageHeading>
      <ProductListings products={products} />
    </div>
  );
}


// export async function productsLoader(){
//      try{
//      const response = await apiClient.get("/products"); 
//   return  response.data; 
//   }catch(error){
//     throw new Response(
//       error.response?.data?.errorMessage || error.message|| "Failed to fetch products. Please try again.",
//       {status:error.status || 500}
//     );
//    }
// }

export async function productsLoader() {
  try {
    const response = await apiClient.get("/api/v1/products");
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.errorMessage ||
      "Server is waking up. Please try again in a moment.";

    const status = error.response?.status || 500;

    throw new Response(message, { status });
  }
}

