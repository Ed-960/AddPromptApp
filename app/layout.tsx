import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { RootLayoutProps } from '@interfaces/interfaces';
import '@styles/globals.css';

export const metaData = {
  title: 'Promptopia',
  description: 'Discover & Share Prompts'
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;
