import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";


interface IstateContext {
    currentNftScreen: string
    setCurrentNftScreen: Dispatch<SetStateAction<string>>
    showImage: boolean
    setShowImage: Dispatch<SetStateAction<boolean>>
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    paymentOption: boolean
    setPaymentOption: Dispatch<SetStateAction<boolean>>
    openAddedProduct: boolean
    setOpenAddedProduct: Dispatch<SetStateAction<boolean>>
    productArray: Product[],
    setProductArray: Dispatch<SetStateAction<Product[]>>
}

const initialState = {
    currentNftScreen: "",
    setCurrentNftScreen: () => "",
    showImage: false,
    setShowImage: () => false,
    isLoading: false,
    setIsLoading: () => false,
    paymentOption: false,
    setPaymentOption: () => false,
    openAddedProduct: false,
    setOpenAddedProduct: () => false,
    productArray: [],
    setProductArray: () => [],
}

const StateContext = createContext<IstateContext>(initialState)

interface Childern {
    children: React.ReactNode
}

export const ContextProvider: React.FC<Childern> = ({ children }) => {
    const [currentNftScreen, setCurrentNftScreen] = useState<string>("product")
    const [showImage, setShowImage] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [openAddedProduct, setOpenAddedProduct] = useState(false)
    const [paymentOption, setPaymentOption] = useState(false)
    const [productArray, setProductArray] = useState<Product[]>([])

    return (
        <StateContext.Provider value={{ currentNftScreen, setCurrentNftScreen, showImage, setShowImage, isLoading, setIsLoading, productArray, setProductArray, openAddedProduct, setOpenAddedProduct, paymentOption, setPaymentOption }}>
            {children}
        </StateContext.Provider>
    )
}
export const useContextState = () => useContext(StateContext)