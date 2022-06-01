import { Moon, Sun } from 'phosphor-react';
import { useEffect, useState } from 'react';

export function ToggleButton() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.theme === 'dark'
  );

  useEffect(() => {
    const html = window.document.documentElement;

    const prevTheme = isDarkMode ? "light" : "dark";
    html.classList.remove(prevTheme);

    const nextTheme = isDarkMode ? "dark" : "light";
    html.classList.add(nextTheme);

    localStorage.setItem("theme", nextTheme);
  },[isDarkMode])

  function handleDarkMode(){
    setIsDarkMode(!isDarkMode);
  }
  return (
    <div className='ml-auto' >

    <button onClick={handleDarkMode} className='w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center'>

      {isDarkMode ? <Moon size='32px'/> : <Sun size='32px'/>}
    </button>
    </div>
  );
}
