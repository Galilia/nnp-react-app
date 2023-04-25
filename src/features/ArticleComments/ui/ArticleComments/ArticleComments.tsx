import { useTranslation } from 'react-i18next';
import { memo, Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';
import cls from './ArticleComments.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextSize } from '@/shared/ui/Text/Text';
import { CommentForm, CommentList } from '@/entities/Comment';
// TODO
// eslint-disable-next-line galilia-plugin/public-api-imports
import {
    getArticleComments,
} from '@/pages/ArticleDetailsPage/model/slices/articleDetailsCommentsSlice';
// eslint-disable-next-line galilia-plugin/public-api-imports
import {
    getArticleCommentsIsLoading,
} from '@/pages/ArticleDetailsPage/model/selectors/commentsSelectors';
// eslint-disable-next-line galilia-plugin/public-api-imports
import {
    addCommentForArticle,
} from '@/pages/ArticleDetailsPage/model/services/addCommentForArticle/addCommentForArticle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
// eslint-disable-next-line galilia-plugin/public-api-imports
import {
    fetchCommentsByArticleId,
} from '@/pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { VStack } from '@/shared/ui/Stack';
import { Loader } from '@/shared/ui/Loader/Loader';

interface ArticleCommentsProps {
    className?: string;
    id?: string
}

export const ArticleComments = memo((props: ArticleCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation();
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    return (
        <VStack gap="16" max className={classNames(cls.ArticleComments, {}, [className])}>
            <Text
                size={TextSize.L}
                title={t('Comments')}
                className={cls.commentTitle}
            />
            <Suspense fallback={<Loader />}>
                <CommentForm onSendComment={onSendComment} />
            </Suspense>
            <CommentList
                isLoading={commentsIsLoading}
                comments={comments}
            />
        </VStack>
    );
});
