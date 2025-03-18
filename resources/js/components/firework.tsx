import { useEffect, useState } from 'react';

interface FireworkProps {
    x?: number;
    y?: number;
}

export const Firework = ({ x, y }: FireworkProps) => {
    const [particles, setParticles] = useState<{ id: number; angle: number; distance: number; color: string }[]>([]);

    useEffect(() => {
        // Create particles for the firework
        const particleCount = 20;
        const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
            id: i,
            angle: (Math.PI * 2 * i) / particleCount,
            distance: 30 + Math.random() * 20,
            color: ['#FFD700', '#FF6347', '#00CED1', '#9370DB', '#32CD32'][Math.floor(Math.random() * 5)],
        }));

        setParticles(newParticles);

        // Clean up particles after animation
        const timer = setTimeout(() => {
            setParticles([]);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="pointer-events-none absolute" style={{ left: x, top: y }}>
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="particle"
                    style={{
                        backgroundColor: particle.color,
                        left: 0,
                        top: 0,
                        transform: `translate(${Math.cos(particle.angle) * particle.distance}px, ${Math.sin(particle.angle) * particle.distance}px)`,
                    }}
                />
            ))}
        </div>
    );
};
