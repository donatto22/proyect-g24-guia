import { create } from 'zustand'

type CounterStore = {
    counter: number
    sumarUno: () => void
    sumarAlgo: (valor: number) => void
    quitarUno: () => void
    duplicar: () => void
    mitad: () => void
}

export const useCounterStore = create<CounterStore>((set) => ({
    counter: 0,
    sumarUno: () => set((state) => ({ counter: state.counter + 1 })),
    sumarAlgo: (valor: number) => set((state) => ({ counter: state.counter + valor })),
    quitarUno: () => set((state) => ({ counter: state.counter - 1 })),
    duplicar: () => set((state) => ({ counter: state.counter * 2 })),
    mitad: () => set((state) => {
        if (state.counter == 0) {
            return { counter: 0 }
        } else {
            return { counter: state.counter / 2 }
        }
    }),
}))