/**
 * Home page - Landing page for the application
 * Server component by default in App Router
 */

import HomePage from '../src/components/pages/HomePage';
import { PublicPageLayout } from '../src/components/layout';

export default function Home() {
  return (
    <PublicPageLayout>
      <HomePage />
    </PublicPageLayout>
  );
}
