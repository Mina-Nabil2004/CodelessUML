import { useAppContext } from './AppContext';
import React, { useState, useEffect } from 'react';

function TextFrame({ id, data}) {
    const { updateNodeData } = useAppContext();
    const [text, setText] = useState(data.text);
    const[isResizing, setIsResizing] = useState(false);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    useEffect(() => {
        // Update text when initialText changes
        setText(data.text);
    }, [data.text]);

    useEffect(() => {
        // Push updated text into the node data
        updateNodeData(id, 'text', text);
        console.log("Updated text:", text);
    }, [text, id]); // Ensure id is included in the dependency array

    return (
        <div className="textFrame" style={{ position: 'relative' }}>
            <textarea
                value={text}
                onChange={handleTextChange}
                style={{
                    width: '100px',
                    height: '25px',
                    border: '0.5px solid #290633',
                    borderRadius: '5%',
                    backgroundColor: 'white',
                    cursor: 'e-resize',
                    boxShadow: isResizing && resizeDirection === 'right' ? '0 0 10px 2px rgba(128, 0, 128, 0.5)' : 'none',
                    transition: 'box-shadow 0.2s',
                    fontSize: '16px',
                }}
            />
        </div>
    );
}

export default TextFrame;