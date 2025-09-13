import { lazy } from "react";

const getTemplateComponent = (templateNumber) => {
  const safeTemplate = templateNumber || "1";
  return lazy(() => import(`@/_templates/Template${safeTemplate}`));
};

export default getTemplateComponent;
