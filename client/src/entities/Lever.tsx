import React, { useRef } from 'react';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite, { SpriteRef } from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import waitForMs from '../@core/utils/waitForMs';
import spriteData from '../spriteData';
import { useQuestion } from 'context/QuestionContext';

function LeverScript() {
    const { getComponent } = useGameObject();
    const { showQuestion } = useQuestion();
    const leverState = useRef(false);

    function changeLeverState() {
        console.log('change lever state')
        leverState.current = !leverState.current;

        if (leverState.current) {
            getComponent<SpriteRef>('Sprite').setState('lever2');
            console.log('lever on')
        } else {
            getComponent<SpriteRef>('Sprite').setState('lever1');
        }
    }

    useGameObjectEvent<InteractionEvent>('interaction', async () => {
        if (leverState.current) return;
        showQuestion();
        // todo: update lever state when answered correctly
        changeLeverState();
        return waitForMs(400);
    });

    return null;
}
export default function Lever(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider />
            <Sprite {...spriteData.lever} state={"lever1"} />
            <Interactable />
            <LeverScript />
        </GameObject>
    );
}
