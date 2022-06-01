import { SearchIcon } from "@components/icons/search-icon";
import Button from "@components/ui/button";
import Input from "@components/ui/input";
import { useState } from "react";

type Iprops={

    setShopName:any;
}

const ShopSearch=({setShopName}:Iprops)=>{
        const [name,setName]=useState<string>("");
    return(
        <div className="mb-4 flex justify-center">
        <Input className="h-14 w-full" name=""
        value={name}
        onChange={e=>setName(e.currentTarget.value)}
        />
          <button className="h-full px-8 flex items-center rounded-lg rounded-ts-none rounded-bs-none bg-accent text-light font-semibold transition-colors duration-200s focus:outline-none hover:bg-accent-hover h-12  focus:bg-accent-hover"
          onClick={()=>{
            setShopName(name);
          }}
          >
            
            <SearchIcon className="w-4 h-4 me-2.5" />
            Recherche
          </button>
        </div>

    );
}

export default ShopSearch;