import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors } from '@nuvois/ui-theme';

const { width } = Dimensions.get('window');

// Mock Data
const USER_PROFILE = {
    name: 'Nishant', // Using name from context/previous files or placeholder
    title: 'Style Icon • Level 4',
    badges: ['Minimalist', 'Chic'],
    stats: {
        items: 142,
        outfits: 28,
        wishlist: 12,
    },
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', // Placeholder
};

const MENU_ITEMS = [
    { icon: 'clock', label: 'Style History' },
    { icon: 'heart', label: 'Liked Items' },
    { icon: 'award', label: 'Style Challenges' },
];

export default function ProfileScreen() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity style={styles.settingsButton}>
                    <Feather name="settings" size={20} color={colors.gray900} />
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Details */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: USER_PROFILE.avatarUrl }}
                            style={styles.avatar}
                        />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.userName}>{USER_PROFILE.name}</Text>
                        <Text style={styles.userTitle}>{USER_PROFILE.title}</Text>
                        <View style={styles.badgesContainer}>
                            {USER_PROFILE.badges.map((badge, index) => (
                                <View key={index} style={styles.badge}>
                                    <Text style={styles.badgeText}>{badge}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{USER_PROFILE.stats.items}</Text>
                        <Text style={styles.statLabel}>Items</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{USER_PROFILE.stats.outfits}</Text>
                        <Text style={styles.statLabel}>Outfits</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>{USER_PROFILE.stats.wishlist}</Text>
                        <Text style={styles.statLabel}>Wishlist</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {MENU_ITEMS.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.menuItem}
                            activeOpacity={0.7}
                        >
                            <View style={styles.menuItemLeft}>
                                <View style={styles.iconContainer}>
                                    <Feather name={item.icon as any} size={18} color={colors.gray500} />
                                </View>
                                <Text style={styles.menuItemLabel}>{item.label}</Text>
                            </View>
                            <Feather name="chevron-right" size={18} color={colors.gray400} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout */}
                <View style={styles.logoutContainer}>
                    <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
                        <View style={styles.logoutIconContainer}>
                            <Feather name="log-out" size={18} color={colors.error} />
                        </View>
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.gray100,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '600',
        color: colors.gray900,
    },
    settingsButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gray50,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    profileSection: {
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.05)',
        padding: 2,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 38,
        backgroundColor: colors.gray200,
    },
    profileInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    userName: {
        fontSize: 20,
        fontWeight: '600',
        color: colors.gray900,
        marginBottom: 4,
    },
    userTitle: {
        fontSize: 14,
        color: colors.gray500,
        marginBottom: 8,
    },
    badgesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: colors.gray100,
        borderRadius: 12, // More refined look than full pill
    },
    badgeText: {
        fontSize: 12,
        color: colors.gray700,
        fontWeight: '500',
    },
    statsGrid: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        gap: 12,
        marginBottom: 32,
    },
    statCard: {
        flex: 1,
        backgroundColor: '#F8F9FA', // Subtle gray
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.gray100,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '500',
        color: colors.primary,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: colors.gray500,
    },
    menuContainer: {
        paddingHorizontal: 24,
        gap: 8,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        height: 56,
        backgroundColor: colors.white,
        // Add subtle interaction indication if needed, but clean list is nice
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.gray50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuItemLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.gray800,
    },
    logoutContainer: {
        marginTop: 24,
        paddingHorizontal: 24,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: colors.gray100,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        height: 56,
    },
    logoutIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#FEF2F2', // Light red
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutText: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.error,
    },
});
