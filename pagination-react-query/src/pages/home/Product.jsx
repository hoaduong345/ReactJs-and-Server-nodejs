import ProductList from "../../components/ProductList";
import Pagination from "../../components/pagination";
import LoadingSpinner from "../../components/loadingSpinner";
import { useQuery } from "react-query";
import { getProductList } from "../../services/api";
import { useState } from "react";
const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [page] = useState(1);

    
  const { isLoading, isError, error, isFetching, isPreviousData, data  } =
    useQuery({
      queryKey: ["posts", currentPage],
      queryFn: () => getProductList(currentPage),
      keepPreviousData: true,
    });
  console.log("data", data?.data.data);
  // console.log("page",currentPage)

  if (isLoading) return "loading...";
  if (isError) return `Error:${error.message}`;
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-center text-2xl my-5 underline font-bold">
        Pagination
      </h1>
      <ProductList products={!isLoading ? data.data.data : []} />
      <div className="flex items-center justify-between my-5">
        <Pagination
          currentPage={currentPage}
          totalItems={!isLoading && data.data.total}
          onPageChange={(currentPage) => setCurrentPage(currentPage)}
          isPreviousData={isPreviousData}
          page = {page}
        />
        {isFetching ? <LoadingSpinner /> : null}
      </div>
    </div>
  );
};

export default Product;
