import React, { Fragment, useEffect } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import Player from '../entities/Player';
import spriteData from '../spriteData';
import BedTop from '../entities/BedTop';
import BedBot from '../entities/BedBot';
import BookShelfTop from '../entities/BookShelfTop';
import BookShelfBot from '../entities/BookShelfBot';
import Shelf from '../entities/Shelf';
import Box from '../entities/Box';
import Table from '../entities/Table';
import Chair from '../entities/Chair';
import Lever from '../entities/Lever';
import { useDialog } from "../context/DialogContext";

const mapData = mapDataString(`
E E { ^ ^ ^ ^ ^ } E { ^ ^ ^ ^ ^ }
E E [ - S - 1 1 ] E [ - S - 1 1 ]
E E L B · · 2 2 R E L B · · 2 2 R
E E L b · · · · R E L b · · · · R
E E L & · · · C R E L & · · · C R
E E L O · · · T R E L O · · · T R
E E > # # # # # < E > # # # # # <
E E E E { ^ } E E E E E { ^ } E E
E E E E L D R E E E E E L D R E E
E E { ^ ( · ) _ ^ ^ ^ = ( · ) ^ ^
E E [ - X · Y - - - - - X · Y - -  
E E L · · · · V · · · V · · · · ·
`);

const resolveMapTile: TileMapResolver = (type, x, y) => {
    const key = `${x}-${y}`;
    const position = { x, y };

    const floor = (
        <GameObject key={key} {...position} layer="ground">
            <Sprite {...spriteData.map} state="floor1" />
        </GameObject>
    );

    const top_wall = (
        <GameObject key={key} {...position} layer="wall">
            <Collider />
            <Sprite {...spriteData.map} state="wall_top_upper" />
        </GameObject>
    )

    const bot_wall = (
        <GameObject key={key} {...position} layer="wall">
            <Collider />
            <Sprite {...spriteData.map} state="wall_top_lower" />
        </GameObject>
    )

    switch (type) {
        case '·':
            return (
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.map} state="floor1" />
                </GameObject>
            );
        case '#':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.map} state="wall_bottom" />
                </GameObject>
            );
        case 'R':
            return (
                 <GameObject key={key} {...position} layer="wall">
                     <Collider />
                    <Sprite {...spriteData.map} state="wall_right" />
                </GameObject>
            );
        case 'L':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.map} state="wall_left" />
                </GameObject>
            );
        case '[':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.map} state="wall_left_top_lower" />
                </GameObject>
            );     
        case ']':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.map} state="wall_right_top_lower" />
                    </GameObject>
                 );     
        case '{':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.map} state="wall_left_top_upper" />
                </GameObject>
            );   
        case '}':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                        <Sprite {...spriteData.map} state="wall_right_top_upper" />
                </GameObject>
            );  
        case '(':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Sprite {...spriteData.map} state="wall_upper_corner_left" />
                </GameObject>
            );  
        case ')':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Sprite {...spriteData.map} state="wall_upper_corner_right" />
                </GameObject>
            ); 
        case 'X':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Sprite {...spriteData.map} state="wall_lower_corner_left" />
                </GameObject>
            );  
        case 'Y':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Sprite {...spriteData.map} state="wall_lower_corner_right" />
                </GameObject>
            );   
        case '-':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                        <Sprite {...spriteData.map} state="wall_top_lower" />
                </GameObject>
            );   
        case '^':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                        <Sprite {...spriteData.map} state="wall_top_upper" />
                </GameObject>
            );
        case '>':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                        <Sprite {...spriteData.map} state="wall_left_bottom" />
                </GameObject>
            );
        case '<':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                        <Sprite {...spriteData.map} state="wall_right_bottom" />
                </GameObject>
            );  
        case 'B':
                return (
                    <Fragment key={key}>
                        {floor}
                        <BedTop {...position} />
                    </Fragment>
                ); 
        case 'b':
            return (
                <Fragment key={key}>
                    {floor}
                    <BedBot {...position} />
                 </Fragment>
            ); 
        case '1':
            return (
                <Fragment key={key}>
                    {bot_wall}
                    <BookShelfTop {...position} />
                </Fragment>
            ); 
        case '2':
            return (
                <Fragment key={key}>
                    {floor}
                    <BookShelfBot {...position} />
                </Fragment>
            ); 
        case 'S':
            return (
                <Fragment key={key}>
                    {bot_wall}
                    <Shelf {...position} />
                 </Fragment>
                );
        case 'O':
            return (
                <Fragment key={key}>
                    {floor}
                    <Box {...position} />
                </Fragment>
            );
        case 'T':
            return (
                <Fragment key={key}>
                    {floor}
                    <Table {...position}/>
                </Fragment>
            );  
        case 'C':
            return (
                <Fragment key={key}>
                    {floor}
                    <Chair {...position} />
                </Fragment>
            ); 
        case 'E':
            return (
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.items2} state="space" />
                </GameObject>
            ); 
        case 'D':
            return (
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.map} state="door" />
                </GameObject>
            ); 
        case '_':
            return (
                <Fragment key={key}>
                    {top_wall}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.map} state={"shelfB"} />
                    </GameObject>
                </Fragment>
            );
        case '=':
            return (
                <Fragment key={key}>
                    {top_wall}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.map} state={"shelfC"} />
                    </GameObject>
                </Fragment>
            );
        case 'V':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"left_table3"} />
                    </GameObject>
                </Fragment>
            );
        case '&':
            return (
                <Fragment key={key}>
                    {floor}
                    <Lever {...position} />
                </Fragment>
            ); 
        default:
            return null;
    }
};

const ShowDelayedDialog = () => { // NOTE: only put in its own component so it doesnt show up until after the assets are loaded
    const messages = [
        "Huh…. Where am I?",
        "How did I get here?",
    ];

    const { showDialog } = useDialog();
    useEffect(() => {
        showDialog(messages);
    }, []);
    return <></>
}

export default function BedroomScene() {
    return (
        <>
            <GameObject name="map">
                <ShowDelayedDialog />
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={5} y={5}>
                <Collider/>
                <Interactable />
                <ScenePortal name="exit" enterDirection={[0, 1]} target="halloflevers/entrance" />
            </GameObject>
            <Player x={5} y={7} />
        </>
    );
}
