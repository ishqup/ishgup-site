const OGTemplate = (person: string, num: string) => {
    return (
        <div style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            backgroundColor: '#7b68d0',
            fontSize: 60,
            letterSpacing: -2,
            fontWeight: 700,
            padding: 150,
            color: "white"
        }}>
            <div style={{ display: 'flex' }}>
                <div style={{ fontSize: 600, left: 300, top: -250, }}>{num}</div>
            </div>
            <div style={{ display: 'flex', right: 1100, bottom: 135 }}>
                <img src={`https://raw.githubusercontent.com/ishqup/ishgup-site/master/src/image-generator/stonks-players/${person}.png`} width={1100} />
            </div>


        </div>

    )
}

export default OGTemplate;