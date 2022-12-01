import { createContext, useState } from "react";
import { useSearchParams } from '@src/navigation'

const sidebarContextValue = {
    sidebarOpen: false,
    isCreate: true,
    setSidebarOpen: (val) => {},
    setToCreateMode:(val) =>{},
}
export const SidebarCtx = createContext(sidebarContextValue);

export const SidebarProvider = ({ children })=>{
    const [sidebarOpen, setSidebar] = useState(false)
    const [isCreate, setIsCreate] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()

    const setToCreateMode = (val) =>{
        setIsCreate(val)
    }
    const setSidebarOpen=(val)=>{
        setSidebar(val)
    }
    
    return (
        <SidebarCtx.Provider value={{sidebarOpen, setSidebarOpen, isCreate, setToCreateMode}}>
            {children}
        </SidebarCtx.Provider>
    )
}
