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
import Lever from '../entities/Lever';
import Chair from '../entities/Chair';
import { useDialog } from "../context/DialogContext";

const mapData = mapDataString(`
E E L · C C · · · · · · · · · · C C · R E E E E E E E E E E E E E
E E L v q w y · · · · · · · · v q w y R E E E E E E E E E E E E E
E E L v a s y · · · · · · · · v a s y R E E E E E E E E E E E E E
E E L · g g · · · · · · & · · · g g · R E E E E E E E E E E E E E
E E > # # # # # # # # # # # # # # # # < E E E E E E E E E E E E E
E E E E E E E E E E { ^ } E E E E E E E E E E E E E E E E E E E E
E E E E E E E E E E L D R E E E E E E E E E E E E E E E E E E E E
E E E E E E E { ^ ^ ( · ) ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ }
E E E E E E E [ - - X · Y - - - - - - - - - - - - - - - - - - - ]
E E E E E E E L · · · · · · · · · · · · · C · · & · · · · · · · R
E E E E E E E L · · · · · · C C · · · · C · · · · · C C · · · · R
E E E E E E E L · · · · · v q w · y · v q w y · · v q w y · · · R
E E E E E E E L · · · · · v a s y · · v a s y · v · a s · y · · R
E E E E E E E L · · · · · · · g & · · · g g · · · · g · · · · · R
E E E E E E E L · · · & · · g · · · · · · · · · · · · g · · · & R
E E E E E E E > # # # # # # # # # # # # # # # # # # # # # # # # <
E E E E E E E E E { ^ } E E E E E E E E E E E E E E E E E E E E E
E E E E E E E E E L D R E E E E E E E E E E E E E E E E E E E E E
^ ^ ^ ^ ^ ^ ^ ^ ^ ( · ) ^ } E E E E E E E E E E E E E E E E E E E
- - - - - - - - - X · Y - ] E E E E E E E E E E E E E E E E E E E
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
        case '(':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                        <Sprite {...spriteData.map} state="wall_upper_corner_left" />
                </GameObject>
            );  
        case ')':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                        <Sprite {...spriteData.map} state="wall_upper_corner_right" />
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
        case '^':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                        <Sprite {...spriteData.map} state="wall_top_upper" />
                </GameObject>
            );
        case 'q':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"table_1"} />
                    </GameObject>
                </Fragment>
        );
        case 'C':
            return (
                <Fragment key={key}>
                    {floor}
                    <Chair {...position} />
                </Fragment>
        ); 
        case 'w':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"table_2"} />
                    </GameObject>
                </Fragment>
        );
        case 'a':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"table_3"} />
                    </GameObject>
                </Fragment>
        );
        case 's':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"table_4"} />
                    </GameObject>
                </Fragment>
        );
        case 'v':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"chair4"} />
                    </GameObject>
                </Fragment>
        );
        case 'g':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"chair2"} />
                    </GameObject>
                </Fragment>
        );
        case 'y':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"chair3"} />
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
        case 'D':
            return (
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.map} state="door" />
                </GameObject>
            ); 
        case 'X':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.map} state="wall_lower_corner_left" />
                </GameObject>
            );  
        case 'Y':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                        <Sprite {...spriteData.map} state="wall_lower_corner_right" />
                </GameObject>
            );   
        default:
            return null;
    }
};

const ShowDelayedDialog = () => { // NOTE: only put in its own component so it doesnt show up until after the assets are loaded
    const messages = [
        "Whew. That was harder than the last room. But it’s finally done, let's see what’s next. ",
        "Wow there's a lot of tables spread out let's try to find the next levers"
    ];

    const { showDialog } = useDialog();
    useEffect(() => {
        showDialog(messages);
    }, []);
    return <></>
}

export default function GreatHallScene() {
    return (
        <>
            <GameObject name="map">
                <ShowDelayedDialog />
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={11} y={13}>
                <Collider />
                <Interactable />
                <ScenePortal name="entrance" enterDirection={[0, -1]} target="halloflevers/exit" />
            </GameObject>
            <GameObject x={10} y={4}>
                <Collider />
                <Interactable />
                <ScenePortal name="exit" enterDirection={[0, 1]} target="keyroom/entrance" />
            </GameObject>
            <Player x={11} y={13} />
        </>
    );
}