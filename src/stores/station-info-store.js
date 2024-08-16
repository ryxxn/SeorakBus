import { create } from 'zustand';
import { devtools } from 'zustand/middleware'

const stationInfoStore = (set) => ({
  selectedOrigin: '설악',
  setSelectedOrigin: (selectedOrigin) => set({ selectedOrigin }),
  changeOrigin: () => set((prevOrigin) => {
    const selectedOrigin = prevOrigin.selectedOrigin === '설악' ? '잠실' : '설악';
    return { selectedOrigin }
  }),
})

export const useStationInfoStore = create(devtools(stationInfoStore));

