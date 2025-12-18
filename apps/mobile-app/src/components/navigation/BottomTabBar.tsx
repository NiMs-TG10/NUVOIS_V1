import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@nuvois/ui-theme';

const { width } = Dimensions.get('window');

type TabName = 'home' | 'closet' | 'ai' | 'shop' | 'profile';

interface BottomTabBarProps {
    activeTab: TabName;
    onTabPress: (tab: TabName) => void;
    onAIPress: () => void;
}

interface TabItem {
    key: TabName;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconFilled: keyof typeof Ionicons.glyphMap;
}

const TABS: TabItem[] = [
    { key: 'home', label: 'Home', icon: 'home-outline', iconFilled: 'home' },
    { key: 'closet', label: 'Closet', icon: 'shirt-outline', iconFilled: 'shirt' },
    { key: 'ai', label: 'Scan', icon: 'sparkles-outline', iconFilled: 'sparkles' },
    { key: 'shop', label: 'Shop', icon: 'bag-outline', iconFilled: 'bag' },
    { key: 'profile', label: 'Profile', icon: 'person-outline', iconFilled: 'person' },
];

export default function BottomTabBar({ activeTab, onTabPress, onAIPress }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
            {TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                const isAI = tab.key === 'ai';

                if (isAI) {
                    return (
                        <TouchableOpacity
                            key={tab.key}
                            style={styles.aiButton}
                            onPress={onAIPress}
                            activeOpacity={0.8}
                        >
                            <View style={styles.aiButtonInner}>
                                <Ionicons name="sparkles" size={26} color={colors.white} />
                            </View>
                        </TouchableOpacity>
                    );
                }

                return (
                    <TouchableOpacity
                        key={tab.key}
                        style={styles.tab}
                        onPress={() => onTabPress(tab.key)}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={isActive ? tab.iconFilled : tab.icon}
                            size={24}
                            color={isActive ? colors.primaryDark : colors.gray500}
                        />
                        <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        backgroundColor: colors.white,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: colors.gray100,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 10,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: colors.gray500,
        marginTop: 4,
    },
    tabLabelActive: {
        color: colors.primaryDark,
        fontWeight: '600',
    },
    aiButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: -28,
    },
    aiButtonInner: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primaryDark,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
        borderWidth: 3,
        borderColor: colors.white,
    },
});
