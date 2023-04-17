import React, { useEffect } from 'react';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import waitForMs from '../@core/utils/waitForMs';
import { useLever } from 'context/LeverContext';
import { useDialog } from 'context/DialogContext';


function EndGameScript() {
    const { getComponent } = useGameObject();
    const { isAllLeverComplete } = useLever();
    const { showDialog } = useDialog();


    useGameObjectEvent<InteractionEvent>('interaction', async () => {
        // if all levers completed
        if (isAllLeverComplete()) {
            // show end game modal
            showDialog(['I finally escaped the Castle!!'], true);
        } else {
            showDialog(['You need to complete all the levers first!'], true);
        }

        return waitForMs(400);
    });

    return null;
}
export default function EndGame(props: GameObjectProps) {
    return (
        <GameObject layer="obstacle" {...props}>
            <Collider />
            <Interactable />
            <EndGameScript />
        </GameObject>
    );
}
