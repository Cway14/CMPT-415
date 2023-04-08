import React, { useEffect } from 'react'
import { useQuestion } from 'context/QuestionContext';
import { usePlayer } from 'context/PlayerContext';

interface Props {
    id: string;
    chapter: string;
    children: React.ReactNode;
}

const Scene = ({ id, chapter, children }: Props) => {
    const { setChapter } = useQuestion();
    const { setCurrentRoom } = usePlayer();
    useEffect(() => {
        setChapter("6 and 7")
        setCurrentRoom(id)
    }, []);

    return (
        <>
            {children}
        </>
    )
}

export default Scene