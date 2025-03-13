import { UserInfo } from "@/types";
import { createContext, useContext, useState, PropsWithChildren, Dispatch, SetStateAction } from "react";




interface GlobalState {
  success: boolean;
  userInfo: UserInfo;
}


interface SendContextType {
  globalState: GlobalState;
  setGlobalState: Dispatch<SetStateAction<GlobalState>>;
}

// Creamos el contexto con un valor por defecto como `undefined`
const SendContext = createContext<SendContextType | undefined>(undefined);

function ProviderSendContext({ children }: PropsWithChildren) {
  const [globalState, setGlobalState] = useState<GlobalState>({
    success: false,
    userInfo: {
      email: "",
      fullName: "",
      gitHubUserName: "",
      avatarUrl: null,
      tickect: null,
    },
  });

  return (
    <SendContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </SendContext.Provider>
  );
}


const useSendContext = () => {
  const context = useContext(SendContext);
  if (!context) {
    throw new Error("useSendContext must be used within a  <ProviderSendContext>");
  }
  return context;
};


// eslint-disable-next-line react-refresh/only-export-components
export { ProviderSendContext, useSendContext };
