import LinkIcon from "@mui/icons-material/Link";
import { Avatar } from "@mui/material";
import PropTypes from "prop-types";

const getFaviconUrl = (url) => {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  } catch (error) {
    console.error("Invalid URL:", url);
    return null;
  }
};

const LinkIconComponent = ({ url, size = 32 }) => {
  const faviconUrl = getFaviconUrl(url);

  return faviconUrl ? (
    <Avatar
      src={faviconUrl}
      sx={{
        width: size,
        height: size,
        borderRadius: 4, // Menos redondo, más cuadrado
        mr: 1, // Espacio a la derecha
      }}
    />
  ) : (
    <LinkIcon
      color="primary"
      sx={{
        width: size,
        height: size,
        mr: 1, // Espacio a la derecha
      }}
    />
  );
};

LinkIconComponent.propTypes = {
  url: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default LinkIconComponent;
