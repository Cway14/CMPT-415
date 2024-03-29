import React from 'react';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';

export default function BedBot(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider />
            <Sprite {...spriteData.items} state={"bed_bot"} />
        </GameObject>
    );
}
