import React, { useEffect } from 'react';
import { Global } from '@emotion/react';
import AssetLoader from '../../@core/AssetLoader';
import Game from '../../@core/Game';
import Scene from '../../@core/Scene';
import SceneManager from '../../@core/SceneManager';
import useWindowSize from '../../@core/useWindowSize';
import OfficeScene from '../../scenes/OfficeScene';
import OtherScene from '../../scenes/OtherScene';
import BedroomScene from '../../scenes/BedroomScene';
import Bedroom2Scene from '../../scenes/Bedroom2Scene';
import HallOfLeversScene from '../../scenes/HallOfLeversScene';
import GreatHallScene from '../../scenes/GreatHallScene';
import KeyRoomScene from '../../scenes/KeyRoomScene';
import soundData from '../../soundData';
import spriteData from '../../spriteData';
import globalStyles from '../../styles/global';
import { useDialog } from "../../context/DialogContext";


const urls = [
    ...Object.values(spriteData).map(data => data.src),
    ...Object.values(soundData).map(data => data.src),
    // flatten
].reduce<string[]>((acc, val) => acc.concat(val), []);

const ShowDelayedDialog = () => { // NOTE: only put in its own component so it doesnt show up until after the assets are loaded
    const messages = [
        "Welcome to the game!",
        "This is an example of a dialog",
        "This is the third dialog",
        "This is the fourth dialog",
    ];

    const { showDialog } = useDialog();
    useEffect(() => {
        showDialog(messages);
    }, []);
    return <></>
}

export default function GameView() {
    const [width, height] = useWindowSize();
    const [showProfileModal, setShowProfileModal] = React.useState(false);

    return (
        <>
            <Global styles={globalStyles} />
            <div style={{ "display": "flex", "width": `${width - (width % 2)}px`, "height": `${height - (height % 2)}px`, "justifyContent": "center", "alignItems": "center" }}>
                <Game cameraZoom={80} showProfileModal={showProfileModal} setShowProfileModal={setShowProfileModal}>
                    <AssetLoader urls={urls} placeholder="Loading assets ...">
                        <ShowDelayedDialog />
                        <SceneManager defaultScene="bedroom">
                            <Scene id="office">
                                <OfficeScene />
                            </Scene>
                            <Scene id="other">
                                <OtherScene />
                            </Scene>
                            <Scene id="bedroom">
                                <BedroomScene />
                            </Scene>
                            <Scene id="room2">
                                <Bedroom2Scene />
                            </Scene>
                            <Scene id="halloflevers">
                                <HallOfLeversScene />
                            </Scene>
                            <Scene id="greathall">
                                <GreatHallScene />
                            </Scene>
                            <Scene id="keyroom">
                                <KeyRoomScene />
                            </Scene>
                        </SceneManager>
                    </AssetLoader>
                </Game>
            </div>
        </>
    );
}
