import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import styles from "./SwaggerUi.module.css";

const SwaggerUi = () => {
  return (
    <div className={`${styles["swagger-ui"]} ${styles.microlight}`}>
      <SwaggerUI url="/MyBlogV3OpenAPI.yaml" />
    </div>
  )
}

export default SwaggerUi