import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Logo from '../../images/ndc.png';

const navigation = {
  usefullLinks: [
    {
      name: 'I AM HUMAN DOCS',
      href: 'https://i-am-human.gitbook.io/i-am-human-docs/',
    },
    {
      name: 'Feedback Form',
      href: 'https://hr6bimbyqly.typeform.com/to/wVhraeUG',
    },
    {
      name: 'Community Application for SBT',
      to: '/community-application',
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-8">
            <img className="h-20 w-20" src={Logo} alt="Company name" />
            <p className="text-sm leading-6 text-gray-600">
              I AM HUMAN is a part of NEAR DIGITAL COLLECTIVE
            </p>
          </div>
          <div class="col-span-1" />
          <div class="col-span-1" />
          <div className="mt-10 md:mt-0">
            <ul role="list" className="mt-6 space-y-4">
              {navigation.usefullLinks.map((item) => (
                <li key={item.name}>
                  {Boolean(item.to) ? (
                    <Link
                      to={item.to}
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500">
            &copy; 2023 NDC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
