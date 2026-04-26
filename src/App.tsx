/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import LandingPage from './LandingPage.tsx';
import { AuthProvider } from './lib/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <LandingPage />
    </AuthProvider>
  );
}
