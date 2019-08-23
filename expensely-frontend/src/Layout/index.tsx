import React, { useContext, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ThemeContext, IThemeContext } from '../utils/ThemeContext';

interface ILayoutProps {
  children?: ReactNode | ReactNode[];
}

const Layout: React.FC = ({ children }: ILayoutProps) => {
  const themeObject: IThemeContext = useContext(ThemeContext);

  let bg = '#faf9f8';

  if (themeObject.theme === 'dark') {
    bg = '#292827';
  }

  return (
    <>
      <Header />
      <main style={{ minHeight: '90vh', backgroundColor: bg }}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
