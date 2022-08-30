import { Children, useState } from "react";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

const Tab = ({children }: any) => {
const [active,setActive]=useState(0);
const tabs=children.map((child: any,index:number)=>({name:child.props.title, id: index, current: index===active }));
  return (
    <div>
     {/* <div className="">
        <label htmlFor="tabs" className="sr-only">
          Choisir une menu
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
          defaultValue={tabs.find((tab) => tab.id===active).name}
          onChange={(e)=>setActive(parseInt(e.currentTarget.value))}
        >
          {tabs.map((tab) => (
            <option value={tab.id} key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div> */}
      <div className="">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                onClick={()=>setActive(tab.id)}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "w-1/6 py-4 px-1 text-center border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
      {children[active]}
    </div>
  );
};
export default Tab;
