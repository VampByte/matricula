"use client"

// components/ConversationalForm.js
import { useState } from 'react';
import { useTransition, animated } from '@react-spring/web';

const ConversationalForm = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});

    const questions = [
        {
            question: "¿Cuál es tu color favorito?",
            descripcion: "este texto ayuda a la pregunta",
            options: ["Rojo", "Azul", "Verde"],
            next: [1, 2, 3]
        },
        {
            question: "¿Por qué te gusta el rojo?",
            options: ["Es vibrante", "Es apasionado"],
            next: [4, 4]
        },
        {
            question: "¿Por qué te gusta el azul?",
            options: ["Es calmante", "Es profundo"],
            next: [4, 4]
        },
        {
            question: "¿Por qué te gusta el verde?",
            options: ["Es natural", "Es refrescante"],
            next: [5, 5]
        },
        {
            question: "Gracias por completar el formulario.",
            options: [],
            next: []
        },
        {
            question: "¿Qué tipo de verde te gusta?",
            options: ["Verde claro", "Verde oscuro"],
            next: [4, 4]
        }
    ];

    const handleAnswer = (optionIndex) => {
        setAnswers({ ...answers, [step]: optionIndex });

        // Si la respuesta es "Verde" en la primera pregunta, ir a la pregunta específica
        if (step === 0 && optionIndex === 2) {
            setStep(5); // Ir a la pregunta específica para "Verde"
        } else {
            setStep(questions[step].next[optionIndex]);
        }
    };

    const handleGoBack = () => {
        setStep(0);
        setAnswers({});
    };

    const transitions = useTransition(step, {
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    });

    return (
        <>
            <div className="form-container">
                {transitions((style, i) => (
                    <animated.div style={style} className="question-container">
                        <h1>{questions[i].question}</h1>
                        <p>{questions[i].descripcion}</p>
                        <div className="options-container">
                            {questions[i].options.map((option, index) => (
                                <button className="px-4 mx-2 bg-slate-600 text-white" key={index} onClick={() => handleAnswer(index)}>
                                    {option}
                                </button>
                            ))}
                        </div>
                        {step === 4 && (
                            <button onClick={handleGoBack}>Go Back</button>
                        )}
                    </animated.div>
                ))}
            </div>
            <div className="answers-container">
                <h2>Respuestas:</h2>
                {Object.keys(answers).map((stepIndex) => (
                    <p key={stepIndex}>
                        Pregunta {parseInt(stepIndex) + 1}: {questions[stepIndex].options[answers[stepIndex]]}
                    </p>
                ))}
            </div>
        </>
    );
};

export default ConversationalForm;