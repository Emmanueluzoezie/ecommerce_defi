import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IstateContext {
    currentNftScreen: string
    setCurrentNftScreen: Dispatch<SetStateAction<string>>
    showImage: boolean
    setShowImage: Dispatch<SetStateAction<boolean>>
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

const initialState = {
    currentNftScreen: "",
    setCurrentNftScreen: () => "",
    showImage: false,
    setShowImage: () => false,
    isLoading: false,
    setIsLoading: () => false,
}

const StateContext = createContext<IstateContext>(initialState)

interface Childern {
    children: React.ReactNode
}

export const ContextProvider: React.FC<Childern> = ({ children }) => {
    const [currentNftScreen, setCurrentNftScreen] = useState<string>("create_nft")
    const [showImage, setShowImage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    return (
        <StateContext.Provider value={{ currentNftScreen, setCurrentNftScreen, showImage, setShowImage, isLoading, setIsLoading }}>
            {children}
        </StateContext.Provider>
    )
}
export const useContextState = () => useContext(StateContext)