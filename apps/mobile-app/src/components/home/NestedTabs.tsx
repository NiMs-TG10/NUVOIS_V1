import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { colors } from '@nuvois/ui-theme';

export type TabKey = 'forYou' | 'occasions' | 'trending';

interface Tab {
    key: TabKey;
    label: string;
}

interface NestedTabsProps {
    activeTab: TabKey;
    onTabChange: (tab: TabKey) => void;
}

const TABS: Tab[] = [
    { key: 'forYou', label: 'For You' },
    { key: 'occasions', label: 'Occasions' },
    { key: 'trending', label: 'Trending' },
];

export default function NestedTabs({ activeTab, onTabChange }: NestedTabsProps) {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                        <TouchableOpacity
                            key={tab.key}
                            onPress={() => onTabChange(tab.key)}
                            style={[styles.tab, isActive && styles.activeTab]}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray100,
    },
    scrollContent: {
        paddingHorizontal: 16,
        gap: 8,
    },
    tab: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 24,
        backgroundColor: colors.gray100,
    },
    activeTab: {
        backgroundColor: colors.primaryDark,
    },
    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.gray700,
    },
    activeTabText: {
        color: colors.white,
    },
});
