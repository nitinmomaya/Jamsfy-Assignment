import React from "react";

function ProductShimmer() {
  return (
    <div className="w-96 h-max bg-white p-8 rounded-md border-solid border-[1px] border-slate-100">
      <div className="my-4">
        <div
          className="w-80 bg-slate-300 aspect-square object-contain"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="w-60 h-4 bg-slate-300"></div>

        <div className="w-60 h-4 bg-slate-300"></div>
        <div className="w-60 h-6 bg-slate-300"></div>
        <div className="w-60 h-4 bg-slate-300">
          <div className="w-60 h-4 bg-slate-300"></div>
          <div className="w-60 h-4 bg-slate-300"></div>
        </div>
      </div>
    </div>
  );
}

export default ProductShimmer;
