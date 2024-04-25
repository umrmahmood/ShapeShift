
import '../../styling/regPrinter.css'
import PrinterForm from './PrinterForm.jsx';
const RegPrinter = () => {


    return (
        <>
        <h1>Welcome Guest!</h1>
        <h2 className='ph3'>Add Printer</h2>
        <div className="regprinter-container">
            <div className="regprinter-sidepanel">
                <ul>
                    <li>Printer</li>
                    <li>Material</li>
                    <li>Settings</li>
                </ul>

            </div>
            <div className="regprinter-main">
               
               <PrinterForm/>

            </div>
        </div>
        </>
    )
}

export default RegPrinter;