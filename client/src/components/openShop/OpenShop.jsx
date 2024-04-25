import '../../styling/regShop.css'
import OpenShopForm from './OpenShopForm';
const OpenShop = () => {


    return (
        <>
        <h1 className='heading-regshop'>Register your shop</h1>
        <div className="regshop-container">

            <div className="regshop-main">
               
            <OpenShopForm/>

            </div>
        </div>
        </>
    )
}

export default OpenShop;