import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@nuvois/ui-theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

interface ProductItem {
    name: string;
    price: string;
    match: string;
    image: string;
}

const PRODUCTS: ProductItem[] = [
    { name: "Linen Blazer", price: "$129", match: "98%", image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400" },
    { name: "Silk Scarf", price: "$45", match: "95%", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400" },
    { name: "Wide Leg Trousers", price: "$89", match: "92%", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400" },
    { name: "Gold Hoops", price: "$120", match: "88%", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
    { name: "Cotton Shirt", price: "$65", match: "85%", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400" },
    { name: "Leather Bag", price: "$199", match: "82%", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
];

export default function ShopScreen() {
    const [favorites, setFavorites] = React.useState<Set<number>>(new Set());

    const toggleFavorite = (index: number) => {
        setFavorites(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Curated Shop</Text>
                <Text style={styles.subtitle}>Pieces that match your style</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Featured Collection */}
                <View style={styles.featuredContainer}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800' }}
                        style={styles.featuredImage}
                    />
                    <View style={styles.featuredOverlay} />
                    <View style={styles.featuredContent}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>New Arrival</Text>
                        </View>
                        <Text style={styles.featuredTitle}>Summer Essentials</Text>
                        <Text style={styles.featuredSubtitle}>Lightweight fabrics for the heat</Text>
                    </View>
                </View>

                {/* Product Grid */}
                <View style={styles.productGrid}>
                    {PRODUCTS.map((item, index) => (
                        <View key={index} style={styles.productCard}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.productImage}
                                    resizeMode="cover"
                                />
                                <TouchableOpacity
                                    style={styles.favoriteButton}
                                    onPress={() => toggleFavorite(index)}
                                    activeOpacity={0.7}
                                >
                                    <Ionicons
                                        name={favorites.has(index) ? 'heart' : 'heart-outline'}
                                        size={18}
                                        color={favorites.has(index) ? colors.error : colors.gray700}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.productInfo}>
                                <View style={styles.productHeader}>
                                    <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                                    <Text style={styles.productPrice}>{item.price}</Text>
                                </View>
                                <Text style={styles.matchText}>Match: {item.match}</Text>
                            </View>
                        </View>
                    ))}
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
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray100,
        backgroundColor: colors.white,
    },
    title: {
        fontSize: 28,
        fontWeight: '500',
        color: colors.gray900,
        marginBottom: 4,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: colors.gray500,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },
    featuredContainer: {
        position: 'relative',
        aspectRatio: 16 / 9,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 24,
    },
    featuredImage: {
        width: '100%',
        height: '100%',
    },
    featuredOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    featuredContent: {
        position: 'absolute',
        bottom: 16,
        left: 16,
    },
    badge: {
        backgroundColor: colors.white,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.black,
    },
    featuredTitle: {
        fontSize: 22,
        fontWeight: '500',
        color: colors.white,
        marginBottom: 4,
        letterSpacing: -0.3,
    },
    featuredSubtitle: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    productCard: {
        width: CARD_WIDTH,
    },
    imageContainer: {
        position: 'relative',
        aspectRatio: 3 / 4,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: colors.gray100,
        marginBottom: 8,
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productInfo: {
        gap: 4,
    },
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    productName: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.gray900,
        flex: 1,
        marginRight: 8,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.gray900,
    },
    matchText: {
        fontSize: 12,
        color: colors.gray500,
    },
});
