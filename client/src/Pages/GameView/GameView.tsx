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
import { QuestionProvider } from '../../context/QuestionContext';
import { usePlayer } from 'context/PlayerContext';


const urls = [
    ...Object.values(spriteData).map(data => data.src),
    ...Object.values(soundData).map(data => data.src),
    // flatten
].reduce<string[]>((acc, val) => acc.concat(val), []);

export default function GameView() {
    const [width, height] = useWindowSize();
    const [showProfileModal, setShowProfileModal] = React.useState(false);
    const { currentRoom } = usePlayer();

    if (!currentRoom) return <></>;

    return (
        <>
            <QuestionProvider >
                <Global styles={globalStyles} />
                <div style={{ "display": "flex", "width": `${width - (width % 2)}px`, "height": `${height - (height % 2)}px`, "justifyContent": "center", "alignItems": "center" }}>
                    <Game cameraZoom={80} showProfileModal={showProfileModal} setShowProfileModal={setShowProfileModal}>
                        <AssetLoader urls={urls} placeholder="Loading assets ...">
                            <SceneManager defaultScene="bedroom">
                                <Scene id="office">
                                    <OfficeScene id="office" chapter="5" />
                                </Scene>
                                <Scene id="other">
                                    <OtherScene id="other" chapter="5" />
                                </Scene>
                                <Scene id="bedroom">
                                    <BedroomScene id="bedroom" chapter="5" />
                                </Scene>
                                <Scene id="room2">
                                    <Bedroom2Scene id="room2" chapter="5" />
                                </Scene>
                                <Scene id="halloflevers">
                                    <HallOfLeversScene id="halloflevers" chapter="5" />
                                </Scene>
                                <Scene id="greathall">
                                    <GreatHallScene id="greathall" chapter="6 and 7" />
                                </Scene>
                                <Scene id="keyroom">
                                    <KeyRoomScene id="keyroom" chapter="8" />
                                </Scene>
                            </SceneManager>
                        </AssetLoader>
                    </Game>
                </div>
            </QuestionProvider>
        </>
    );
}
