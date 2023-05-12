import './BrandBanner.css';
import tipplrlogo from './Source/Tipplr Logo.png';

const Brandbanner = () => {
  return (
    <>
      <div className="banner">
        <img className="logo" src={tipplrlogo} alt="Tipplr"/>
        <h4 className="tag">Official Food Delivery Partner</h4>
      </div>
    </>
  );
};
export default Brandbanner;