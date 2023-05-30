import React from "react";

function Loader() {
  return (
    <div className="grid place-content-center py-36 h-screen">
      <div className="h-20 w-20 rounded-full border-4 border-l-stone-400 border-black animate-spin text-white text-center"></div>
    </div>
  );
}

export default Loader;
