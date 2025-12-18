import React from 'react';
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { colors } from '@nuvois/ui-theme';
import HeroOutfitCard from './HeroOutfitCard';
import CompleteTheLookCard from './CompleteTheLookCard';
import FeedbackCard from './FeedbackCard';
import { TabKey } from './NestedTabs';

interface SmartFeedProps {
    activeTab: TabKey;
}

// Mock data
const MOCK_OUTFIT = {
    items: [
        { id: '1', name: 'White Oxford Shirt', imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400', brand: 'Your Closet' },
        { id: '2', name: 'Navy Chinos', imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400', brand: 'Your Closet' },
        { id: '3', name: 'Beige Blazer', imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400', brand: 'Zara', isRecommended: true },
    ],
    aiNote: "Perfect for 24°C weather and your 10 AM meeting. The blazer adds polish without overheating.",
};

const MOCK_UPSELL = {
    userItem: { name: 'Blue Denim Jeans', imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400' },
    recommendedItem: { name: 'Cashmere Sweater', imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400', price: 89, brand: 'Uniqlo' },
    suggestion: "Update your classic denim with this cozy layer for cooler evenings.",
};

const OCCASIONS_DATA = [
    { id: 'work', title: 'Work Meeting', icon: '💼' },
    { id: 'date', title: 'Date Night', icon: '🌹' },
    { id: 'gym', title: 'Gym & Active', icon: '🏋️' },
    { id: 'travel', title: 'Travel', icon: '✈️' },
    { id: 'casual', title: 'Casual Weekend', icon: '☀️' },
];

export default function SmartFeed({ activeTab }: SmartFeedProps) {
    if (activeTab === 'occasions') {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>What's on your agenda?</Text>
                <View style={styles.occasionsGrid}>
                    {OCCASIONS_DATA.map((occasion) => (
                        <View key={occasion.id} style={styles.occasionCard}>
                            <Text style={styles.occasionIcon}>{occasion.icon}</Text>
                            <Text style={styles.occasionTitle}>{occasion.title}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        );
    }

    if (activeTab === 'trending') {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <View style={styles.trendingHeader}>
                    <Feather name="trending-up" size={16} color={colors.primary} />
                    <Text style={styles.trendingHeaderText}>TRENDING IN Ahmedabad</Text>
                </View>

                {[
                    { id: 1, title: "Old Money Aesthetic", sub: "+125% searches this week", img: "https://images.unsplash.com/photo-1543087903-1ac2ec7aa8be?w=800" },
                    { id: 2, title: "Y2K Revival", sub: "Trending on TikTok", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800" },
                    { id: 3, title: "Minimalist Office", sub: "Editor's Pick", img: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800" }
                ].map((item) => (
                    <TouchableOpacity key={item.id} style={styles.trendingCard} activeOpacity={0.9}>
                        <View style={styles.trendingImageContainer}>
                            <Image source={{ uri: item.img }} style={styles.trendingImage} resizeMode="cover" />
                            <View style={styles.gradientOverlay} />
                            <View style={styles.trendingCardContent}>
                                <Text style={styles.trendingCardTitle}>{item.title}</Text>
                                <Text style={styles.trendingCardSub}>{item.sub}</Text>
                            </View>
                        </View>
                        <View style={styles.trendingFooter}>
                            <View style={styles.avatarsContainer}>
                                {[1, 2, 3].map((i) => (
                                    <View key={i} style={styles.avatarPlaceholder} />
                                ))}
                            </View>
                            <TouchableOpacity style={styles.viewLookButton}>
                                <Text style={styles.viewLookText}>View Look</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    }

    // Default: For You tab
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <HeroOutfitCard
                title="Today's Look"
                items={MOCK_OUTFIT.items}
                aiNote={MOCK_OUTFIT.aiNote}
                onTryOn={() => console.log('AR Try On')}
                onSwap={() => console.log('Swap Item')}
            />

            <CompleteTheLookCard
                userItem={MOCK_UPSELL.userItem}
                recommendedItem={MOCK_UPSELL.recommendedItem}
                suggestion={MOCK_UPSELL.suggestion}
                onShop={() => console.log('Shop')}
            />

            <FeedbackCard
                itemName="Navy Dress"
                wornDate="yesterday"
                onFeedback={(fb) => console.log('Feedback:', fb)}
            />

            <View style={styles.spacer} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray50,
    },
    content: {
        paddingTop: 16,
        paddingBottom: 100,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.gray900,
        marginHorizontal: 20,
        marginBottom: 16,
    },
    occasionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
        gap: 12,
    },
    occasionCard: {
        width: '45%',
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    occasionIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    occasionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.gray800,
        textAlign: 'center',
    },
    trendingPlaceholder: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 40,
        marginHorizontal: 16,
        alignItems: 'center',
    },
    placeholderEmoji: {
        fontSize: 48,
        marginBottom: 12,
    },
    placeholderText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray800,
        textAlign: 'center',
        marginBottom: 4,
    },
    placeholderSubtext: {
        fontSize: 13,
        color: colors.gray500,
    },
    spacer: {
        height: 40,
    },
    trendingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 16,
        gap: 8,
    },
    trendingHeaderText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.primary,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    trendingCard: {
        backgroundColor: colors.white,
        marginHorizontal: 16,
        marginTop: 0,
        marginBottom: 20,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.gray200,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },
    trendingImageContainer: {
        height: 200,
        position: 'relative',
        backgroundColor: colors.gray100,
    },
    trendingImage: {
        width: '100%',
        height: '100%',
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)', // Simpler gradient fallback
    },
    trendingCardContent: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
    },
    trendingCardTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: colors.white,
        marginBottom: 4,
        letterSpacing: -0.5,
    },
    trendingCardSub: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.9)',
    },
    trendingFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: colors.white,
    },
    avatarsContainer: {
        flexDirection: 'row',
        paddingLeft: 10, // Offset for negative margin
    },
    avatarPlaceholder: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: colors.gray200,
        borderWidth: 2,
        borderColor: colors.white,
        marginLeft: -10,
    },
    viewLookButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray200,
    },
    viewLookText: {
        fontSize: 13,
        fontWeight: '500',
        color: colors.gray900,
    },
});
