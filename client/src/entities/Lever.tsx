import React, { useEffect } from 'react';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite, { SpriteRef } from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import waitForMs from '../@core/utils/waitForMs';
import spriteData from '../spriteData';
import { useQuestion } from 'context/QuestionContext';
import { useLever } from 'context/LeverContext';

interface LeverProps extends GameObjectProps {
    leverId: number;
}

function LeverScript({ leverId }) {
    const { getComponent } = useGameObject();
    const { showQuestion } = useQuestion();
    const { leverState, setCurrentLever } = useLever();


    useGameObjectEvent<InteractionEvent>('interaction', async () => {
        if (leverState[leverId].current) return;
        setCurrentLever(leverId);
        showQuestion();

        return waitForMs(400);
    });

    useEffect(() => {
        if (leverState[leverId].current) {
            getComponent<SpriteRef>('Sprite').setState('lever2');
        } else {
            getComponent<SpriteRef>('Sprite').setState('lever1');
        }
    }, [leverState]);

    return null;
}
export default function Lever({ leverId, ...rest }: LeverProps) {
    return (
        <GameObject layer="obstacle" {...rest}>
            <Collider />
            <Sprite {...spriteData.lever} state={"lever1"} />
            <Interactable />
            <LeverScript leverId={leverId} />
        </GameObject>
    );
}
