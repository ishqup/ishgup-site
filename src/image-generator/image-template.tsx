import * as React from 'react';

const OGTemplate = (image: string) => {
    return (
        <div style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundImage: 'linear-gradient(to bottom, #8cdcff, #fff1f1)',
            fontSize: 60,
            letterSpacing: -2,
            fontWeight: 700,
            padding: 150
        }}>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{ fontSize: 80 }}>Stonks Fantasy</div>
                <div style={{ fontSize: 80 }}>Week 10</div>
            </div>
            <div style={{
                display: 'flex',
            }}>
                {/* <img src={image} width={200} height={300} /> */}
            </div>
        </div>

    )
}

export default OGTemplate;