import React, { useState } from "react";

import { Header } from "../../components/common/header";
import { Tabs } from "../../components/pages/home/tabs";
import { wallet } from "../../index";
import { DonatePanel } from "../../components/pages/home/DonatePanel";
import { useAdmin } from "../../utils/useAdmin";

export const Home = () => {
  const [isAdmin] = useAdmin({ address: wallet.accountId });

  const [isDonatePanelOpen, setIsDonatePanelOpen] = useState(false)

  return (
    <>
      <Header isAdmin={isAdmin} />
      <div className="px-6">
        <Tabs isAdmin={isAdmin} />
      </div>
      <DonatePanel
        isOpen={isDonatePanelOpen}
        closeModal={() => setIsDonatePanelOpen(false)}
      />
      <div className="w-screen text-center py-4">
        <button
          onClick={() => setIsDonatePanelOpen(true)}
          className="bg-black text-white rounded shadow-lg tracking-wide mx-auto font-medium w-[fit-content] text-xs p-3 md:fixed md:bottom-2 md:right-2"
        >
          Donate to this awesome initiative
        </button>
      </div>
    </>
  );
};
