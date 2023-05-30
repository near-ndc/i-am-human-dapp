import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const CustomizedLabel = (props) => {
  const { payload } = props;
  return (
    <div className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
      {payload.value}
    </div>
  );
};

export const UserDataTable = ({ userData }) => {
  // Helper function to get week of the year
  function getWeek(date) {
    let firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    let numberOfDays = Math.floor(
      (date - firstDayOfYear) / (24 * 60 * 60 * 1000)
    );
    return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
  }

  function weeklyUserGrowth(data) {
    // Parse dates and sort data
    data.forEach((item) => {
      item.created_at = new Date(item.created_at);
    });
    data.sort((a, b) => a.created_at - b.created_at);

    // Get the first week to normalize the data
    const firstWeek = getWeek(data[0].created_at);
    const lastWeek = getWeek(data[data.length - 1].created_at);

    // Create a list of all communities
    const communities = Array.from(
      new Set(data.map((item) => item['community-name']))
    );

    // Initialize weeklyData with all week-community pairs
    let weeklyData = {};
    for (let week = 0; week <= lastWeek - firstWeek + 1; week++) {
      // +1 to include week 0
      weeklyData[week] = {};
      communities.forEach((community) => {
        weeklyData[week][community] = 0;
      });
    }

    // Fill weeklyData with actual data
    data.forEach((item) => {
      let week = getWeek(item.created_at) - firstWeek + 1; // Normalize week number
      let community = item['community-name'];
      weeklyData[week][community]++;
    });

    // Create weekly growth array
    let growthArray = [];
    for (let week in weeklyData) {
      let weekData = { week: `Week ${week}` }; // Use string week numbers for better tooltip readability
      for (let community in weeklyData[week]) {
        weekData[community] = weeklyData[week][community];
      }
      growthArray.push(weekData);
    }

    return growthArray;
  }

  let growth = weeklyUserGrowth(userData);
  const lines = Object.keys(growth[0]).filter((key) => key !== 'week');
  const colors = [
    '#1f77b4', // muted blue
    '#ff7f0e', // safety orange
    '#2ca02c', // cooked asparagus green
    '#d62728', // brick red
    '#9467bd', // muted purple
    '#8c564b', // chestnut brown
    '#e377c2', // raspberry yogurt pink
    '#7f7f7f', // middle gray
    '#bcbd22', // curry yellow-green
    '#17becf', // blue-teal
  ];
  const parentRef = React.useRef();
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    setWidth(parentRef?.current?.offsetWidth);
  }, []);

  return (
    <div className="shadow bg-white m-1 p-4 rounded-md">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Weekly User Growth
          </h1>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className=" -my-2 overflow-x-auto">
          <div className="flex  flex-wrap">
            {Object.keys(growth[0] || {}).map(
              (key, index) =>
                key !== 'week' && (
                  <div
                    key={key}
                    className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                  >
                    <div
                      style={{
                        backgroundColor: colors[index],
                        height: '12px',
                        width: '12px',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '5',
                      }}
                    />{' '}
                    {key}
                  </div>
                )
            )}
          </div>
          <div className="inline-block min-w-full py-2 align-middle px-2">
            <div ref={parentRef}>
              <LineChart
                width={width - 20}
                height={(document.body.offsetHeight * 70) / 100}
                data={growth}
                margin={{ top: 5, right: 50, left: -20, bottom: 15 }}
                className="bg-white shadow-md p-4 rounded-md"
              >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="week" />
                <YAxis tickCount={3} />
                <Tooltip />
                {Object.keys(growth[0] || {}).map(
                  (key, idx) =>
                    key !== 'week' && (
                      <Line
                        type="monotone"
                        dataKey={key}
                        stroke={colors[idx]}
                        activeDot={{ r: 8 }}
                        key={key}
                      />
                    )
                )}
              </LineChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
