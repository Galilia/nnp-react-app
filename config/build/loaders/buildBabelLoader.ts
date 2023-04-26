import babelRemovePropsPlugin from '../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface buildBabelLoaderProps extends BuildOptions {
    isDev: boolean;
    isTsx?: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: buildBabelLoaderProps) {
    return {
        test: isTsx ? /\.(|jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', { targets: 'defaults' }],
                ],
                plugins: [
                    ['i18next-extract', { locales: ['ru', 'en'], keyAsDefaultValue: true }],
                    ['@babel/plugin-proposal-class-properties'],
                    ['@babel/plugin-transform-typescript',
                        {
                            isTsx,
                        },
                    ],
                    ['@babel/plugin-transform-runtime'],
                    isTsx && !isDev && [
                        babelRemovePropsPlugin,
                        { props: ['data-testid'] },
                    ],
                    isDev && require.resolve('react-refresh/babel'),
                ].filter(Boolean),
            },
        },
    };
}
