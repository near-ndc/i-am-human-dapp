import { useState, useEffect, useCallback } from "react";
import { api_link, supabase } from "../../../utils/supabase";
import axios from "axios";
import { GrFormAdd } from "react-icons/gr";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineSync } from "react-icons/ai";
import { toast } from "react-toastify";
import { wallet } from "../../..";
import { ShowSbtDetails } from "./ObSbtApplication/showSbtDetails";
import { log_event } from "../../../utils/utilityFunctions";
import { useSuperAdmin } from "../../../utils/super-admins";
import { near_contract } from "../../../utils/contract-addresses";

const HideShowNumber = ({ telegram_number, wallet }) => {
  const [encypted_number, setEncryptedNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const dencrypt_number = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${api_link}/decrypt-pii-number`, {
        wallet,
      });
      setEncryptedNumber(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          class="w-4 h-4 text-gray-100 animate-spin fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      {encypted_number ? (
        <>{encypted_number}</>
      ) : (
        <button
          onClick={() => {
            dencrypt_number();
          }}
        >
          <AiOutlineEye className="text-lg" />
        </button>
      )}
    </div>
  );
};

const ActionButtons = ({
  person,
  fetchUserApplications,
  setSelectedUser,
  setOpen,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading && (
        <>
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-5 h-5 text-gray-200 animate-spin fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </>
      )}
      {!loading && person.og_sbt_application === "Application Submitted" && (
        <>
          <button
            onClick={async () => {
              try {
                setLoading(true);
                await supabase.update(
                  "users",
                  {
                    og_sbt_application: "Approved",
                    og_sbt_approved_by: wallet.accountId,
                  },
                  {
                    wallet_identifier: person.wallet_identifier,
                  }
                );
                await wallet.callMethod({
                  contractId: near_contract,
                  method: "sbt_mint",
                  args: {
                    receiver: person.wallet_identifier,
                    metadata: {
                      ttl: "",
                      memo: "",
                    },
                  },
                });
                log_event({
                  event_log: `${wallet.accountId} approved OG SBT for ${person.wallet_identifier}`,
                  effected_wallet: person.wallet_identifier,
                });
                toast.success("Successfully minted tokers");
              } catch {
                toast.error("An error occurred while minting tokens");
              } finally {
                setLoading(false);
                fetchUserApplications();
              }
            }}
            className="text-indigo-600 p-2 hover:bg-indigo-100 transition-all rounded"
          >
            MINT OG SBT
          </button>
          <button
            onClick={async () => {
              try {
                setLoading(true);
                await supabase.update(
                  "users",
                  {
                    og_sbt_application: "Rejected",
                  },
                  {
                    wallet_identifier: person.wallet_identifier,
                  }
                );
                log_event({
                  event_log: `${wallet.accountId} rejected OG SBT for ${person.wallet_identifier}`,
                  effected_wallet: person.wallet_identifier,
                });
              } finally {
                setLoading(false);
                fetchUserApplications();
              }
            }}
            className="text-red-600 p-2 hover:bg-red-100 transition-all rounded"
          >
            REJECT APPLICATION
          </button>
        </>
      )}
      {!loading && person.og_sbt_application === "Approved" && (
        <button
          onClick={async () => {
            setSelectedUser(person);
            setOpen(true);
          }}
          className="text-indigo-600 p-2 hover:bg-indigo-100 transition-all rounded"
        >
          Show SBT Details
        </button>
      )}
      {!loading && person.og_sbt_application === "Rejected" && (
        <button
          onClick={async () => {
            try {
              setLoading(true);
              await supabase.update(
                "users",
                {
                  og_sbt_application: "Approved",
                  og_sbt_approved_by: wallet.accountId,
                },
                {
                  wallet_identifier: person.wallet_identifier,
                }
              );
              await wallet.callMethod({
                contractId: near_contract,
                method: "sbt_mint",
                args: {
                  receiver: person.wallet_identifier,
                  metadata: {
                    ttl: "",
                    memo: "",
                  },
                },
              });
              log_event({
                event_log: `${wallet.accountId} approved OG SBT for ${person.wallet_identifier}`,
                effected_wallet: person.wallet_identifier,
              });
            } finally {
              setLoading(false);
              fetchUserApplications();
            }
          }}
          className="text-indigo-600 p-2 hover:bg-indigo-100 transition-all rounded"
        >
          MINT OG SBT
        </button>
      )}
    </>
  );
};

export function OgSBTApplicationsTable() {
  const [allApplications, setAllApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);

  const fetchUserApplications = useCallback(async () => {
    setLoading(true);
    try {
      const { error, data } = await supabase.select("users");
      if (error) {
        throw new Error("");
      }
      setAllApplications(
        data?.filter((item) => item.og_sbt_application !== null) ?? []
      );
    } catch (e) {
      console.log(e);
      toast.error("An error occured while fetching applications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserApplications();
  }, [fetchUserApplications]);

  const applicationStatus = ["Application Submitted", "Approved", "Rejected"];
  const [selectedStatus, setSelectedStatus] = useState(applicationStatus);
  const filteredApplications = [...allApplications]?.filter((item) =>
    selectedStatus?.includes(item?.og_sbt_application)
  );

  const { isSuperAdmin: is_super_admin } = useSuperAdmin();

  return (
    <div className="px-6 lg:px-8 mt-4">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-medium text-gray-900">
              Og Sbt Applications
            </h1>
            <button
              onClick={fetchUserApplications}
              className="bg-indigo-100 rounded-full p-2 text-sm"
            >
              <AiOutlineSync className={loading ? "animate-spin" : ""} />
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-700">
            A list of all og sbt applications.
          </p>
        </div>
        <div className="space-x-2 flex">
          <p>Application Status</p>
          {applicationStatus.map((item) => {
            const isIncluded = selectedStatus.includes(item);
            return (
              <span
                className={`inline-flex items-center rounded-full py-0.5 pl-2 pr-0.5 text-xs ${
                  isIncluded
                    ? "bg-indigo-100 text-indigo-700"
                    : "border-indigo-100 border"
                }`}
              >
                {item}
                <button
                  type="button"
                  className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none"
                >
                  <span className="sr-only">Remove small option</span>
                  {selectedStatus.includes(item) ? (
                    <button
                      onClick={() => {
                        setSelectedStatus((d) => {
                          return d.filter((_) => _ !== item);
                        });
                      }}
                    >
                      <svg
                        className="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1l6 6m0-6L1 7"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedStatus((d) => [...d, item]);
                      }}
                    >
                      <GrFormAdd />
                    </button>
                  )}
                </button>
              </span>
            );
          })}
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-medium text-gray-900"
                  >
                    Wallet Address
                  </th>
                  {is_super_admin && (
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-medium text-gray-900"
                    >
                      Telegram Number
                    </th>
                  )}
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-medium text-gray-900"
                  >
                    Application Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-sm font-medium text-gray-900"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {!loading && filteredApplications.length === 0 && (
                  <tr>
                    <td className="py-4 pl-3" colSpan={6}>
                      No Applications Found
                    </td>
                  </tr>
                )}
                {filteredApplications.map((person, personIdx) => (
                  <tr
                    key={person.wallet_identifier}
                    className={personIdx % 2 === 0 ? undefined : "bg-gray-50"}
                  >
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.wallet_identifier}
                    </td>
                    {is_super_admin && (
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <HideShowNumber
                          wallet={person.wallet_identifier}
                          telegram_number={person.telegram_number}
                        />
                      </td>
                    )}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.og_sbt_application}
                    </td>
                    <td className="relative space-x-4 whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium sm:pr-3">
                      <ActionButtons
                        person={person}
                        fetchUserApplications={fetchUserApplications}
                        setSelectedUser={setSelectedUser}
                        setOpen={setOpen}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ShowSbtDetails
        open={open}
        selectedUser={selectedUser}
        setOpen={setOpen}
      />
    </div>
  );
}
