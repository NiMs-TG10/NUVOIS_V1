import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors } from '@nuvois/ui-theme';

interface AIActionModalProps {
    visible: boolean;
    onClose: () => void;
    onScanItem?: () => void;
    onBodyScan?: () => void;
    onARTryOn?: () => void;
}

interface ActionItem {
    key: string;
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle: string;
    color: string;
    onPress: (() => void) | undefined;
}

export default function AIActionModal({
    visible,
    onClose,
    onScanItem,
    onBodyScan,
    onARTryOn,
}: AIActionModalProps) {
    const actions: ActionItem[] = [
        {
            key: 'scan',
            icon: 'camera',
            title: 'Scan New Item',
            subtitle: 'Add clothes to your closet',
            color: colors.accent,
            onPress: onScanItem,
        },
        {
            key: 'body',
            icon: 'body',
            title: 'Body Scan',
            subtitle: 'Update your measurements',
            color: colors.success,
            onPress: onBodyScan,
        },
        {
            key: 'ar',
            icon: 'sparkles',
            title: 'Quick AR Try-On',
            subtitle: 'See how items look on you',
            color: colors.primary,
            onPress: onARTryOn,
        },
    ];

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <Pressable style={styles.overlay} onPress={onClose}>
                <BlurView intensity={20} style={styles.blurContainer}>
                    <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                        <View style={styles.header}>
                            <View style={styles.handleBar} />
                            <Text style={styles.title}>What would you like to do?</Text>
                        </View>

                        <View style={styles.actionsContainer}>
                            {actions.map((action) => (
                                <TouchableOpacity
                                    key={action.key}
                                    style={styles.actionItem}
                                    onPress={() => {
                                        action.onPress?.();
                                        onClose();
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconContainer, { backgroundColor: `${action.color}15` }]}>
                                        <Ionicons name={action.icon} size={28} color={action.color} />
                                    </View>
                                    <View style={styles.actionText}>
                                        <Text style={styles.actionTitle}>{action.title}</Text>
                                        <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </Pressable>
                </BlurView>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    blurContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 20,
    },
    handleBar: {
        width: 40,
        height: 4,
        backgroundColor: colors.gray300,
        borderRadius: 2,
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.gray900,
    },
    actionsContainer: {
        paddingHorizontal: 20,
        gap: 12,
    },
    actionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.gray50,
        borderRadius: 16,
        gap: 14,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionText: {
        flex: 1,
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray900,
        marginBottom: 2,
    },
    actionSubtitle: {
        fontSize: 13,
        color: colors.gray500,
    },
    cancelButton: {
        marginTop: 20,
        marginHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 12,
        backgroundColor: colors.gray100,
        alignItems: 'center',
    },
    cancelText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.gray700,
    },
});
