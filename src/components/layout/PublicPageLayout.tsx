/**
 * PublicPageLayout component
 * Layout for public pages (homepage) with TopBar
 */

'use client';

import { TopBar } from './index';

interface PublicPageLayoutProps {
  children: React.ReactNode;
}

export default function PublicPageLayout({ children }: PublicPageLayoutProps) {
  return (
    <>
      <TopBar />
      <main>{children}</main>
    </>
  );
}
