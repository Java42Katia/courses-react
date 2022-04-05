import { PayloadAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Observable, Subscription } from "rxjs";
export default function usePollerRedux<T>(service: any,
    dataFn: (params?: any) => Observable<T>, actionFn: (state: T) => PayloadAction<T>,
    selectorFn: (store: any) => T, pollerInterval: number = 1000,
    params?: any): T {
    const dispatch = useDispatch();
    const data: T = useSelector(selectorFn);
    useEffect(() => {
        function subscribeObjects(): Subscription {
            return dataFn.call(service, params).subscribe(result =>
                dispatch(actionFn(result)))
        }
        let subscription = subscribeObjects();
        function poller() {
            if (subscription.closed) {

                subscription = subscribeObjects();
            }
        }
        let intervalId = setInterval(poller, pollerInterval);
        return () => {
            clearInterval(intervalId);
            subscription.unsubscribe();
        }
    }, [pollerInterval, service, actionFn, dataFn, selectorFn, dispatch, params])

    return data;

}