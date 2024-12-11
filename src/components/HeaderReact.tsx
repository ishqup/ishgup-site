import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import HeaderIcon from "./HeaderIcon.astro";

// import "@fontsource/roboto/500.css";

type Props = {
    activePath: string;
}


const HeaderReact = ({ activePath }: Props) => {

    const [open, setOpen] = useState(false);

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 850px)'
    })

    const twitter = <a
        href={"https://www.twitter.com/stonksmuse"}
        className="w-7 h-7 ml-3 fill-white hover:fill-teal-400 transition-all"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
    </a>;

    const linkedin = <a
        href={"https://www.linkedin.com/in/ishqup"}
        className="w-7 h-7 ml-3 fill-white hover:fill-teal-400 transition-all"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
    </a>;

    const github = <a
        href={"https://github.com/ishqup"}
        className="w-7 h-7 ml-3 fill-white hover:fill-teal-400 transition-all"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
    </a>;


    const desktopHeader =
        <div className="flex justify-between items-center">
            <div className="flex items-baseline">
                <div className="text-lg font-sans font-bold pr-2">ishgup</div>

                <div className="text-md font-IBM font-bold [&>a]:mx-3 [&>a]:cursor-pointer">
                    <a className={"hover:text-teal-400 " + (activePath == "home" ? "text-teal-400" : "")} href="/">Home</a>
                    <a className={"hover:text-teal-400 " + (activePath == "projects" ? "text-teal-400" : "")} href="/projects">Projects</a>
                    <a className={"hover:text-teal-400 " + (activePath == "fantasy" ? "text-teal-400" : "")} href="/fantasy">Fantasy</a>
                </div>
            </div>

            <div className="flex">
                {twitter}
                {linkedin}
                {github}
            </div>
        </div>;

    const mobileHeader = <>
        <div className="flex justify-between items-center">
            <a href="/" className="hover:text-teal-400 transition-all">
                <div className="inline-flex w-1/2 text-lg font-sans font-bold">ishgup</div>
            </a>

            <button onClick={() => setOpen(!open)}>
                <svg className="dark:fill-white fill-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
                </svg>
            </button>
        </div>
        {
            (open && !isDesktopOrLaptop) ? <div className="text-lg font-IBM [&>a]:my-2 [&>a]:inline-block font-bold">
                <a href="/" className={(activePath == "home" ? "text-teal-400" : "")}>Home</a> <br />
                <a href="/projects" className={(activePath == "projects" ? "text-teal-400" : "")}>Projects</a> <br />
                <a href="/fantasy" className={(activePath == "fantasy" ? "text-teal-400" : "")}>Fantasy</a> <br />
                <div className="flex [&>:first-child]:ml-0 my-2">
                    {twitter}
                    {linkedin}
                    {github}
                </div>
            </div> : <></>
        }
    </>;

    return (

        <div className={"top-0 z-20 w-full h-14 bg-slate-800 md:pt-1 " + ((open && !isDesktopOrLaptop) ? "sticky" : "")}>
            <div className="absolute w-full">
                <div
                    className={"px-4 sm:px-5 pb-1 pt-2 md:mb-6 items-center sm:max-w-screen-xl mx-auto " + ((open && !isDesktopOrLaptop) ? "bg-slate-800" : "")}
                    style={{ transition: "all .1s ease-in-out" }}
                >
                    {isDesktopOrLaptop ? desktopHeader : mobileHeader}
                </div>
            </div>
        </div>
    );
}

export default HeaderReact;