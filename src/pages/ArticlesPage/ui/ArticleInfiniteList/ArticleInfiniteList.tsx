import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ArticleList } from '@/entities/Article';
import { getScrollIndex, scrollSaveActions } from '@/features/ScrollSave';
import { toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from '@/shared/ui/deprecated/Text';

import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slices/articlesPageSlice';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';

interface ArticleInfiniteListProps {
    className?: string;
    onLoadNextPart?: () => void;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
    const { className, onLoadNextPart } = props;
    const { t } = useTranslation();
    const articles = useSelector(getArticles.selectAll);
    const view = useSelector(getArticlesPageView);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const error = useSelector(getArticlesPageError);
    const scrollIndex = useSelector(getScrollIndex);
    const dispatch = useAppDispatch();

    if (error) {
        return <Text text={t('List load error')} />;
    }

    const handleScrollIndexClick = (index: number) => {
        dispatch(scrollSaveActions.setScrollIndex(index));
    };
    // TODO memoize ArticlesPageFilters
    const Header = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => undefined,
        off: () => () => <ArticlesPageFilters />,
    });

    return (
        <ArticleList
            isLoading={isLoading}
            view={view}
            articles={articles}
            className={className}
            onLoadNextPart={onLoadNextPart}
            Header={Header}
            scrollIdx={scrollIndex}
            handleScrollIndexClick={handleScrollIndexClick}
        />
    );
});
