import { lazy } from "react";

const getTemplateComponent = (templateNumber) =>
  lazy(() => import(`@/_templates/Template${templateNumber}`));

export default getTemplateComponent;
