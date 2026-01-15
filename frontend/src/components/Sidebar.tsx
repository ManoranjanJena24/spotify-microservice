
// const Sidebar = () => {
//   return (
//     <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">Sidebar</div>
//   )
// }

import { useNavigate } from "react-router-dom";

// export default Sidebar



const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div 
          className="flex items-center gap-3 pl-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
         <img src="/home.png" alt="" className="w-6"/>
          <p className="font-bold">Home</p>
        </div>
      </div>
      
      {/* Niche wala Library section yahan add kar sakte ho */}
      <div className="bg-[#121212] h-[85%] rounded mt-2">
         {/* Library Content */}
      </div>
    </div>
  );
};

export default Sidebar