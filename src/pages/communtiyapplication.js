import React from 'react';
import { Footer } from '../components/common/footer';
import { Header } from '../components/common/header';
import { CommunitiesApplication } from '../components/pages/landing/communitiesApplication';

export const CommunityApplicationPage = ({ isSignedIn }) => {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current.scrollTo(0, 0);
  }, []);
  return (
    <div ref={ref}>
      <Header />
      <div className="lg:mx-auto lg:max-w-7xl lg:px-8 px-6">
        <CommunitiesApplication isSignedIn={isSignedIn} />
      </div>
      <Footer />
    </div>
  );
};
