import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Logo from '../../images/ndc.png';

const navigation = [
  {
    header: 'Product',
    links: [
      {
        name: 'I-AM-HUMAN Docs',
        href: 'https://i-am-human.gitbook.io/i-am-human-docs/',
      },
      {
        name: 'Product Feedback',
        href: 'https://hr6bimbyqly.typeform.com/to/wVhraeUG',
      },
      {
        name: 'Bug Report',
        href: 'https://github.com/near-ndc/i-am-human-dapp/issues',
      },
    ],
  },
  {
    header: 'Resources',
    links: [
      {
        name: 'NDC Docs',
        href: 'https://near.social/#/neardigitalcollective.near/widget/NDCDocs_OneArticle?articleId=TheNDC&blockHeight=92179204&lastEditor=blaze.near',
      },
      {
        name: 'Community Dashboard',
        to: '/community-scoreboard',
      },
      {
        name: 'NDC Gigs',
        href: 'https://near.social/#/neardigitalcollective.near/widget/Gigs',
      },
    ],
  },
  {
    header: 'About Us',
    links: [
      {
        name: 'Join us',
        href: 'https://t.me/+fcNhYGxK891lMjMx',
      },
      {
        name: 'Refer Friends',
        href: 'https://near.org/sking.near/widget/IAH.Invite',
      },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="bg-white border-t border-gray-900/10"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="pt-10 lg:pt-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-8 gap-10">
          <div className="flex md:justify-center items-center lg:row-span-2 md:row-span-3">
            <img
              style={{ width: '40%' }}
              className="object-fill object-center"
              src={Logo}
              alt="Company name"
            />
          </div>

          {navigation.map((nav) => (
            <div className="mt-10 md:mt-0">
              <h2>{nav.header}</h2>
              <ul role="list" className="mt-6 space-y-4">
                {nav.links.map((item) => (
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
          ))}
          <div>
            <form action="">
              <p class="text-secondary-800 dark:text-secondary-200">
                <strong>Subscribe to our Newsletter</strong>
              </p>
              <div class="mt-4 flex">
                <input
                  type="text"
                  className="p-2 bg-gray-100 border border-grey-light round text-grey-dark text-sm h-auto rounded-tl-md rounded-bl-md"
                  placeholder="Input your email"
                />
                <button className="inline-flex rounded-tr-md rounded-br-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex items-center mt-16 border-t border-gray-900/10 pt-10 lg:mt-20 mb-5 gap-5">
          <div className="flex-1"></div>
          <p className="text-xs text-center text-gray-500">
            &copy; 2023 NDC. All rights reserved.
          </p>
          <div className="flex flex-1 items-center justify-end space-x-4">
            {/* Twitter */}
            <a
              href="https://twitter.com/neardc"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <div className="bg-gray-100 rounded-lg p-2">
                <svg viewBox="0 0 24 24" fill="black" className="h-5">
                  <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                </svg>
              </div>
            </a>
            {/* Telegram */}
            <a
              href="https://t.me/c/1708163325/1"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
            >
              <div className="bg-gray-100 rounded-lg p-2">
                <svg viewBox="0 0 16 16" fill="black" className="h-5">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />{' '}
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
