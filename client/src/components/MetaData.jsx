/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";

export default function MetaData({ title }) {
  return (
    <Helmet>
      <title>{`${title} - Driftwood Clothing Co.`}</title>
    </Helmet>
  );
}
