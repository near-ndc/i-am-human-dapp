import React from 'react';

export const Tabs = ({ tabs, activeTabIndex, setActiveTabIndex }) => (
  <>
    <div className="flex justify-between p-2">
      {tabs.map((tab, index) => (
        <button
          className="flex flex-col justify-center items-center cursor-default"
          active={index === activeTabIndex ? 'active' : null}
          key={index}
          onClick={() => setActiveTabIndex(index)}
        >
          <div className="rounded-full bg-gray-400 p-3">{tab.header}</div>
          <p
            className={`text-m mt-2 ${
              index === activeTabIndex && 'text-indigo-600 font-bold'
            }`}
          >
            {tab.name}
          </p>
        </button>
      ))}
    </div>
    <div>{tabs[activeTabIndex].content}</div>
  </>
);
