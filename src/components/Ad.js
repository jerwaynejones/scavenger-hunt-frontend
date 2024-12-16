// src/components/Ad.js
import React, { useEffect, useRef } from 'react';

const AdSlot = ({ client, slot, format = 'auto', responsive = 'true', style = { display: 'block', minHeight: '250px', width: '100%' } }) => {
    const adRef = useRef(null);
    const adInitialized = useRef(false);

    useEffect(() => {
        if (adInitialized.current) {
            return;
        }

        adInitialized.current = true;

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('Ad push error:', err);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={style}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive}
            ref={adRef}
        ></ins>
    );
};

export default AdSlot;
