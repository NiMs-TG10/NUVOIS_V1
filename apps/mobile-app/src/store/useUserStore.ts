import { create } from 'zustand';
export const useUserStore = create<{ profile: any; setProfile: (p:any)=>void }>((set)=>({ profile: null, setProfile: (p)=>set({ profile: p }) }));
