/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";

export default function MetaData({ title }) {
  return (
    <Helmet>
      <title>{`${title} - ByTheScruff`}</title>
    </Helmet>
  );
}
