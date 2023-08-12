import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import type { TouchableOpacityProps } from 'react-native';
import { StyleSheet } from 'react-native';

import { colors } from '../styles/colors';
import { Poppins } from '../styles/theme';
import { Icon } from './Icon';

type Props = {
    leftIcon?: () => string;
    rightIcon?: () => string;
    buttonOverride?: TouchableOpacityProps;
    isUnderlined?: boolean;
    size?: 'small' | 'medium' | 'large';
    color?: 'primary' | 'secondary' | 'tertiary';
    children?: string | JSX.Element;
    loading?: boolean;
    disabled?: boolean;
    onPress?: () => void;
};

export const Button = ({
    leftIcon,
    rightIcon,
    size = 'large',
    color = 'primary',
    buttonOverride,
    isUnderlined = false,
    children,
    disabled,
    loading,
    onPress,
}: Props): JSX.Element => {
    return (
        <TouchableOpacity
            {...buttonOverride}
            onPress={onPress}
            style={[
                styles.button,
                styles[size],
                styles[color],
                buttonOverride?.style,
                disabled && styles.disabled,
            ]}
            disabled={disabled || loading}
        >
            {loading ? (
                <View>
                    <ActivityIndicator color={styles[`text${color}`].color} />
                </View>
            ) : (
                <>
                    {leftIcon && (
                        <Icon color={styles[`text${color}`].color}>
                            {leftIcon()}
                        </Icon>
                    )}
                    <Text
                        style={[
                            isUnderlined && styles.underlined,
                            styles.text,
                            children != null && styles.margin,
                            styles[`text${color}`],
                        ]}
                    >
                        {children}
                    </Text>

                    {rightIcon && (
                        <Icon color={styles[`text${color}`].color}>
                            {rightIcon()}
                        </Icon>
                    )}
                </>
            )}
        </TouchableOpacity>
    );
};

//eslint-disable-next-line
export const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(138, 133, 67, 0.72)', // IOS
        shadowOffset: { height: 2, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
    },
    text: {
        fontSize: 16,
        fontFamily: Poppins.medium,
    },
    small: {
        height: 36,
    },
    medium: {
        height: 40,
    },
    large: {
        height: 48,
    },
    margin: {
        marginLeft: 8,
        marginRight: 8,
    },

    primary: {
        backgroundColor: colors.primary,
    },
    secondary: {
        backgroundColor: colors.secondary,
        borderStyle: 'solid',
        borderColor: colors.primary,
        borderWidth: 1,
    },
    tertiary: {
        borderStyle: 'solid',
        backgroundColor: colors.tertiary,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    textprimary: {
        color: '#000',
    },
    textsecondary: {
        color: '#000',
    },
    texttertiary: {
        color: '#000',
    },
    disabled: {
        opacity: 0.5,
    },
    underlined: {
        textDecorationLine: 'underline',
    },
});
