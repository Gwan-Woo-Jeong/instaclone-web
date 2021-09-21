import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

type Props = {
  title: string;
};

function PageTitle({ title }: Props) {
  return (
    <Helmet>
      <title>{title} | Instaclone</title>
    </Helmet>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageTitle;
