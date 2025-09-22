import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLink } from "../../services/links";

function Redirector() {
  const { link } = useParams();
  // const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLink = async () => {
      try {
        const response = await getLink(link);
        console.log(response);
        if (response && response.redirect_to) {
          // Redirige a la URL obtenida
          window.location.href = response.redirect_to;
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      }
    };

    fetchLink();
  }, [link]);

  if (error) {
    return <h1>404 - Recurso o link no existe</h1>;
  }

  return <p>Redirigiendo...</p>;
}

export default Redirector;
