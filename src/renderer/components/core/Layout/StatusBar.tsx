import React from "react";
import { observer } from "mobx-react";
import { styled } from "src/renderer/stitches.config";
import { useIsHeadlessAvailable } from "src/utils/useIsHeadlessAvailable";
import { useStore } from "src/utils/useStore";
import Button from "../../ui/Button";
import { T } from "src/renderer/i18n";
import { useActivation } from "src/utils/useActivation";

const StatusBarStyled = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: 450,
});

const StatusMessage = styled("span", {
  marginBottom: 8,
  fontWeight: "bold",
  textShadow: "$text",
  lineHeight: 1,
  "& > * + *": {
    marginLeft: 8,
  },
});

function StatusBar() {
  const isAvailable = useIsHeadlessAvailable();
  const { account: accountStore, game } = useStore();
  const { loading, activated } = useActivation(false);
  const loginSession = accountStore.loginSession;

  return (
    <StatusBarStyled>
      <StatusMessage>
        {isAvailable && loginSession && !game.isGameStarted ? (
          <Button
            data-testid="play"
            variant="primary"
            disabled={loading || !activated}
            onClick={() => game.startGame(loginSession.privateKey)}
          >
            <T _str="Start" _tags="v2/start-game" />
          </Button>
        ) : (
          <span data-testid="status">
            {!loginSession ? "Done" : "Loading..."}
          </span>
        )}
      </StatusMessage>
    </StatusBarStyled>
  );
}

export default observer(StatusBar);
