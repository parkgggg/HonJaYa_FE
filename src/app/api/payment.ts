export const requestPayment = async (payInfoDto: any, userId: number, token: string | null) => {
    const response = await fetch(`http://localhost:8080/api/payment/ready?userId=${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payInfoDto),
    });

    if (!response.ok) {
        throw new Error('Payment preparation failed');
    }

    return await response.json();
};
