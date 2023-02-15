/* This example requires Tailwind CSS v3.0+ */
import { useState, useEffect } from "react";
import { Header } from "../../components/common/header";
import { wallet } from "../../index";
import { useAdmin } from "../../utils/useAdmin";
import HumanOnNDC from "../../images/backLines.png";
import { IsSignedInLanding } from "./IsSignedInLanding";
import { supabase } from "../../utils/supabase";
import { toast } from "react-toastify";
import { ApplyCommunityVerify } from "../../components/pages/home/applyCommunityVerify";

export const Landing = ({ isSignedIn, setShowAdmin }) => {
  const [isAdmin] = useAdmin({ address: wallet?.accountId ?? "" });
  const [hasApplied, setHasApplied] = useState(null);
  const [userData, setUserData] = useState({});
  const [showGooddollarVerification, setShowGooddollarVerification] =
    useState(false);
  const [showCommunityVerification, setShowCommunityVerification] =
    useState(false);
  useEffect(() => {
    if (isSignedIn) {
      const fetchUserStatus = async () => {
        const { data } = await supabase
          .from("users")
          .select("*")
          .match({ wallet_identifier: wallet.accountId });
        if (data?.[0]) {
          setUserData(data[0]);
          setHasApplied(true);
        } else {
          setHasApplied(false);
        }
      };
      setTimeout(() => {
        fetchUserStatus();
      }, 1500);
    }
  }, [isSignedIn]);
  return (
    <div className="isolate bg-white">
      <Header setShowAdmin={setShowAdmin} isAdmin={isAdmin} />
      <main>
        <div className={""}>
          <div className={"pb-32 pt-20 sm:pb-40"}>
            <div>
              <div className="md:flex items-center">
                <img
                  src={HumanOnNDC}
                  alt="humans on ndc"
                  className={`h-[600px] hidden md:block w-[60%] ml-[-10%]`}
                />

                <>
                  <div classsName="h-[fit-content] mt-[30px] md:mt-0">
                    <div className="px-10">
                      <p className="text-3xl font-semibold">
                        GET YOUR PROOF OF PERSONHOOD WITH I-AM-HUMAN
                      </p>
                      <p className="text-lg font-light leading-8 text-gray-600">
                        This is your launchpad for several different SBTs, each
                        of which will identify you as a human. With enough of
                        them you will have a strong proof-of-personhood, which
                        can give you access to vote, to apps, to DAOs and more.
                      </p>
                    </div>
                  </div>
                </>
              </div>
            </div>
            <div className="animate-bounce mx-auto bg-white p-2 w-10 h-10 ring-1 ring-slate-900/5 opacity-60 shadow-lg rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-violet-500"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
          <>
            {isSignedIn && (
              <IsSignedInLanding
                hasApplied={hasApplied}
                userData={userData}
                setShowGooddollarVerification={setShowGooddollarVerification}
                showGooddollarVerification={showGooddollarVerification}
              />
            )}
            <ApplyCommunityVerify
              open={showCommunityVerification}
              userData={userData}
              onClose={() => setShowCommunityVerification(false)}
            />
            <div className="relative overflow-hidden">
              <div aria-hidden="true" />
              <div className="relative">
                <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:px-8">
                  <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:pb-16 lg:px-0">
                    <div>
                      <div className="mt-6">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                          Unique Face Verification
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                          We have partenered with Gooddollar for Face
                          Verification.
                        </p>
                        <p className="mt-4 text-lg text-gray-500">
                          Why? They ensure that each user only creates one
                          account, without having to rely on traditional KYC
                        </p>
                        <div className="mt-6">
                          {!hasApplied && (
                            <button
                              onClick={() => {
                                if (isSignedIn) {
                                  setShowGooddollarVerification(true);
                                } else {
                                  wallet.signIn();
                                }
                              }}
                              className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                            >
                              Get It Now
                            </button>
                          )}
                          {hasApplied && (
                            <>
                              {userData?.status === "Application Submitted" && (
                                <div>
                                  <p>
                                    Your application for community SBT has been
                                    submitted
                                  </p>
                                </div>
                              )}
                              {userData?.status === "Application Processed" && (
                                <div>
                                  <p>
                                    Your application for community SBT is being
                                    processed
                                  </p>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 border-t border-gray-200 pt-6">
                      <blockquote>
                        <div>
                          <p className="text-base text-gray-500">
                            &ldquo;The NDC App is really a breakthrough in how
                            we uniqelly identify humans on the web.&rdquo;
                          </p>
                        </div>
                        <footer className="mt-3">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                className="h-6 w-6 rounded-full"
                                src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                                alt=""
                              />
                            </div>
                            <div className="text-base font-medium text-gray-700">
                              Marcia Hill, Web3 Specialist
                            </div>
                          </div>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-12">
              <div className="lg:mx-auto lg:max-w-7xl lg:px-8">
                <div className="mx-auto max-w-xl px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-8 lg:px-0">
                  <div>
                    <div className="mt-6">
                      <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                        OG SBT Application
                      </h2>
                      <p className="mt-4 text-lg text-gray-500">
                        Our team will schedule a quick video chat to validate
                        you in person. Limited edition, max 300.
                      </p>
                      <p className="mt-4 text-lg text-gray-500">
                        Why? We need to create a “seed group” of trusted
                        individuals to bootstrap the next iteration of Community
                        SBT. Stay tuned.
                      </p>
                      <div className="mt-6">
                        {Boolean(userData?.og_sbt_application) ? (
                          <>
                            {userData?.og_sbt_application === "Application Submitted" && (
                              <div>
                                <p>
                                  Your application for OG SBT has been
                                  submitted
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              if (isSignedIn) {
                                if (Boolean(userData?.email)) {
                                  setShowCommunityVerification(true);
                                } else {
                                  toast.error(
                                    "You need to apply for unique face verification before you apply for OG SBT verification"
                                  );
                                }
                              } else {
                                wallet.signIn();
                              }
                            }}
                            className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                          >
                            Get It Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </main>
    </div>
  );
};
