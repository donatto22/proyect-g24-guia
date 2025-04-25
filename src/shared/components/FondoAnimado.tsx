import { NeatGradient, NeatConfig } from '@firecms/neat'
import { useEffect, useRef } from 'react'

const FondoAnimado = () => {
    const canvasRef = useRef(null)
    const gradientRef = useRef(null)

    useEffect(() => {
        if (!canvasRef.current) return

        gradientRef.current = new NeatGradient({
            ref: canvasRef.current,
            colors: [
                {
                    color: '#FF5373',
                    enabled: true,
                },
                {
                    color: '#17E7FF',
                    enabled: true,
                },
                {
                    color: '#FFC858',
                    enabled: true,
                },
                {
                    color: '#6D3BFF',
                    enabled: true,
                },
                {
                    color: '#f5e1e5',
                    enabled: false,
                },
            ],
            speed: 8.5,
            horizontalPressure: 7,
            verticalPressure: 8,
            waveFrequencyX: 2,
            waveFrequencyY: 1,
            waveAmplitude: 8,
            shadows: 4,
            highlights: 6,
            colorBrightness: 0.95,
            colorSaturation: -8,
            wireframe: false,
            colorBlending: 10,
            backgroundColor: '#003FFF',
            backgroundAlpha: 1,
            grainScale: 4,
            grainSparsity: 0,
            grainIntensity: 0.25,
            grainSpeed: 1,
            resolution: 1,
            yOffset: 0,
        })

        return gradientRef.current.destroy
    }, [canvasRef.current])

    return (
        <canvas ref={canvasRef} style={{
            width: '100%', height: '100%', isolation: 'isolate'
        }} />
    )
}

export default FondoAnimado