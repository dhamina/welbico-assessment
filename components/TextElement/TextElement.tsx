import { TextElementProps } from "@/interfaces"

export  const  TextElement = ( {text}:TextElementProps)=> {
    return (
      <>
        <p className="txt__cn"> {text} </p>
        <style jsx>
            {
                `
                .txt__cn{
                    margin: 0px;
                    font-size: 22px;
                    line-height: 26px;
                    padding: 0px 0px 10px;
                    font-family: hind, sans-serif;
                    color: rgb(66, 66, 66);
                }
                
                `
            }
        </style>
      </>
    )
  }
  