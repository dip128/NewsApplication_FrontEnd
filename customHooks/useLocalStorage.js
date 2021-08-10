import { useEffect,useState } from "react";


function useLocalStorage(key,defaultValue){

    const[state,setstate] = useState(() =>{
        let value;
        try{
            value = (localStorage.getItem(key) || String(defaultValue))
        }
        catch(e){
            value=""
        }

        return value;
    })

    useEffect(() =>{
        localStorage.setItem(key,state)
    },[state])

    return [state,setstate]

}

export default useLocalStorage