import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text } from '@/shared/ui/deprecated/Text';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { Notification } from '../../model/types/notifications';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
    className?: string;
    handleNotification: (notificationId: string) => void;
    notifications?: Notification[];
    isLoading?: boolean;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className, handleNotification, notifications, isLoading } = props;
    const { t } = useTranslation();

    if (notifications?.length === 0) {
        return (
            <div style={{ minWidth: '200px' }}>
                <Text text={t('Notifications not found')} />
            </div>
        );
    }

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    if (isLoading) {
        return (
            <VStack gap="16" max className={classNames('', {}, [className])}>
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
                <Skeleton width="100%" border="8px" height="80px" />
            </VStack>
        );
    }

    return (
        <VStack gap="16" max className={classNames('', {}, [className])}>
            {notifications?.map((item) => (
                <NotificationItem
                    key={item.id}
                    item={item}
                    onRead={handleNotification}
                />
            ))}
        </VStack>
    );
});
