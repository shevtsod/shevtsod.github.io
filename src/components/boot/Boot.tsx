import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTitle from '../../hooks/useTitle';
import Caret from '../caret/Caret';
import Logo from '../logo/Logo';

const messages = (
  <>
    <p className="w-2/3">
      <b>shevtsodOS v1.1 (C) 1996-2024, shevtsod Corporation, LTD</b>
    </p>
    <p className="w-2/3">
      <b>DS-BIOS ACPI BIOS Revision 6ef62a58-6b91-4521-80ae-519ba640f839</b>
    </p>
    <p className="w-2/3">CPU: shevtsodCorp (R) CPU X32-00 @ 40 MHz</p>
    <p>
      &emsp;Speed: <b>40 MHz</b>&emsp;&emsp;Count: 2&emsp;&emsp;
      <span className="text-theme-green-800 dark:text-theme-green-400">OK</span>
    </p>
    <p>
      Memory Test: <b>65536K</b>&emsp;&emsp;
      <span className="text-theme-green-800 dark:text-theme-green-400">OK</span>
    </p>
    <br />
    <p>Press DEL to run Setup</p>
    <p>Press F9 for BBS POPUP</p>
    <br />
    <p>Initializing USB Controllers ...</p>
    <p className="text-theme-red-400">
      &emsp;*** ERROR: 0x145A7C6B3E633B9C91D7600D693FFC96 (Location
      0xF5732EF42E3DB6B0E7FEE588D373FAA7, 0x522D54ECD5606FD1652559151E8854EA)
    </p>
    <p className="text-theme-red-400">
      &emsp;*** ERROR: 0x4D2B634BE20F50B53E5FC146705D8BBC (Location
      0x545B9C8564C88DCB4ED7491F0D716816, 0xC67F37C9E02D4D967A9FF05F21E1D2F1)
    </p>
    <p className="text-theme-yellow-800 dark:text-theme-yellow-400">
      &emsp;*** WARN: Non-critical mount errors resolved, proceeding with boot
      sequence (code CAAB0C) ...
    </p>
    <p>Checking File System ... DONE</p>
    <br />
    <br />
    <br />
    <p>WAIT ...</p>
    <p>WAIT ...</p>
    <p>BOOTING ...</p>
    <p>BOOTING ...</p>
    <p>BOOTING ...</p>
  </>
);

export interface BootProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
}

export default function Boot({
  duration = 1000,
  className,
  ...props
}: BootProps) {
  const { t } = useTranslation('app', { keyPrefix: 'components.Boot' });
  const title = t('title');
  const [counter, setCounter] = useState(0);
  const counterMax = messages.props.children.length;
  const startTime = useMemo(() => Date.now(), []);

  useTitle(title.slice(0, (counter / counterMax) * title.length), {
    raw: true,
  });

  // Increment counter
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((value) => {
        // Time since counter started
        const elapsedTime = Date.now() - startTime;
        // Time when counter should reach max
        const remainingTime = duration - elapsedTime;
        // Remaining incrementations required
        const remainingCount = counterMax - value;
        // Minimum incrementation in this interval
        const minIncrement = remainingTime <= 0 ? remainingCount : 1;
        // Maximum incrementation in this interval
        const maxIncrement = Math.min(2, remainingCount);
        // Actual incrementation in this interval
        const randomIncrement = Math.floor(
          Math.random() * (maxIncrement - minIncrement) + minIncrement,
        );
        // Decide if to randomly pause and skip this interval
        const randomPause = remainingTime > 0 && Math.random() > 0.5;

        return randomPause ? value : value + randomIncrement;
      });
    }, duration / counterMax);

    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div
      {...props}
      className={classNames('relative min-h-[100svh] py-10', className)}
    >
      <div className="container px-4 mx-auto text-xs md:text-lg">
        <div className="container flex flex-col justify-start items-end absolute top-0 my-10 -mx-10 z-0">
          <div className="flex flex-col justify-center items-center">
            <Logo className="h-20 w-auto" />
            <b className="mt-2 text-xs">shevtsodOS</b>
            <i className="text-[0.65rem] underline">shevtsod.com</i>
          </div>
        </div>

        <div className="relative z-10">
          {messages.props.children.slice(0, counter)}
          <Caret className="block" />
        </div>
      </div>
    </div>
  );
}
