import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@nuvois/ui-theme';

interface CompleteTheLookCardProps {
    userItem: {
        name: string;
        imageUrl: string;
    };
    recommendedItem: {
        name: string;
        imageUrl: string;
        price: number;
        brand?: string;
    };
    suggestion: string;
    onShop?: () => void;
}

export default function CompleteTheLookCard({
    userItem,
    recommendedItem,
    suggestion,
    onShop,
}: CompleteTheLookCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="refresh" size={16} color={colors.primary} />
                <Text style={styles.title}>Restyle Your Closet</Text>
            </View>

            <View style={styles.itemsRow}>
                <View style={styles.itemContainer}>
                    <Image source={{ uri: userItem.imageUrl }} style={styles.itemImage} />
                    <Text style={styles.itemLabel}>Your Item</Text>
                    <Text style={styles.itemName} numberOfLines={1}>{userItem.name}</Text>
                </View>

                <View style={styles.plusContainer}>
                    <Ionicons name="add" size={20} color={colors.gray500} />
                </View>

                <View style={styles.itemContainer}>
                    <View style={styles.newBadgeContainer}>
                        <Image source={{ uri: recommendedItem.imageUrl }} style={styles.itemImage} />
                        <View style={styles.newBadge}>
                            <Text style={styles.newBadgeText}>New</Text>
                        </View>
                    </View>
                    <Text style={styles.itemLabel}>{recommendedItem.brand || 'Shop'}</Text>
                    <Text style={styles.itemName} numberOfLines={1}>{recommendedItem.name}</Text>
                </View>
            </View>

            <Text style={styles.suggestion}>{suggestion}</Text>

            <TouchableOpacity style={styles.shopButton} onPress={onShop}>
                <Ionicons name="bag-outline" size={16} color={colors.white} />
                <Text style={styles.shopButtonText}>Shop this Look - ${recommendedItem.price}</Text>
            </TouchableOpacity>
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
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.gray900,
    },
    itemsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    itemContainer: {
        flex: 1,
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: colors.gray100,
    },
    itemLabel: {
        fontSize: 10,
        color: colors.gray500,
        marginTop: 6,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    itemName: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.gray800,
        marginTop: 2,
    },
    plusContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.gray100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    newBadgeContainer: {
        position: 'relative',
    },
    newBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: colors.primary,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    newBadgeText: {
        fontSize: 9,
        fontWeight: '700',
        color: colors.white,
    },
    suggestion: {
        fontSize: 13,
        color: colors.gray600,
        marginBottom: 12,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    shopButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: colors.primary,
        paddingVertical: 12,
        borderRadius: 10,
    },
    shopButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.white,
    },
});
