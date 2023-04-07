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
import { useQuestion } from 'context/QuestionContext';
import { useDialog } from "../context/DialogContext";

const mapData = mapDataString(`
E E E E E E E E E E E E E E E E E E E E E L · · · · · v q w · y · v q w y · · v q w y · · · R E E E E E E
E E E E E E E E E E E E E E E E E E E E E L · · · · · v a s y · · v a s y · v · a s · y · · R E E E E E E
E E E E E E E E E E E E E E E E E E E E E L · · · · · · · g 5 · · · g g · · · · g · · · · · R E E E E E E
E E E E E E E E E E E E E E E E E E E E E L · · · 4 · · g · · · · · · · · · · · · g · · · 7 R E E E E E E
E E E E E E E E E E E E E E E E E E E E E > # # # # # # # # # # # # # # # # # # # # # # # # < E E E E E E
E E E E E E E E E E E E E E E E E E E E E E E { ^ } E E E E E E E E E E E E E E E E E E E E E E E E E E E
E E E E E E E E E E E E E E E E E E E E E E E L D R E E E E E E E E E E E E E E E E E E E E E E E E E E E
E E { ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ^ ( · ) ^ ^ ^ ^ ^ ^ ^ } E E E E E E E E E E E E E E E E E E E
E E [ - - - - - - - - - - - - - - - - - - - - X · Y - - - - - - - ] E E E E E E E E E E E E E E E E E E E
^ ^ ( · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · R E E E E E E E E E E E E E E E E E E E
- - X · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · R E E E E E E E E E E E E E E E E E E E
· · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · R E E E E E E E E E E E E E E E E E E E
# # H · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · R E E E E E E E E E E E E E E E E E E E
E E > # # H · K # # # # # H · K # # # # # H · K # # # # # H · K # < E E E E E E E E E E E E E E E E E E E
E E E E E L · R E E E E E L · R E E E E E L · R E E E E E L · R E E E E E E E E E E E E E E E E E E E E E 
E E E { ^ ( · ) ^ } E { ^ ( · ) ^ } E { ^ ( · ) ^ } E { ^ ( · ) ^ } E E E E E E E E E E E E E E E E E E E
E E E L - X · Y - R E L - X · Y - R E L - X · Y - R E L - X · Y - R E E E E E E E E E E E E E E E E E E E
E E E L V · · · · R E L V · · · · R E L V · · · · R E L V · · · · R E E E E E E E E E E E E E E E E E E E
E E E L F · · · · R E L F · · · · R E L F · · · · R E L F · · · · R E E E E E E E E E E E E E E E E E E E
E E E L F · · · · R E L F · · · · R E L F · · · · R E L F · · · · R E E E E E E E E E E E E E E E E E E E
E E E L f · · · 3 R E L f · · · 2 R E L f · · · 1 R E L f · · · 9 R E E E E E E E E E E E E E E E E E E E
E E E > # # # # # < E > # # # # # < E > # # # # # < E > # # # # # < E E E E E E E E E E E E E E E E E E E
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
        case '4':
            return (
                <Fragment key={key}>
                    {floor}
                    <Lever {...position} leverId={4} />
                </Fragment>
            );
        case '5':
            return (
                <Fragment key={key}>
                    {floor}
                    <Lever {...position} leverId={5} />
                </Fragment>
            );
        case '7':
            return (
                <Fragment key={key}>
                    {floor}
                    <Lever {...position} leverId={7} />
                </Fragment>
            );
        case '9':
            return (
                <Fragment key={key}>
                    {floor}
                    <Lever {...position} leverId={9} />
                </Fragment>
            );
        case '1':
            return (
                <Fragment key={key}>
                    {floor}
                    <Lever {...position} leverId={10} />
                </Fragment>
            );
        case '2':
            return (
                <Fragment key={key}>
                    {floor}
                    <Lever {...position} leverId={11} />
                </Fragment>
            );
        case '3':
            return (
                <Fragment key={key}>
                    {floor}
                    <Lever {...position} leverId={12} />
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
        case 'K':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.map} state="left_corner" />
                </GameObject>
            );
        case 'H':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.map} state="right_corner" />
                </GameObject>
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
        case 'F':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"left_table2"} />
                    </GameObject>
                </Fragment>
            );
        case 'f':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"left_table1"} />
                    </GameObject>
                </Fragment>
            );
        default:
            return null;
    }
};

const ShowDelayedDialog = () => { // NOTE: only put in its own component so it doesnt show up until after the assets are loaded
    const messages = [
        "On to the last room lets go wooo! ",
        "There are a lot more rooms this time.",
        "Let get each of these levers."
    ];

    const { showDialog } = useDialog();
    useEffect(() => {
        showDialog(messages);
    }, []);
    return <></>
}


export default function KeyRoomScene() {
    const { setChapter } = useQuestion();
    useEffect(() => setChapter("6 and 7"), [])
    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={24} y={14}>
                <Collider />
                <Interactable />
                <ScenePortal name="entrance" enterDirection={[0, -1]} target="greathall/exit" />
            </GameObject>
            <Player x={24} y={14} />
        </>
    );
}