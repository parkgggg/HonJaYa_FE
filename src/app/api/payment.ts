// src/api/payment.ts
<<<<<<< HEAD
export const requestPayment = async (payInfoDto: { price: number; itemName: string }) => {
    try {
        const response = await fetch('http://localhost:8080/api/payment/ready', {
=======
export const requestPayment = async (payInfoDto: { price: number; itemName: string }, userId: number) => {
    try {
        const response = await fetch(`http://localhost:8080/api/payment/ready?userId=${userId}`, {
>>>>>>> 08e28c1 (chat 캘린더 기능 추가)
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payInfoDto)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error payment:', error);
        throw new Error('Payment failed');
    }
};
