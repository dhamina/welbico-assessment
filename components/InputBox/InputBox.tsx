import { InputProps } from "@/interfaces"

export  const  InputBox = ( {onChange}:InputProps)=> {
    return (
      <>
        <input onChange={(e)=>onChange(e)} className="inpt__cn" />
        <style jsx>
            {
                `
                .inpt__cn{
                    display: block;
                    width: 100%;
                    padding: 0.375rem 0.75rem;
                    font: 16px / 26px hind, sans-serif;
                    color: rgb(73, 80, 87);
                    background-image: none;
                    background-clip: padding-box;
                    border: 1px solid rgb(206, 212, 218);
                    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s, -webkit-box-shadow 0.15s ease-in-out 0s;
                    height: 40px;
                    outline: none;
                    border-radius: 5px;
                }
                
                `
            }
        </style>
      </>
    )
  }
  