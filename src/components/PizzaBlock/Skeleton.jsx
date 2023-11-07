import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="138" r="120" /> 
    <rect x="0" y="296" rx="10" ry="10" width="280" height="25" /> 
    <rect x="0" y="333" rx="10" ry="10" width="279" height="112" /> 
    <rect x="0" y="457" rx="10" ry="10" width="120" height="33" /> 
    <rect x="154" y="457" rx="10" ry="10" width="123" height="33" />
  </ContentLoader>
)

export default Skeleton

