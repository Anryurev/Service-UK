import React from "react";

interface ModalProps{
    isOpen: boolean,
    onClose: () => void,
    title: string,
    children: React.ReactNode,
    footer?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({isOpen, onClose, title, children, footer}) => {
    if(!isOpen) return null

    return (
        <>
            <div className="modal fade show" style={{ display: "block" }} tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">{children}</div>
                        {footer ? <div className="modal-footer">{footer}</div> : null}
                    </div>
                </div>
            </div>
            <div className="modal-backdrop show"></div>
        </>
    )
}