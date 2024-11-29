import { createContext, useState } from "react";
import runChat from "../config/gemini"

export const Context = createContext();

const ContextProvider = (props) => {

        // save de input data
        const [input,setIpunt] = useState("");
        const [recentPrompt,setRecentPrompt] = useState("");
        // historico e display na barra de pesquisados rescentemente
        const [prevPrompts,setPrevPrompts] = useStates([]);
        // vai esconder as caixas e vai mostrar o resultado da pequissa
        const [showResult,setShowResult] = useState(false);
        // animacao de carregamento do texto
        const[loading,setLoading] = useState(false);
        // vai mostrar o texto/resultado final
        const [resultData,setResultData] = useState("");

    const delayPara = (index,nextWord) => {
        setTimeout(function () {
            setResultData(prev=>prev+nextWord);
        },75*index)  
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) => {
        
        setResultData("")
        setLoading(true)
        setShowResult(true)
        let response;
        if(prompt !== undefined){
           response = await runChat(prompt);
           setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
       
        let responseArray = response.split("**");
        let newResponse ="" ;
        for(let i = 0; i < responseArray.length; i++)
        {
            if(i === 0 || i%2 !== 1){
                newResponse += responseArray[i]; 
            }
            else{
                newResponse += "<b>"+responseArray[i] + "</b>";
            }
        }
        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(" ");
        for(let i=0; i<newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setLoading(false)
        setInput("")

    }

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
} 

export default ContextProvider
