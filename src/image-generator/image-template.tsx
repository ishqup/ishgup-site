const OGTemplate = (person1: string, person2: string | undefined, season: string, week: string) => {

    const SEASON_TO_BG_HEX: { [key: string]: string } = {
        "2022": "#f890e7",
        "2023": "#7b68d0",
        "2024": "#8BB8E8",
    }

    return (
        <div style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            backgroundColor: SEASON_TO_BG_HEX[season],
            fontSize: 60,
            letterSpacing: -2,
            fontWeight: 700,
            padding: 150,
            color: "white"
        }}>
            {person2 ?
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ fontSize: 500, left: 175, top: -200, }}>{week}</div>
                    </div>
                    <div style={{ display: 'flex', right: 1050, bottom: 135 }}>
                        <img src={`https://raw.githubusercontent.com/ishqup/ishgup-site/master/src/image-generator/stonks-players/${person1}.png`} width={1100} />
                    </div>
                    <div style={{ display: 'flex', right: 1350, bottom: 135 }}>
                        <img src={`https://raw.githubusercontent.com/ishqup/ishgup-site/master/src/image-generator/stonks-players/${person2}.png`} width={1100} />
                    </div>
                </div>
                :
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ fontSize: 600, left: 300, top: -250, }}>{week}</div>
                    </div>
                    <div style={{ display: 'flex', right: 1100, bottom: 135 }}>
                        <img src={`https://raw.githubusercontent.com/ishqup/ishgup-site/master/src/image-generator/stonks-players/${person1}.png`} width={1100} />
                    </div>
                </div>
            }
        </div>

    )
}

export default OGTemplate;