import React, { useEffect, useMemo, useRef, useState } from "react";
import { observer } from "mobx-react";
import Layout from "src/renderer/components/core/Layout";
import { useStore } from "src/utils/useStore";
import { useActivation } from "src/utils/useActivation";
import { useHistory } from "react-router";
import OnboardingOverlay from "src/renderer/views/OnboardingOverlay";

const isFirst = (state: string): boolean => {
  return state.includes("first");
};

function LobbyView() {
  const { account, game } = useStore();
  const { loading, activated, error } = useActivation(true);
  const history = useHistory();
  const onboardingRequired = useMemo(
    () => isFirst(history.location.search),
    [history.location]
  );
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    if (loading || activated || account.activationKey) return;
    history.push("/register/missing-activation");
  }, [loading, activated, account.activationKey]);

  useEffect(() => {
    if (account.loginSession && activated) {
      game.startGame(account.loginSession.privateKey);
    }
  }, [account.loginSession, activated, game]);

  useEffect(() => {
    if (error) history.push("/error/relaunch");
  }, [error]);

  return (
    <>
      <Layout />
      <OnboardingOverlay
        // isOpen={onboardingRequired && showOnboarding}
        isOpen={false}
        onClose={() => setShowOnboarding(false)}
      />
    </>
  );
}

export default observer(LobbyView);
