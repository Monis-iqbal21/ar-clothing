import "./categoryProduct.css";
import pic from "../../assets/images/multi2.jpg";
import Image from "next/image";
const CategoryProduct = () => {
  return (
    <div className="product_container">
      <div className="product_img_div">
        <Image src={pic} alt="image" className="pro_img"/>
      </div>
      <div className="product_name_div">
        Shirt
      </div>
    </div>
  );
};

export default CategoryProduct;
