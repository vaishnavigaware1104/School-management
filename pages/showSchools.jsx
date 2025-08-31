import { useEffect, useState } from 'react';

export default function ShowSchools() {
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/getSchools');
                const data = await res.json();
                setSchools(data);
            } catch (err) {
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h1>Schools List</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                {schools.map((s) => (
                    <div key={s.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '10px',
                        padding: '15px',
                        background: '#fff'
                    }}>
                        <div style={{ height: '150px', background: '#f9f9f9', marginBottom: '10px' }}>
                            {s.image
                                ? <img src={s.image} alt={s.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
                                : <p>No Image</p>
                            }
                        </div>
                        <h3>{s.name}</h3>
                        <p>{s.address}</p>
                        <p><b>{s.city}</b></p>
                    </div>
                ))}
            </div>
        </div>
    );
}