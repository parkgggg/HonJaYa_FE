'use client'
import { useState, useEffect, useRef } from 'react';

import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { postData } from '@/app/api/api';
import { useRouter } from 'next/navigation';

type Props = {}

const MatchingPage = (props: Props) => {
    const [matchingResult, setMatchingResult] = useState(null);
    const stompClientRef = useRef<CompatClient>();
    const subscriptionRef = useRef<any>();
    const router = useRouter();

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/api/ws/match');
        stompClientRef.current = Stomp.over(socket);

        const connectCallback = (frame) => {
            console.log('Connected: ' + frame);

            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }

            subscriptionRef.current = stompClientRef.current?.subscribe(`/topic/match/${localStorage.getItem('user_id')}`, (message) => {
                try {
                    const result = JSON.parse(message.body);
                    setMatchingResult(result);
                    console.log(`New match received for User ${localStorage.getItem('user_id')}:`, result);
                    alert(`사용자 ${localStorage.getItem('user_id')}님, 새로운 매칭이 이루어졌습니다: ${result.name}`);
                } catch (error) {
                    console.error(`Error parsing message body for User ${localStorage.getItem('user_id')}:`, error);
                }
            });
        };

        stompClientRef.current.connect({}, connectCallback);

        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
            }
        };
    }, [localStorage.getItem('user_id')]);

    useEffect(() => {
        if(matchingResult) {
            router.push("/wait");        
        }
    },[matchingResult])

    const requestMatch = async () => {
        const response = await postData(`/match/${localStorage.getItem("user_id")}`, "", "honjaya");
        console.log(response);
    };

  return (
    <div>
    <h2>사용자 {localStorage.getItem('user_id')}에 대한 매칭 알림</h2>
    <button onClick={requestMatch}>사용자 {localStorage.getItem('user_id')} 매칭 요청</button>
    {matchingResult && (
        <div>
            <h3>매칭된 사용자: {matchingResult.name}</h3>

        </div>
    )}
</div>  )
}

export default MatchingPage