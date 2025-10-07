import LinkIcon from "@mui/icons-material/Link";
import { Avatar } from "@mui/material";
import PropTypes from "prop-types";

const getFaviconUrl = (url) => {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  } catch (error) {
    return null;
  }
};

function LinkIconComponent({ url, size }) {
  const faviconUrl = getFaviconUrl(url);

  return faviconUrl ? (
    <Avatar
      src={faviconUrl}
      sx={{
        width: size,
        height: size,
        borderRadius: 0,
        mr: 1,
      }}
    />
  ) : (
    <LinkIcon
      color="primary"
      sx={{
        width: size,
        height: size,
        mr: 1,
      }}
    />
  );
}

LinkIconComponent.propTypes = {
  url: PropTypes.string.isRequired,
  size: PropTypes.number,
};

LinkIconComponent.defaultProps = {
  size: 32,
};

export default LinkIconComponent;
