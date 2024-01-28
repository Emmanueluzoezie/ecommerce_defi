import { createQR, encodeURL } from '@solana/pay';
import React, { useEffect, useRef } from 'react';
import { PublicKey } from '@solana/web3.js';

type TransactionProductRequest= {
    reference: PublicKey;
    amount: number;
    name: string;
    token: string;
};

const queryBuilder = (baseUrl: string, params: string[][]) => {
    let url = baseUrl + '?';
    params.forEach((p, i) => url += p[0] + '=' + p[1] + (i != params.length - 1 ? '&' : ''));
    return url;
}

function ScanCodeView({ reference, amount, name, token }: TransactionProductRequest) {
    const qrRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const params = [
            ['reference', reference.toBase58()],
            ['amount', (amount * 0.001).toString()],
            ['name', name],
            ['token', "SOL"],
        ];

        const apiUrl = queryBuilder(
            `${window.location.protocol}//${window.location.host}/api/transaction`,
            params,
        )
        
        const qr = createQR(
            encodeURL({ link: new URL(apiUrl) }),
            360,
            'transparent'
        );

        qr.update({ backgroundOptions: { round: 1000 } });
        if (qrRef.current) {
            qrRef.current.innerHTML = '';
            qr.append(qrRef.current);
        }
    }, [reference, amount, name, token]);

    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
                Scan to proceed
            </h1>
            <div ref={qrRef} />
        </div>
    );
}

export default ScanCodeView;