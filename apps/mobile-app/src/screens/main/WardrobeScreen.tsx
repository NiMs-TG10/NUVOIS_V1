import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    Alert,
    ActivityIndicator,
    Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors } from '@nuvois/ui-theme';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { api } from '../../services/api';

const { width } = Dimensions.get('window');
const COLUMN_GAP = 12;
const PADDING = 16;
// Calculate item width for 2 columns: (Screen Width - (2 * Side Padding) - Gap) / 2
const ITEM_WIDTH = (width - (2 * PADDING) - COLUMN_GAP) / 2;

// Mock Data with Unsplash images for better visuals
const CLOSET_ITEMS = [
    { name: "Silk Blouse", category: "tops", image: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=400", worn: "2 days ago" },
    { name: "Denim Jacket", category: "outerwear", image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=400", worn: "1 week ago" },
    { name: "Pleated Skirt", category: "bottoms", image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400", worn: "Yesterday" },
    { name: "Leather Boots", category: "shoes", image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400", worn: "3 days ago" },
    { name: "Cashmere Sweater", category: "tops", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400", worn: "Last month" },
    { name: "Tote Bag", category: "accessories", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400", worn: "Today" },
    { name: "White Sneakers", category: "shoes", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400", worn: "4 days ago" },
    { name: "Black Trousers", category: "bottoms", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400", worn: "Last week" },
];

const CATEGORIES = ["All", "Tops", "Bottoms", "Outerwear", "Shoes", "Accessories"];

export default function WardrobeScreen() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const filteredItems = CLOSET_ITEMS.filter((item) => {
        const matchesCategory = activeCategory === "all" || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const pickAndUpload = async () => {
        // 1. Permission Check & Pick Image
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "You need to allow access to your photos to upload items.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (result.canceled) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            // 2. Client-Side Optimization
            const manipResult = await ImageManipulator.manipulateAsync(
                result.assets[0].uri,
                [{ resize: { width: 1024 } }], // Resize to manageable width
                { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
            );

            // 3. Prepare FormData
            const uri = manipResult.uri;
            const fileType = uri.split('.').pop();
            const mimeType = fileType === 'png' ? 'image/png' : 'image/jpeg';
            const fileName = `upload.${fileType === 'png' ? 'png' : 'jpeg'}`;

            const formData = new FormData();
            formData.append('image', {
                uri,
                name: fileName,
                type: mimeType,
            } as any);

            // 4. Send to Backend
            // Note: Using a timeout or checking if the route exists is good practice, 
            // but we'll follow the provided logic.
            await api.post('/v1/b2c/scan/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percent);
                    }
                },
            });

            Alert.alert("Success", "Item uploaded successfully!");
            // Optionally refresh the list here
        } catch (error) {
            console.error('Upload failed', error);
            Alert.alert("Upload Failed", "There was a problem uploading your item. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.headerContainer}>
                {/* Title Header */}
                <View style={styles.titleRow}>
                    <Text style={styles.title}>My Closet</Text>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={pickAndUpload}
                        disabled={isUploading}
                    >
                        <Feather name="plus" size={24} color={colors.gray900} />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Feather name="search" size={20} color={colors.gray500} style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search your wardrobe..."
                        placeholderTextColor={colors.gray400}
                        style={styles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Categories Tabs */}
                <View style={styles.categoriesContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesContent}
                    >
                        {CATEGORIES.map((category) => {
                            const isActive = activeCategory === category.toLowerCase();
                            return (
                                <TouchableOpacity
                                    key={category}
                                    style={[styles.categoryPill, isActive && styles.categoryPillActive]}
                                    onPress={() => setActiveCategory(category.toLowerCase())}
                                >
                                    <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>

            {/* Grid Content */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.grid}>
                    {filteredItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.card} activeOpacity={0.9}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                            <View style={styles.cardOverlay}>
                                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                                <Text style={styles.itemWorn}>Last worn {item.worn}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {filteredItems.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No items found.</Text>
                    </View>
                )}
            </ScrollView>

            {/* Upload Progress Overlay */}
            <Modal
                transparent={true}
                visible={isUploading}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.uploadContainer}>
                        <Text style={styles.uploadTitle}>Uploading Item</Text>
                        <ActivityIndicator size="large" color={colors.primary} style={styles.activityIndicator} />
                        <Text style={styles.uploadProgress}>{uploadProgress}%</Text>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: `${uploadProgress}%` }]} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    headerContainer: {
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray100,
        backgroundColor: colors.white,
        zIndex: 10,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    title: {
        fontSize: 28,
        fontWeight: '500', // Serif-like weight
        color: colors.gray900,
        letterSpacing: -0.5,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // hover effect simulated by touchable opacity
    },
    searchContainer: {
        marginHorizontal: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.gray50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'transparent',
        height: 44,
    },
    searchIcon: {
        marginLeft: 12,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: colors.gray900,
        height: '100%',
        paddingRight: 12,
    },
    categoriesContainer: {
        height: 40,
    },
    categoriesContent: {
        paddingHorizontal: 20,
        gap: 8,
        alignItems: 'center',
    },
    categoryPill: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.gray200,
        backgroundColor: 'transparent',
    },
    categoryPillActive: {
        backgroundColor: colors.primaryDark,
        borderColor: colors.primaryDark,
    },
    categoryText: {
        fontSize: 14,
        color: colors.gray600,
        fontWeight: '500',
    },
    categoryTextActive: {
        color: colors.white,
    },
    scrollContent: {
        padding: PADDING,
        paddingBottom: 100, // Space for bottom tab bar
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: COLUMN_GAP,
    },
    card: {
        width: ITEM_WIDTH,
        aspectRatio: 3 / 4,
        borderRadius: 16,
        backgroundColor: colors.gray100,
        overflow: 'hidden',
        position: 'relative',
        borderWidth: 1,
        borderColor: colors.gray100,
    },
    cardImage: {
        width: '100%',
        height: '100%',
    },
    cardOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 12,
        backgroundColor: 'rgba(0,0,0,0.4)', // Gradient simulation
    },
    itemName: {
        color: colors.white,
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 2,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    itemWorn: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 11,
    },
    emptyState: {
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        color: colors.gray500,
        fontSize: 15,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadContainer: {
        width: '80%',
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    uploadTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.gray900,
        marginBottom: 16,
    },
    activityIndicator: {
        marginBottom: 16,
    },
    uploadProgress: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.primary,
        marginBottom: 16,
    },
    progressBar: {
        width: '100%',
        height: 8,
        backgroundColor: colors.gray100,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 4,
    },
});
