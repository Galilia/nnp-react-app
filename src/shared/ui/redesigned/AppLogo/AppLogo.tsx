import React, { memo } from 'react';

import AppSvg from '@/shared/assets/icons/app-image-2.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import { HStack } from '../../deprecated/Stack';

import cls from './AppLogo.module.scss';

interface AppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = memo(({ className, size = 100 }: AppLogoProps) => {
    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.appLogoWrapper, {}, [className])}
        >
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
            <AppSvg
                className={cls.appLogo}
                color="black"
                width={size}
                height={size}
            />
        </HStack>
    );
});