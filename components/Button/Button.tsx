import { ButtonProps } from "@/interfaces";


export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <>
      <button className="btn__cn" onClick={() => onClick()}>{label}</button>
      <style jsx>
        {
         `
         .btn__cn{
            padding: 15px 24px 13px;
            border-radius: 4px;
            font: 500 17px / 20px hind, sans-serif;
            color: white;
            background-color: rgb(18, 83, 181);
            justify-content: center;
            text-align: center;
            cursor: pointer;
            text-decoration: none;
            outline: none;
            border: none;
            width: 280px;
            text-transform: uppercase;
         }
         `
        }
      </style>
    </>
  );
};
