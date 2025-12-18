import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@nuvois/ui-theme';

interface WeatherPillProps {
    temperature: number;
    condition: string;
    location: string;
}

export default function WeatherPill({ temperature, condition, location }: WeatherPillProps) {
    const getWeatherIcon = (cond: string) => {
        switch (cond.toLowerCase()) {
            case 'sunny': return 'sunny-outline';
            case 'cloudy': return 'cloudy-outline';
            case 'rainy': return 'rainy-outline';
            case 'partly-cloudy': return 'partly-sunny-outline';
            default: return 'partly-sunny-outline';
        }
    };

    return (
        <View style={styles.container}>
            <Ionicons name={getWeatherIcon(condition)} size={16} color={colors.gray700} />
            <Text style={styles.text}>{temperature}°C {location}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray100,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },
    text: {
        fontSize: 13,
        color: colors.gray700,
        fontWeight: '500',
    },
});
