import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { fetchWelcomeMessageDetails } from "../../../domain/api/api";

const ApplicationScreen = () => {
  const [welcomePayload, setWelcomePayload] = React.useState<any>();

  const getWelcomeMessage = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const welcomeResponse = await fetchWelcomeMessageDetails(token);
      if (welcomeResponse) {
        setWelcomePayload(welcomeResponse);
      }
    }
  };

  useEffect(() => {
    return () => {
      getWelcomeMessage();
    };
  }, []);
  return (
    <>
      <Grid
        container
        alignItems={"center"}
        justifyContent={"center"}
        direction="column"
      >
        <h1>{welcomePayload?.welcomeMessage}</h1>
      </Grid>
    </>
  );
};

export default ApplicationScreen;
