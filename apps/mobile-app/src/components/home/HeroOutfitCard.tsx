import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@nuvois/ui-theme';

const { width } = Dimensions.get('window');

interface OutfitItem {
    id: string;
    name: string;
    imageUrl: string;
    brand?: string;
    isRecommended?: boolean;
}

interface HeroOutfitCardProps {
    title?: string;
    items: OutfitItem[];
    aiNote: string;
    onTryOn?: () => void;
    onSwap?: () => void;
}

export default function HeroOutfitCard({
    title = "Today's Look",
    items,
    aiNote,
    onTryOn,
    onSwap,
}: HeroOutfitCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.aiTag}>
                    <Ionicons name="sparkles" size={12} color={colors.accent} />
                    <Text style={styles.aiTagText}>AI Styled</Text>
                </View>
            </View>

            <View style={styles.imageGrid}>
                {items.slice(0, 3).map((item, index) => (
                    <View key={item.id} style={[styles.imageContainer, index === 0 && styles.mainImage]}>
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.itemImage}
                            resizeMode="cover"
                        />
                        {item.isRecommended && (
                            <View style={styles.recommendedBadge}>
                                <Text style={styles.recommendedText}>+ Recommended</Text>
                            </View>
                        )}
                        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                        {item.brand && <Text style={styles.itemBrand}>{item.brand}</Text>}
                    </View>
                ))}
            </View>

            <View style={styles.noteContainer}>
                <Ionicons name="bulb-outline" size={16} color={colors.gray500} />
                <Text style={styles.noteText}>{aiNote}</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.primaryButton} onPress={onTryOn}>
                    <Ionicons name="sparkles" size={18} color={colors.white} />
                    <Text style={styles.primaryButtonText}>Try On (AR)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton} onPress={onSwap}>
                    <Ionicons name="swap-horizontal" size={18} color={colors.gray800} />
                    <Text style={styles.secondaryButtonText}>Swap Item</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.gray900,
        letterSpacing: -0.3,
    },
    aiTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: `${colors.accent}15`,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    aiTagText: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.accent,
    },
    imageGrid: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 12,
    },
    imageContainer: {
        flex: 1,
        position: 'relative',
    },
    mainImage: {
        flex: 2,
    },
    itemImage: {
        width: '100%',
        height: 140,
        borderRadius: 12,
        backgroundColor: colors.gray100,
    },
    recommendedBadge: {
        position: 'absolute',
        top: 8,
        left: 8,
        backgroundColor: colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    recommendedText: {
        fontSize: 9,
        fontWeight: '700',
        color: colors.white,
    },
    itemName: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.gray800,
        marginTop: 6,
    },
    itemBrand: {
        fontSize: 10,
        color: colors.gray500,
        marginTop: 2,
    },
    noteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: colors.gray50,
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
    },
    noteText: {
        flex: 1,
        fontSize: 13,
        color: colors.gray700,
        fontStyle: 'italic',
    },
    actions: {
        flexDirection: 'row',
        gap: 10,
    },
    primaryButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: colors.primaryDark,
        paddingVertical: 14,
        borderRadius: 12,
    },
    primaryButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.white,
    },
    secondaryButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: colors.gray100,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.gray200,
    },
    secondaryButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.gray800,
    },
});
