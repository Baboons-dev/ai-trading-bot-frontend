import React, {useEffect, useState} from 'react';
import {AppStoreState, useAppStore} from "../store";
import {useTelegram} from "./TelegramProvider";
import {Box, Spinner, useToast} from "@chakra-ui/react";
import {getCurrentUser, userLoginTelegram} from "../api/InvestorApis/apis";
import {UserLogInResponse} from "../interfaces/components";
import {useNavigate} from "react-router-dom";

export default function UserProvider({
                                         children,
                                     }: {
    children: React.ReactNode;
}) {
    const setLoading = useAppStore((state: AppStoreState) => state.setLoading);
    const loading = useAppStore((state: AppStoreState) => state.loading);
    const loginApiResponse = useAppStore(
        (state: AppStoreState) => state.loginApiResponse,
    );
    const navigate = useNavigate();
     const setCurrentUser = useAppStore(
    (state: AppStoreState) => state.setCurrentUser,
  );
    const user = useAppStore(
        (state: AppStoreState) => state.currentUser,
    );
    const accessToken = loginApiResponse?.data?.access_token;


    const [fistTime, setFistTime] = useState<boolean>(true);
    const cTgId = useAppStore(
        (state: AppStoreState) => state.cTgId,
    );
    const {telegram_user} = useTelegram();
    const toast = useToast();
    const setLoginApiResponse = useAppStore(
        (state: AppStoreState) => state.setLoginApiResponse,
    );

    const loginByTg = async () => {
        if (cTgId && telegram_user) {
            try {
                setLoading(true);
                const data = {
                    email: '',
                    password: '',
                    tgId: cTgId,
                    tId: telegram_user?.id?.toString()
                }
                const res = await userLoginTelegram(data);
                if (res) {
                    setLoginApiResponse(res as unknown as UserLogInResponse);
                    setLoading(false);
                    toast({
                        title: 'Login successful!',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    navigate('/');
                }
                setFistTime(false)
            } catch (error: any) {
                setLoading(false);
                setFistTime(false)
            }
        }
    }
    useEffect(() => {
        if (fistTime && cTgId && telegram_user && !accessToken) {
            loginByTg()
        }
        if (!!user && !!telegram_user && !!user?.telegram_id && user?.telegram_id !== telegram_user?.id.toString() && !!accessToken) {
            setLoginApiResponse(null);
            navigate('/login');
        }
    }, [cTgId, fistTime, accessToken, user, telegram_user]);
    useEffect(() => {
        loginApiResponse?.data?.access_token &&
        localStorage.setItem(
            'access_token',
            loginApiResponse?.data?.access_token,
        );
        loginApiResponse?.data?.refresh_token &&
        localStorage.setItem(
            'refresh_token',
            loginApiResponse?.data?.refresh_token,
        );
    }, [loginApiResponse, loading]);
    useEffect(() => {
        async function loadCurrentUser() {
            try {
                const user = await getCurrentUser();
                setCurrentUser(user.data);
            } catch (error) {
                alert(error);
            }
        }

        if (!!accessToken) {
            setTimeout(()=>{
                loadCurrentUser();
            },500)

        }
    }, [accessToken]);


    return (
        <>
            {loading && (
                <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Spinner/>
                </Box>
            )}
            {children}
        </>
    );
}
