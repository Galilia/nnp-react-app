import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay: number;
}

/**
 * Reusable hook for modal components (drawer/modal)
 * @param animationDelay
 * @param isOpen
 * @param onClose
 */
export const useModal = (props: UseModalProps) => {
    const { onClose, isOpen, animationDelay } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef() as MutableRefObject<
        ReturnType<typeof setTimeout>
    >;

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, animationDelay);
        }
    }, [animationDelay, onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                close();
            }
        },
        [close],
    );

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    return {
        isClosing,
        close,
        isMounted,
    };
};
