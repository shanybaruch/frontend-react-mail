import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'

export function ComposeModal({ onClose, onSend }) {
    const [fields, setFields] = useState({ to: '', subject: '', body: '' })

    function handleChange(e) {
        setFields(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    function handleSend() {
        onSend(fields)
        onClose()
    }

    return (
        <div className="compose-overlay" onClick={onClose}>
            <div className="compose-modal" onClick={e => e.stopPropagation()}>
                <div className="compose-modal-header">
                    <span>New Message</span>
                    <button className="compose-close-btn" onClick={onClose}><IoClose /></button>
                </div>

                <div className="compose-modal-body">
                    <div className="compose-field">
                        <label>To</label>
                        <input
                            name="to"
                            type="email"
                            value={fields.to}
                            onChange={handleChange}
                            placeholder="Recipients"
                            autoFocus
                        />
                    </div>
                    <div className="compose-field">
                        <label>Subject</label>
                        <input
                            name="subject"
                            type="text"
                            value={fields.subject}
                            onChange={handleChange}
                            placeholder="Subject"
                        />
                    </div>
                    <textarea
                        className="compose-body"
                        name="body"
                        value={fields.body}
                        onChange={handleChange}
                        placeholder="Write your message..."
                    />
                </div>

                <div className="compose-modal-footer">
                    <button className="compose-send-btn" onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    )
}
