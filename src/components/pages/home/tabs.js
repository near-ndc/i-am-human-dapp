import React, { useEffect, useMemo, useState } from "react";
import { GiToken } from "react-icons/gi";

import { ManageAdmin } from "./manageAdmin";
import { ManageTokens } from "./manageTokens";
import { CheckSbtTokenStatus } from "./myOwnSbt";
import { Gooddollar } from "./Gooddollar";

export const Tabs = ({ isAdmin }) => {
  const [activeTab, setActiveTab] = React.useState("My own SBT");

  const tabs = useMemo(
    () => [
      ...(isAdmin
        ? [
            {
              name: "Manage Council Members",
              icon: (
                <svg
                  aria-hidden="true"
                  className={`mr-2 w-5 h-5 ${
                    activeTab === 0 ? "text-blue-600" : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ),
            },
            {
              name: "Manage SBT / Verified",
              icon: (
                <svg
                  aria-hidden="true"
                  className={`mr-2 w-5 h-5 ${
                    activeTab === 1 ? "text-blue-600" : "text-gray-400"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              ),
            },
          ]
        : []),
      {
        name: "My own SBT",
        icon: (
          <div className="text-xl mr-[8.5px]">
            <GiToken />
          </div>
        ),
      },
      {
        name: "Login With Gooddollar",
        icon: (
          <img
            alt="gooddollar"
            className="h-5 w-5 mr-2 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE1Gk1xMuY_r6bWOXVzgjwIHbf_CAYBAJ1gW22uAMSm50HgICijvdUu8oLkoa-xpu-tcI&usqp=CAU"
          />
        ),
      },
    ],
    [isAdmin, activeTab]
  );

  const [isdone, setIsDone] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("login") && !isdone) {
      setActiveTab(() => {
        setIsDone(true);
        return "Login With Gooddollar";
      });
    }
  }, [isAdmin, tabs, isdone]);

  return (
    <>
      <div className="border-b border-gray-300">
        <ul className="flex -mb-px text-sm font-medium text-center text-gray-500 overflow-x-auto dark:text-gray-400">
          {tabs.map((item, index) => (
            <div key={item.name} className="mr-2">
              <button
                onClick={() => setActiveTab(item.name)}
                className={`p-4 rounded-t-lg w-60 border-b-2 border-transparent ${
                  activeTab === item.name
                    ? "border-blue-600 text-blue-600"
                    : "border-gray-400 text-gray-400"
                }`}
              >
                <div className="inline-flex mx-auto">
                  {item?.icon}
                  {item.name}
                </div>
              </button>
            </div>
          ))}
        </ul>
      </div>
      {isAdmin ? (
        <>
          {activeTab === "Manage Council Members" && <ManageAdmin />}
          {activeTab === "Manage SBT / Verified" && <ManageTokens />}
          {activeTab === "My own SBT" && <CheckSbtTokenStatus />}
          {activeTab === "Login With Gooddollar" && <Gooddollar />}
        </>
      ) : (
        <CheckSbtTokenStatus />
      )}
    </>
  );
};
