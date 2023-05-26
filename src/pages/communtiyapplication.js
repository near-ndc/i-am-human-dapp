import React from 'react';
import { Footer } from '../components/common/footer';
import { Header } from '../components/common/header';
import { CommunitiesApplication } from '../components/pages/landing/communitiesApplication';

export const CommunityApplicationPage = ({ isSignedIn }) => {
  const ref = React.useRef();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="isolate bg-white mx-auto max-w-7xl px-5 pt-10" ref={ref}>
      <Header />
      <CommunitiesApplication isSignedIn={isSignedIn} />
      <Footer />
    </div>
  );
};
