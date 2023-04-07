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
import { useQuestion } from 'context/QuestionContext';

const mapData = mapDataString(`
E E { ^ ^ ^ ^ ^ } E { ^ ^ ^ ^ ^ } E E E E E E
E E [ - S - 1 1 ] E [ - S - 1 1 ] E E E E E E
E E L B · · 2 2 R E L B · · 2 2 R E E E E E E
E E L b · · · · R E L b · · · · R E E E E E E
E E L & · · · C R E L & · · · C R E E E E E E
E E L O · · · T R E L O · · · T R { ^ ^ ^ ^ }
E E > # # # # # < E > # # # # # < [ - - 7 - ]
E E E E { ^ } E E E E E { ^ } E E L Z Q 8 9 R
E E E E L D R E E E E E L D R E E L · · · · R
E E { ^ ( · ) _ ^ ^ ^ = ( · ) ^ ^ ( + · · · R
E E [ - X · Y - - - - - X · Y - - X · · · & R
E E L · · · · V · · · V · · · · · · · · 3 4 R
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
        case 'K':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.map} state="left_corner" />
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
        case '+':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items} state={"table"} />
                    </GameObject>
                </Fragment>
            );
        case '3':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"barrels1"} />
                    </GameObject>
                </Fragment>
            );
        case '4':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"barrels2"} />
                    </GameObject>
                </Fragment>
            );
        case '5':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"barrels3"} />
                    </GameObject>
                </Fragment>
            );
        case '6':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"barrels4"} />
                    </GameObject>
                </Fragment>
            );
        case 'Z':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"dtable1"} />
                    </GameObject>
                </Fragment>
            );
        case 'Q':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"dtable2"} />
                    </GameObject>
                </Fragment>
            );
        case '7':
            return (
                <Fragment key={key}>
                    {bot_wall}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"cabinet_top"} />
                    </GameObject>
                </Fragment>
            );
        case '8':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"cabinet_bot"} />
                    </GameObject>
                </Fragment>
            );
        case '9':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"small_cabinet"} />
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
        case 'c':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items2} state={"cent_table"} />
                    </GameObject>
                </Fragment>
            );
        case 'u':
            return (
                <Fragment key={key}>
                    {floor}
                    <GameObject layer="obstacle" {...position}>
                        <Collider />
                        <Sprite {...spriteData.items} state={"up_table"} />
                    </GameObject>
                </Fragment>
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
                    <Table {...position} />
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
        case '&':
            return (
                <Fragment key={key}>
                    {floor}
                    <Lever {...position} leverId={3} />
                </Fragment>
            );
        default:
            return null;
    }
};

export default function Bedroom2Scene() {
    const { setChapter } = useQuestion();
    useEffect(() => setChapter("6 and 7"), [])
    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>
            <GameObject x={13} y={5}>
                <Collider />
                <Interactable />
                <ScenePortal name="exit" enterDirection={[0, 1]} target="halloflevers/entrance2" />
            </GameObject>
            <Player x={13} y={5} />
        </>
    );
}
