import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { TabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation();

    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: ArticleType.ALL,
                content: t('ALL'),
            },
            {
                value: ArticleType.IT,
                content: t('IT'),
            },
            {
                value: ArticleType.SCIENCE,
                content: t('SCIENCE'),
            },
            {
                value: ArticleType.ECONOMICS,
                content: t('ECONOMICS'),
            },
        ],
        [t],
    );

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as ArticleType);
        },
        [onChangeType],
    );

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Tabs
                    direction="column"
                    className={classNames('', {}, [className])}
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                />
            }
            off={
                <TabsDeprecated
                    className={classNames('', {}, [className])}
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                />
            }
        />
    );
});
