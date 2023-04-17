import QuestionDialog from "components/Question/QuestionDialog";
import React, { useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNotification } from "./NotificationContext";
const QuestionContext = React.createContext();

export function useQuestion() {
    return useContext(QuestionContext);
}

const convertToJS = (question) => ({
    ...question,
    options: question.options.split(","),
});

export function QuestionProvider({ children }) {
    const [currentQuestion, setCurrentQuestion] = useState();
    const [chapter, setChapter] = useState("5");
    const [isOpen, setIsOpen] = useState(false);
    const { userProfile } = useAuth();
    const { showNotification } = useNotification();

    async function showQuestion() {
        const response = await fetch(
            process.env.REACT_APP_API +
                "/questions/getQuestion?uid=" +
                userProfile.id +
                "&chapter=" +
                chapter
        );
        const data = await response.json();

        if (data.message) {
            showNotification(data.message, "error");
            return;
        }

        const jsData = convertToJS(data);
        setCurrentQuestion(jsData);
        setIsOpen(true);
    }

    const value = {
        isOpen,
        showQuestion,
        hideQuestion: () => setIsOpen(false),
        setChapter,
    };

    return (
        <QuestionContext.Provider value={value}>
            {isOpen && <QuestionDialog question={currentQuestion} />}
            {children}
        </QuestionContext.Provider>
    );
}
