const VerticalScoreboard = ({ communities = [] }) => {
  const sortedCommunities = [...communities].sort(function (a, b) {
    var keyA = a.usercount,
      keyB = b.usercount;
    // Compare the 2 dates
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });
  return (
    <div className="shadow bg-white m-1 p-4 rounded-md">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl text-center font-semibold leading-6 text-gray-900">
            Vertical Scoreboard
          </h1>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Vertical Name
                  </th>
                  <th
                    scope="col"
                    className="text-center px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Onboarded Users
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {sortedCommunities?.map((community) => (
                  <tr key={community.id}>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {community.vertical}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{community.usercount}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalScoreboard;
