import React from "react";

const Dropdown = ({ title, options,func }) => {
  return (
    <div >
      <select onChange={func} defaultValue="0" name="format" className="px-5 py-2 rounded-md bg-zinc-200 text-black cursor-pointer hover:bg-zinc-400 ">
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o,i)=>(
            <option key={i} value={o}>{o.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
