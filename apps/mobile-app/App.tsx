import React, { useState } from 'react';
import { AuthProvider } from './src/store/AuthContext';
import OnboardingFlow from './src/screens/onboarding/OnboardingFlow';
import HomeScreen from './src/screens/main/HomeScreen';

export default function App() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  return (
    <AuthProvider>
      {!hasCompletedOnboarding ? (
        <OnboardingFlow onComplete={() => setHasCompletedOnboarding(true)} />
      ) : (
        <HomeScreen />
      )}
    </AuthProvider>
  );
}


