import { useParams } from 'react-router-dom';
import { useQuery } from "react-query";
import { getDetails } from "../../services/api";

// eslint-disable-next-line react/prop-types
const Details = () => {
  const {id} = useParams()
  const { data: dataDetail, isLoading  } =
  useQuery({
    queryKey: ["detail"],
    queryFn: () => getDetails(id),
    keepPreviousData: true,
  });
console.log("data",dataDetail)
  return (
    <div className="grid  w-[95%] justify-center ">
      {!isLoading&&
        <div key={dataDetail._id} className="shadow-xl flex mt-11 bg-base-200 rounded-3xl text-white items-center">
          <div className=''>
            <img className='rounded-xl' src={`http://localhost:8000/${dataDetail.image[0]}`} alt="Shoes" />
          </div>

          <div className="card-body w-[50%] ml-11">
       
            <h2 className="card-title">
              {dataDetail.name}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p className='mt-2'>Color: {dataDetail.color}</p>
            <p className='mt-2'>Size: {dataDetail.size}</p>
            <p className='mt-2'>Price: {dataDetail.price}$</p>
            <p className='mt-2'>Detail: {dataDetail.detail}</p>
            <div className="card-actions justify-center mt-14">
        
              <div className="w-96 h-7 badge badge-outline font-bold bg-slate-500">Add to Cart</div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Details;