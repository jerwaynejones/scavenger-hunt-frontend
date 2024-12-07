// Ad.js
import React from 'react';

const AdSlot = ({ client, slot, format = 'auto', responsive = 'true', style = { display: 'block', minHeight: '250px', width: '100%' } }) => {
    return (
        <ins className="adsbygoogle"
             style={style}
             data-ad-client={client}
             data-ad-slot={slot}
             data-ad-format={format}
             data-full-width-responsive={responsive}></ins>
    );
};

export default AdSlot;
