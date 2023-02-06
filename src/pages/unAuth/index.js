/* This example requires Tailwind CSS v3.0+ */
import { Header } from "../../components/common/header";
import { wallet } from "../../index";
import { useAdmin } from "../../utils/useAdmin";
import HumanOnNDC from "../../images/backLines.png";
import { IsSignedInLanding } from "./IsSignedInLanding";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export const Landing = ({ isSignedIn }) => {
  const isAdmin = useAdmin({ address: wallet?.accountId ?? "" });
  return (
    <div className="isolate bg-white">
      <Header isAdmin={isAdmin} />
      <main>
        <div className={isSignedIn ? "relative px-6 lg:px-8" : ""}>
          <div
            className={`${
              isSignedIn ? "max-w-3xl mx-auto pt-10" : "pb-32 pt-20 sm:pb-40"
            }`}
          >
            <div>
              <div className="md:flex items-center">
                <img
                  src={HumanOnNDC}
                  alt="humans on ndc"
                  className={`${
                    isSignedIn
                      ? "hidden"
                      : "h-[600px] hidden md:block w-[60%] ml-[-10%]"
                  }`}
                />
                {isSignedIn ? (
                  <IsSignedInLanding />
                ) : (
                  <>
                    <div classsName="h-[fit-content] mt-[30px] md:mt-0">
                      <div className="px-10">
                        <p className="text-3xl">
                          GET YOUR PROOF OF PERSONHOOD WITH I-AM-HUMAN
                        </p>
                        <p className="text-lg leading-8 text-gray-600">
                          This is your launchpad for several different SBTs,
                          each of which will identify you as a human. With
                          enough of them you will have a strong
                          proof-of-personhood, which can give you access to
                          vote, to apps, to DAOs and more.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden pt-16 pb-32">
            <div
              aria-hidden="true"
            />
            <div className="relative">
              <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
                <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
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
                        <a
                          href="#"
                          className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                        >
                          Get It Now
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <blockquote>
                      <div>
                        <p className="text-base text-gray-500">
                          &ldquo;The NDC App is really a breakthrough in how we
                          uniqelly identify humans on the web.&rdquo;
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
                <div className="mt-12 sm:mt-16 lg:mt-0">
                  <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                    <img
                      className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                      src="https://tailwindui.com/img/component-images/inbox-app-screenshot-1.jpg"
                      alt="Inbox user interface"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-24">
            <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
              <div className="mx-auto max-w-xl px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
                <div>
                  <div className="mt-6">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                      Community Verification
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                      Our team will schedule a quick video chat to validate you
                      in person. Limited edition, max 300.
                    </p>
                    <p className="mt-4 text-lg text-gray-500">
                      Why? We need to create a “seed group” of trusted
                      individuals to bootstrap the next iteration of Community
                      SBT. Stay tuned.
                    </p>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                      >
                        Get It Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
                <div className="-ml-48 pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                  <img
                    className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                    src="https://tailwindui.com/img/component-images/inbox-app-screenshot-2.jpg"
                    alt="Customer profile user interface"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
