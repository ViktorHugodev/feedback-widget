import { ToggleButton } from '../ToggleButton';

export function Header() {
  return (
    <div className='h-16 bg-red-600 w-full flex  items-center justify-center'>
      <header className=''>
        <span className='text-xl leading-6'>
          Deixe seu feedback no widget abaixo
        </span>
      </header>
      <ToggleButton />
    </div>
  );
}
