import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '@nuvois/ui-theme';
import { TopBar, NestedTabs, SmartFeed, TabKey } from '../../components/home';
import { BottomTabBar, AIActionModal } from '../../components/navigation';
import ShopScreen from './ShopScreen';
import WardrobeScreen from './WardrobeScreen';
import ProfileScreen from './ProfileScreen';

// Mock user data
const MOCK_USER = {
  name: 'Nishant ',
};

// Mock weather data
const MOCK_WEATHER = {
  temperature: 24,
  condition: 'partly-cloudy',
  location: 'Ahmedabad',
};

export default function HomeScreen() {
  const [activeNestedTab, setActiveNestedTab] = useState<TabKey>('forYou');
  const [activeBottomTab, setActiveBottomTab] = useState<'home' | 'closet' | 'ai' | 'shop' | 'profile'>('home');
  const [isAIModalVisible, setIsAIModalVisible] = useState(false);

  const handleSearchPress = () => {
    console.log('Search pressed');
  };

  const handleNotificationPress = () => {
    console.log('Notifications pressed');
  };

  const handleBottomTabPress = (tab: 'home' | 'closet' | 'ai' | 'shop' | 'profile') => {
    if (tab !== 'ai') {
      setActiveBottomTab(tab);
    }
  };

  const handleAIPress = () => {
    setIsAIModalVisible(true);
  };

  const handleScanItem = () => {
    console.log('Scan new item');
  };

  const handleBodyScan = () => {
    console.log('Body scan');
  };

  const handleARTryOn = () => {
    console.log('AR try-on');
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {activeBottomTab === 'home' && (
          <>
            <TopBar
              userName={MOCK_USER.name}
              weather={MOCK_WEATHER}
              notificationCount={3}
              onSearchPress={handleSearchPress}
              onNotificationPress={handleNotificationPress}
            />

            <NestedTabs
              activeTab={activeNestedTab}
              onTabChange={setActiveNestedTab}
            />

            <SmartFeed activeTab={activeNestedTab} />
          </>
        )}

        {activeBottomTab === 'shop' && <ShopScreen />}
        {activeBottomTab === 'closet' && <WardrobeScreen />}
        {activeBottomTab === 'profile' && <ProfileScreen />}

        <BottomTabBar
          activeTab={activeBottomTab}
          onTabPress={handleBottomTabPress}
          onAIPress={handleAIPress}
        />

        <AIActionModal
          visible={isAIModalVisible}
          onClose={() => setIsAIModalVisible(false)}
          onScanItem={handleScanItem}
          onBodyScan={handleBodyScan}
          onARTryOn={handleARTryOn}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
