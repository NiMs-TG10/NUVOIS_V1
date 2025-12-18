import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@nuvois/ui-theme';
import WeatherPill from './WeatherPill';

interface TopBarProps {
    userName: string;
    weather: {
        temperature: number;
        condition: string;
        location: string;
    };
    notificationCount?: number;
    onSearchPress?: () => void;
    onNotificationPress?: () => void;
}

export default function TopBar({
    userName,
    weather,
    notificationCount = 0,
    onSearchPress,
    onNotificationPress,
}: TopBarProps) {
    const insets = useSafeAreaInsets();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
            <View style={styles.leftSection}>
                <Text style={styles.greeting}>{getGreeting()}, {userName}</Text>
                <WeatherPill
                    temperature={weather.temperature}
                    condition={weather.condition}
                    location={weather.location}
                />
            </View>

            <View style={styles.rightSection}>
                <TouchableOpacity onPress={onSearchPress} style={styles.iconButton}>
                    <Ionicons name="search-outline" size={24} color={colors.gray800} />
                </TouchableOpacity>

                <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
                    <Ionicons name="notifications-outline" size={24} color={colors.gray800} />
                    {notificationCount > 0 && (
                        <View style={styles.notificationBadge}>
                            <Text style={styles.badgeText}>
                                {notificationCount > 9 ? '9+' : notificationCount}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingBottom: 12,
        backgroundColor: colors.white,
    },
    leftSection: {
        gap: 8,
    },
    greeting: {
        fontSize: 22,
        fontWeight: '600',
        color: colors.gray900,
        fontFamily: 'System',
        letterSpacing: -0.3,
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconButton: {
        padding: 8,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: colors.primary,
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: colors.white,
        fontSize: 10,
        fontWeight: '700',
    },
});
