import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';

const Note = ({ id, data }) => {
    const { updateNodeData } = useAppContext();
    const [text, setText] = useState(data.text);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    useEffect(() => {
        setText(data.text);
    }, [data.text]);

    useEffect(() => {
        updateNodeData(id, 'text', text);
        console.log("Updated text:", text);
    }, [text, id]);

    const frames = Array.from({ length: 4 }, (_, index) => (
        <div
            key={index}
            style={{
                position: 'absolute',
                border: '2px solid #B7B7B7',
                width: `2px`,
                height: `20px`,
                borderRadius: '25%',
                background: '#B7B7B7',
                top: '-13.5px',
                left: `${(index + 1) * (200 / 5)}px`, // Adjust based on current width
                cursor: 'move',
                zIndex: 3,
            }}
        />));

    return (
        <div className="note" style={{ position: 'relative', width: '200px', height: '150px' }}>
           {frames}
            <div
                style={{
                    position: 'absolute',
                    border: '1.5px solid #8C8C8C',
                    borderRadius: '8px',
                    width: `200px`,
                    height: `150px`,
                    background: '#E6E6E6',
                    zIndex: 1,
                }}
            />
            <textarea
                value={text}
                onChange={handleTextChange}
                style={{
                    fontSize: `16px`,
                    color: 'black',
                    border: '2px solid transparent',
                    background: 'transparent',
                    outline: 'none',
                    width: '200px',
                    height: 'auto',
                    minHeight: `184px`,
                    boxSizing: 'border-box',
                    padding: '10px',
                    position: 'absolute',
                    zIndex: 2,
                    textAlign: 'left',
                    resize: 'none',
                    overflow: 'hidden',
                }}
                placeholder='type here...'
            />
        </div>
    );
};

export default Note;