import { ITEM_PER_PAGE } from "../utils/constants";

const pagination = ({
  currentPage,
  totalItems,
  onPageChange,
  isPreviousData,
}) => {
  const pageCount = Math.ceil(totalItems / ITEM_PER_PAGE);
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNextClick = () => {
    if (currentPage < pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  
  return (
    <div className="join">
      <button
        disabled={currentPage === 1 || isPreviousData}
        onClick={handlePrevClick}
        className="join-item btn"
      >
        «
      </button>
      <button className="btn">Page {currentPage}</button>
      <button
        disabled={currentPage === pageCount || isPreviousData}
        onClick={handleNextClick}
        className="join-item btn"
      >
        »
      </button>
    </div>
  );
};

export default pagination;
