import { useState } from "react";

const AccoladesDropdown = () => {

    const [isOpen, setOpen] = useState(false)

    return (
        <div className="text-center max-w-lg mx-auto">
            <button onClick={() => setOpen(!isOpen)}
                className="font-bold font-IBM  rounded-xl w-full py-2 bg-slate-800 bg-opacity-75 hover:bg-opacity-10 transition-all">
                {isOpen ? "Hide" : "Show"} Accolades
            </button>
            {/* sm:border-spacing-x-20 md:border-spacing-x-24 */}
            {isOpen ? <table className="mx-auto text-left text-md sm:text-lg md:text-xl border-spacing-1 border-separate border-spacing-x-12">
                <tbody>
                    <tr><td className="font-bold">Neil</td> <td>🏆'23, 🏆'22, 💩'21</td></tr>
                    <tr><td className="font-bold">Sam</td> <td>🏆'21</td></tr>
                    <tr><td className="font-bold">Prad</td> <td>🏆'20</td></tr>
                    <tr><td className="font-bold">Savan</td> <td>💩'20, 🏆'16</td></tr>
                    <tr><td className="font-bold">Ian</td> <td>—</td></tr>
                    <tr><td className="font-bold">Ishan</td> <td>—</td></tr>
                    <tr><td className="font-bold">Mike</td> <td>💩'23, 💩'18</td></tr>
                    <tr><td className="font-bold">Joey</td> <td>💩'22</td></tr>
                </tbody>
            </table> : <></>}

        </div>
    )
}

export default AccoladesDropdown;