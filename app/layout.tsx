import '@/assets/styles/globals.css';

export const metadata = {
  title: 'Property Pulse',
  keywords: 'rentl, property, real estate',
  description: 'find the perfect rental property',
};

const MainLayout = ({children}) => {
  return ( 
    <html>
        <body>
          {children}
        </body>
      </html>
   );
};
 
export default MainLayout;