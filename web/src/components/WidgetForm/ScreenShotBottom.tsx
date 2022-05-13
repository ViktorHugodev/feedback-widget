import { Camera, Trash } from "phosphor-react";
import html2canvas from "html2canvas";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenShotButtonProps {
  setScreenShotImage: (screenShotImage: string | null) => void;
  screenShotImage: string | null
}

export function ScreenShotButton({setScreenShotImage, screenShotImage}: ScreenShotButtonProps) {
  const [isTakingScreenShot, setIsTakingScreenShot] = useState(false);
      
  async function handleTakeScreenShot() {
    setIsTakingScreenShot(true);
    const canvas = await html2canvas(document.querySelector("html")!);
    //selector é o html que será convertido para canvas com ! significando que não vai dar erro se não encontrar
    const base64image = canvas.toDataURL("image/png");
    //Converte a imagem em um text/png. Opção para guardar em BD
    setScreenShotImage(base64image)
    setIsTakingScreenShot(false);
  }
  if(screenShotImage){
    return (
      <button
      className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400
       hover:text-zinc-100 transition-colors"
      type="button"
      style={{
        backgroundImage: `url(${screenShotImage})`,
        backgroundPosition:'right bottom',
        backgroundSize:180,
      }}
      >
        <Trash weight="fill" onClick={() => setScreenShotImage('')}/>
    
      </button>
    )
  }
  return (
    <button
      onClick={handleTakeScreenShot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700
     hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900
     focus:ring-brand-500 transition-colors duration-300"
      type="button"
    >
      {isTakingScreenShot ? <Loading/> :  <Camera className="w-6 h6 text-zinc-100" />}
     
    </button>
  );
}
