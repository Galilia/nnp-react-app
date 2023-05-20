import React, { ButtonHTMLAttributes, FC, memo, ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    /**
     * Button theme. Determines the visuals (within frame, no styles, color opposite to the app theme, etc.)
     */
    variant?: ButtonVariant;
    /**
     * A flag making the button square
     */
    square?: boolean;
    /**
     * Button size in accordance with the design system
     */
    size?: ButtonSize;
    /**
     * A flag controlling the button's functionality
     */
    disabled?: boolean;
    /**
     * Button content
     */
    children?: ReactNode;
    /**
     * Expands the button to fill all available width
     */
    fullWidth?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

export const Button: FC<ButtonProps> = memo((props: ButtonProps) => {
    const {
        className,
        children,
        variant = 'outline',
        square,
        disabled,
        fullWidth,
        size = 'm',
        addonLeft,
        addonRight,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
        [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [
                className,
                cls[variant],
                cls[size],
            ])}
            disabled={disabled}
            {...otherProps}
        >
            <div className={cls.addonLeft}>{addonLeft}</div>
            {children}
            <div className={cls.addonRight}>{addonRight}</div>
        </button>
    );
});
