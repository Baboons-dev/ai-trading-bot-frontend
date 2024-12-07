"use client";
import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import type {ITelegramUser, IWebApp} from "../types/type";
import {useLocation, useSearchParams} from 'react-router-dom';
import {AppStoreState, useAppStore} from "../store";

export interface ITelegramContext {
    webApp?: IWebApp;
    telegram_user?: ITelegramUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({
                                     children,
                                 }: {
    children: React.ReactNode;
}) => {
    const [webApp, setWebApp] = useState<IWebApp | null>(null);
    const {pathname} = useLocation();
    const setTgId = useAppStore((state: AppStoreState) => state.setCTgId);
    const [searchParams, setSearchParams] = useSearchParams();
    const tgId = searchParams.get('tgId');
    useEffect(() => {
        const app = (window as any).Telegram?.WebApp;
        if (app) {
            app.ready();
            setWebApp(app);
            setTimeout(() => {
                app.expand();
                app.headerColor = "#0A0318";
                app.isVerticalSwipesEnabled = false;
                app.disableVerticalSwipes();
                app.BackButton.show();
                app.BackButton.onClick(() => window.history.back());
            }, 100);
        }
    }, []);
    useEffect(() => {
        const app = (window as any).Telegram?.WebApp;
        if (app) {
            setTimeout(() => {
                if (pathname === `/`) {
                    app.BackButton.hide();
                } else {
                    app.BackButton.show();
                }
            }, 100);
        }
    }, [pathname]);
    useEffect(() => {
        if (tgId) {
            setTgId(tgId)
            searchParams.delete('tgId');
            setSearchParams(searchParams);
        }
    }, [tgId]);
    //
    //
    //
    // const statUser = {
    //     id: 1778691594,
    //     first_name: "Hasib2",
    //     last_name: "Arman2",
    // };
    const statUser = null;
    const value = useMemo(() => {
        return webApp
            ? {
                webApp,
                unsafeData: webApp.initDataUnsafe,
                telegram_user: webApp.initDataUnsafe.user ?? statUser,
            }
            : {};
    }, [webApp]);

    return (
        <TelegramContext.Provider value={value as ITelegramContext}>
            {children}
        </TelegramContext.Provider>
    );
};

export const useTelegram = () => useContext(TelegramContext);
