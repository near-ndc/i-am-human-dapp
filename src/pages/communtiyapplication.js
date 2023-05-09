import { Footer } from '../components/common/footer';
import { Header } from '../components/common/header';
import { CommunitiesApplication } from '../components/pages/landing/communitiesApplication';

export const CommunityApplicationPage = () => {
  return (
    <div>
      <Header />
      <div className="lg:mx-auto lg:max-w-7xl lg:px-8">
        <CommunitiesApplication />
      </div>
      <Footer />
    </div>
  );
};
