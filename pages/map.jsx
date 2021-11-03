import { GoogleMap, LoadScript, InfoWindow } from "@react-google-maps/api";
import Image from "next/image";
import Link from "next/link";
import icon from "../public/img01.jpg";
import icon1 from "../public/pngn.jpg";
import Layout from "../components/layout/Layout";

const containerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 35.69575,
  lng: 139.77521,
};

const positionAkiba = {
  lat: 35.69731,
  lng: 139.7747,
};

const positionIwamotocho = {
  lat: 35.69397,
  lng: 139.7762,
};

const divStyle = {
  width: 50,
  borderRadius: 50,
};

const MyComponent = () => {
  return (
    <Layout title="メシランMAP">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
          <InfoWindow position={positionAkiba}>
            <div style={divStyle}>
              <Link href="/main">
                <a>
                  <Image
                    src={icon}
                    alt=""
                    className="object-cover rounded-full flex items-center justify-center"
                    width="70"
                    height="70"
                  />
                </a>
              </Link>
            </div>
          </InfoWindow>
          <InfoWindow position={positionIwamotocho}>
            <div style={divStyle}>
              <Link href="/main">
                <a>
                  <Image
                    src={icon1}
                    alt=""
                    className="object-cover rounded-full flex items-center justify-center"
                    width="70"
                    height="70"
                  />
                </a>
              </Link>
            </div>
          </InfoWindow>
        </GoogleMap>
      </LoadScript>
    </Layout>
  );
};

export default MyComponent;
