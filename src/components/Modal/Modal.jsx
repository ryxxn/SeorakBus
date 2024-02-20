import React, { useEffect, useRef } from 'react'
import "./Modal.scss"

/**
 * Modal 컴포넌트
 * background 클릭해도 닫힘.
 * @param {string} text 내용
 * @param {boolean} isOpen 
 * @param {Function} setIsOpen 
 */
export const Modal = ({
    className,
    isOpen,
    setIsOpen,
    children,
    button,
    closeButton,
    buttonsDirection = "row",
}) => {

    const backgroundRef = useRef(null);

    const handleClickBackground = (e) => {
        if (e.target === backgroundRef.current) {
            setIsOpen(false);
        }
    };

    const handleButtonClick = (onClick) => {
        setIsOpen(false);
        onClick();
    }

    return (
        <>
            <div
                className={`modalContainer ${!isOpen ? 'hide' : ''} ${className}`}
                ref={backgroundRef}
                onClick={handleClickBackground}
            >
                <div className='modalBox'>
                    {children}
                    <div className="buttonsBox"
                        style={buttonsDirection === "row" ? {} : { flexDirection: "column-reverse" }}
                    >
                        {
                            closeButton &&
                            <button
                                className="closeButton"
                                onClick={() => handleButtonClick(closeButton.onClick)}
                            >
                                {closeButton.text}
                            </button>
                        }
                        {
                            button &&
                            <button
                                className="normalButton"
                                onClick={() => handleButtonClick(button.onClick)}
                            >
                                {button.text}
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
