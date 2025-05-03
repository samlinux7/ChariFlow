import React from 'react';

const SuccessStories = () => {
    const stories = [
        {
            id: 1,
            name: 'John Doe',
            story: 'Thanks to ChariFlow, I was able to raise funds for my community project and make a real difference!',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            name: 'Jane Smith',
            story: 'ChariFlow connected me with amazing donors who believed in my cause. Forever grateful!',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 3,
            name: 'Michael Johnson',
            story: 'With ChariFlow, I turned my dream into reality. Highly recommend it to anyone with a vision!',
            image: 'https://via.placeholder.com/150',
        },
    ];

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Success Stories</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {stories.map((story) => (
                    <div
                        key={story.id}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '15px',
                            maxWidth: '300px',
                            textAlign: 'center',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <img
                            src={story.image}
                            alt={story.name}
                            style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }}
                        />
                        <h3 style={{ color: '#555' }}>{story.name}</h3>
                        <p style={{ color: '#777', fontSize: '14px' }}>{story.story}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SuccessStories;