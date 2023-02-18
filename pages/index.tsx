import Head from "next/head";
import Image from "next/image";
import { InputBox } from "@/components/InputBox/InputBox";
import { Button } from "@/components/Button/Button";
import { TextElement } from "@/components/TextElement/TextElement";
import { getAuthToken, getPrograms, getResidents } from "@/services";
import { use, useEffect, useState } from "react";
import { CheckEmail, convertArrayToObject } from "@/utils/utilities";
import cookie from "js-cookie";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [token,setToken] = useState(cookie.get("token") || '');
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [residents, setResidents] = useState<Array<any>>([]);
  const [programs, setPrograms] = useState<Array<any>>([]);

  const onEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const onClickHandler = async () => {
    const checkEmail = CheckEmail(email);
    if (checkEmail.error) {
      alert(checkEmail.error);
    } else {
      const payload = {
        email: email,
      };
      try {
        const response = await getAuthToken(payload);
        if (response.data) {
          setToken(response.data.token)
          cookie.set("token", response.data.token, { expires: 0.001 });
          cookie.set("email", response.data.email, { expires: 0.001 });
        }
        fetchResidents(response.data.token);
      } catch (e: any) {
        console.log(e.response.data);
      }
    }
  };

  const fetchResidents = async (token:string) => {
    setIsLoading(true);
    try{
      const [residents, programs] = await Promise.all([
        getResidents(token),
        getPrograms(token),
      ]);
      setIsLoading(false);
      const residentData = convertArrayToObject(residents.data, "id");
      setResidents(residentData);
      setPrograms(programs.data);
      setIsAuthorized(true);
    }
    catch(e:any){
      console.log(e)
    }
   
  };

  useEffect(() => {
    if (token) {
      setIsAuthorized(true);
      fetchResidents(token);   
    }
    else{
      setIsLoading(false)
    }
    setInterval(() => {
      const newToken = cookie.get('token');
      if(newToken){
        setIsAuthorized(true)
      }
      else{
        setIsAuthorized(false)
      }
    }, 900000);
  }, []);
  return (
    <div
      className={`app__cn ${(!isAuthorized || isLoading) && "full__height"}`}
    >
      {!isAuthorized && !isLoading && (
        <div className="app__cn__hme__cn">
          <TextElement text="Please enter an email to proceed further." />
          <InputBox onClick={onClickHandler} onChange={onEmailChange} />
          <div className="app__cn__hme__cn__btn__cn">
            <Button label={"Submit"} onClick={onClickHandler} />
          </div>
        </div>
      )}
      {isAuthorized && !isLoading && (
        <>
          <h1 className="rs__hdr">Programs and Attendees</h1>
          <div className="rs__cn">
            <div className="rs__cn__hdr">
              <p>Programs</p>
              <p>Hobbies</p>
              <p>Attendees</p>
            </div>
            <div className="">
              {programs.map((r: any,index:number) => {
                return (
                  <div key={r.id} className="rs__cn__body">
                    <p className="rs__cn__body__prgm" key={r.id}>
                      {r.name}{" "}
                    </p>
                    <div className="rs__cn__body__hbby">
                      {r.hobbies.map((h: string,index:number) => (
                        <p key={index+`---${h}`}> {h} </p>
                      ))}
                    </div>
                    <div className="rs__cn__body__res">
                      {r.attendance.map((l: any, index: number) => {
                        return (
                          <p key={index} className="rs__cn__body__res__p">
                            {residents[l.residentId].name}
                            {index === r.attendance.length - 1 ? "." : ","}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      <style jsx>
        {`
          .app__cn {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            background: white;
            padding: 40px;
          }
          .full__height{
            height:100vh;
          }
          .app__cn__hme__cn {
            display: flex;
            flex-direction: column;
            width: 500px;
            height: 360px;
            background: white;
            padding: 15px;
            border: 1px solid rgb(221, 221, 221);
            justify-content: center;
            align-items: center;
          }
          .app__cn__hme__cn__btn__cn {
            margin-top: 40px;
          }
          .rs__hdr {
            text-transform: uppercase;
            font-family: calibri;
          }
          .rs__cn {
            width: 100%;
          }

          .rs__cn__hdr {
            display: flex;
            justify-content: space-between;
            margin: 40px 20px;
            padding: 20px;
            border: 1px solid rgb(221, 221, 221);
            margin-bottom: 0px;
            font-size: 18px;
            font-weight: 600;
            text-transform: uppercase;
            font-family: calibri;
            color: rgb(18, 83, 181);
          }
          .rs__cn__body {
            display: flex;
            justify-content: space-between;
            margin: 0px 20px;
            padding: 20px;
            border: 1px solid rgb(221, 221, 221);
            border-top: white;
            font-size: 16px;
            font-family: calibri;
          }
          .rs__cn__body__prgm {
            flex: 1 1 30%;
            order: 1;
          }
          .rs__cn__body__hbby {
            flex: 1 1 30%;
            order: 2;
            text-align: center;
          }
          .rs__cn__body__res {
            flex: 1 1 30%;
            order: 3;
            text-align: end;
            display: flex;
            flex-wrap: wrap;
          }
          .rs__cn__body__res__p{
            margin-right:10px;
            margin-bottom:10px;
          }
          .rs__cn__body:nth-of-type(2n) {
            background:#F3F9FC;;
          };
          }
        `}
      </style>
    </div>
  );
}
