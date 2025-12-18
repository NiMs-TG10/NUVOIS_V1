import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@nuvois/ui-theme';

interface FeedbackCardProps {
    itemName: string;
    wornDate?: string;
    onFeedback?: (feedback: { rating?: number; fit?: string }) => void;
}

export default function FeedbackCard({
    itemName,
    wornDate = 'yesterday',
    onFeedback,
}: FeedbackCardProps) {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [selectedFit, setSelectedFit] = useState<string | null>(null);

    const handleRating = (rating: number) => {
        setSelectedRating(rating);
        onFeedback?.({ rating });
    };

    const handleFit = (fit: string) => {
        setSelectedFit(fit);
        onFeedback?.({ fit });
    };

    const fitOptions = ['Too Loose', 'Perfect', 'Too Tight'];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="chatbubble-ellipses-outline" size={16} color={colors.gray500} />
                <Text style={styles.title}>Quick Feedback</Text>
            </View>

            <Text style={styles.question}>
                You wore the <Text style={styles.itemName}>{itemName}</Text> {wornDate}. How was the fit?
            </Text>

            <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                        <Ionicons
                            name={selectedRating && selectedRating >= star ? 'star' : 'star-outline'}
                            size={28}
                            color={selectedRating && selectedRating >= star ? colors.primary : colors.gray300}
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.fitOptions}>
                {fitOptions.map((fit) => (
                    <TouchableOpacity
                        key={fit}
                        style={[styles.fitButton, selectedFit === fit && styles.fitButtonActive]}
                        onPress={() => handleFit(fit)}
                    >
                        <Text style={[styles.fitButtonText, selectedFit === fit && styles.fitButtonTextActive]}>
                            {fit}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.gray500,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    question: {
        fontSize: 15,
        color: colors.gray700,
        lineHeight: 22,
        marginBottom: 12,
    },
    itemName: {
        fontWeight: '700',
        color: colors.gray900,
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 14,
    },
    fitOptions: {
        flexDirection: 'row',
        gap: 8,
    },
    fitButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: colors.gray100,
        alignItems: 'center',
    },
    fitButtonActive: {
        backgroundColor: colors.primaryDark,
    },
    fitButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.gray700,
    },
    fitButtonTextActive: {
        color: colors.white,
    },
});
