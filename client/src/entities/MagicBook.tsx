
import React from 'react';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Sprite from '../@core/Sprite';
import spriteData from '../spriteData';

export default function MagicBook(props: GameObjectProps) {
    return (
        <GameObject layer="item" {...props}>
            <Collider />
            <Sprite {...spriteData.book} state={"book"} offset={{ x: -0.1, y: 0.1 }}/>
        </GameObject>
    );
}
