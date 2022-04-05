import { useState, useEffect } from "react";
import { Observable, Subscription } from "rxjs";
export default function usePoller<T> (service: any,
     dataFn: (params?: any)=>Observable<T>, initialValue: T, pollerInterval: number = 1000,
     params?: any): T {
         const [data, setData] = useState<T>(initialValue);
         useEffect(()=>{
            function subscribeObjects():Subscription {
                return dataFn.call(service, params).subscribe(result => setData(result))
            }
            let subscription = subscribeObjects();
            function poller() {
                if (subscription.closed) {
                    console.log('kuku');
                    subscription = subscribeObjects();
                }
            }
            let intervalId = setInterval(poller, pollerInterval);
            return () => {
                clearInterval(intervalId);
                subscription.unsubscribe();
            }
         }, [pollerInterval])
         
         return data;

}