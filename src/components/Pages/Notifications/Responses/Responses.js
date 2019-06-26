import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import SlackLogo from "img/slacklogo.jpg";

import { getAllResponses, seeResponse } from "store/actions";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import SettingsCell from "@material-ui/icons/SettingsCell";
import Email from "@material-ui/icons/Email";

import {
  styles,
  ResponsesWrapper,
  MainWrapper,
  HeaderWrapper
} from "./styles.js";

function Responses(props) {
  const { classes, responses, getAllResponses: responsesFromProps } = props;
  const [service, setService] = useState("all");
  const [allResponses, setAllResponses] = useState([]);

  useEffect(() => {
    responsesFromProps();
  }, [responsesFromProps]);

  useEffect(() => {
    setAllResponses(responses.filter(r => !r.seen));
  }, [responses]);

  const ReturnCorrectServiceLogo = service => {
    if (service === "slack") {
      return (
        <img
          alt="Slack logo"
          style={{ width: "30px", height: "auto" }}
          src={SlackLogo}
        />
      );
    } else if (service === "twillo") {
      return <SettingsCell />;
    } else {
      return <Email />;
    }
  };

  return (
    <MainWrapper>
      <HeaderWrapper>
        <Typography variant="h5">Message Responses</Typography>
        <div>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          />
          <FormControl className={classes.formControl}>
            <Select
              native
              className={classes.selection}
              value={service}
              onChange={e => {
                setService(e.target.value);
              }}
              inputProps={{
                id: "kind-selector",
                label: "Filter Selector"
              }}
            >
              <option value={"all"}>All</option>
              <option value={"twilio"}>Text</option>
              <option value={"sendgrid"}>Email</option>
              <option value={"slack"}>Slack</option>
            </Select>
          </FormControl>
        </div>
      </HeaderWrapper>

      <ResponsesWrapper
        style={
          allResponses.length === 0
            ? { minHeight: "400px", justifyContent: "center" }
            : { minHeight: "400px", justifyContent: "flex-start" }
        }
      >
        {allResponses.length === 0 ? (
          <div style={{ color: "rgba(0,0,0,0.4)" }}>
            Sorry, no responses available!
          </div>
        ) : (
          allResponses
            .filter(response => response.service.includes(service))
            .map(response => {
              return (
                <Card
                  style={{ margin: "10px" }}
                  key={response.id}
                  className={classes.card}
                >
                  <CardContent>
                    <Typography noWrap variant="h5" component="h2">
                      {response.first_name} {response.last_name}
                    </Typography>

                    <Typography className={classes.pos} color="textSecondary">
                      responded to your message via{" "}
                      {response.service === "slack"
                        ? "slack"
                        : response.service === "sendgrid"
                        ? "email"
                        : "text"}{" "}
                      {ReturnCorrectServiceLogo(response.service)}
                    </Typography>
                    <Typography noWrap component="p">
                      {response.response}
                      <br />
                    </Typography>
                  </CardContent>
                  <CardActions
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      size="small"
                      onClick={e => {
                        props.history.push(
                          `/home/team-member/${response.team_member_id}`
                        );
                      }}
                    >
                      See Team Member
                    </Button>
                    <Button
                      size="small"
                      onClick={e => {
                        props.seeResponse(response.id);
                      }}
                    >
                      Dismiss
                    </Button>
                  </CardActions>
                </Card>
              );
            })
        )}
      </ResponsesWrapper>
    </MainWrapper>
  );
}

const mapStateToProps = state => ({
  responses: state.responsesReducer.responses
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { getAllResponses, seeResponse }
  )(Responses)
);
