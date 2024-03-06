import React from "react";

export default function LoadingSecond() {
  return (
    <div>
      <div className="md:flex justify-between animate-pulse ">
        <div className=" h-[50vh] md:h-[80vh] bg-slate-200  md:w-[40%] rounded-md  m-5">
          {" "}
        </div>
        <div className="md:w-[50%] content-center grid md:gap-y-7 gap-y-3 m-5">
          <div className="bg-slate-200 h-7 md:w-[20vw] w-[40vw] rounded-xl md:mb-7"></div>
          <div className="bg-slate-200 h-7 md:w-[35vw] w-[80vw] rounded-xl "></div>
          <div className="bg-slate-200 h-7 md:w-[40vw] w-[70vw] rounded-xl "></div>
          <div className="bg-slate-200 h-7 md:w-[35vw] rounded-xl w-[75vw]"></div>
          <div className="bg-slate-200 h-7 md:w-[40vw] rounded-xl  w-[85vw]"></div>
          <div className=" flex  gap-x-5">
            <div className="bg-slate-200 h-7 md:w-[5vw] w-[20vw] rounded-sm"></div>
            <div className="bg-slate-200 h-7 md:w-[5vw] w-[20vw] rounded-sm"></div>
            <div className="bg-slate-200 h-7 md:w-[5vw] w-[20vw] rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
