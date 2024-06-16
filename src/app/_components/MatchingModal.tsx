'use client'
import { useState, useEffect, useRef } from 'react';

import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { postData } from '@/app/api/api';
import { useDispatch } from 'react-redux';
import { setMathcingModalClose } from '@/state/actions';



const MatchingModal = () => {
    const dispatch = useDispatch()
    const [matchingResult, setMatchingResult] = useState(null);
    const stompClientRef = useRef<CompatClient>();
    const subscriptionRef = useRef<any>();
    

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
                } catch (error) {
                    console.error(`Error parsing message body for User ${localStorage.getItem('user_id')}:`, error);
                }
            });
        };

        const requestMatch = async () => {
            const response = await postData(`/match/${localStorage.getItem("user_id")}`, "", "honjaya");
            console.log(response);
        };

        stompClientRef.current.connect({}, connectCallback);
        requestMatch();

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
        if (matchingResult) {
            alert("매청 성사!")
            dispatch(setMathcingModalClose());
        }
    }, [matchingResult])



    return (
        <div className='invisible'>

        </div>
        // <div className='absolute bottom-5 right-2 w-20 h-10'>
        //     {matchingResult && (
        //         <div>
        //             <h3>매칭된 사용자: {matchingResult.name}</h3>
        //         </div>
        //     )}
        // </div>
    )
}

export default MatchingModal;
