import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { styled } from "@stitches/react";
import {
  useStateQueryMonsterCollectionQuery,
  useTopmostBlocksQuery,
} from "src/v2/generated/graphql";
import { useStore } from "src/v2/utils/useStore";
import { useIsPreloadDone } from "src/v2/utils/usePreload";

const UserInfoStyled = styled(motion.ul, {
  position: "fixed",
  top: 30,
  left: 50,
  display: "flex",
  flexDirection: "column",
  padding: 0,
  margin: 0,
});

const UserInfoItem = styled(motion.li, {
  display: "flex",
  height: 27,
});

export default function UserInfo() {
  const account = useStore("account");
  const isDone = useIsPreloadDone();

  const { data: collectionStateQuery } = useStateQueryMonsterCollectionQuery({
    variables: {
      agentAddress: account.selectedAddress,
    },
  });

  if (!isDone || !account.isLogin) return null;

  return (
    <UserInfoStyled>
      <UserInfoItem>{account.selectedAddress}</UserInfoItem>
      <UserInfoItem>
        {Number(collectionStateQuery?.stateQuery.agent?.gold)}
      </UserInfoItem>
    </UserInfoStyled>
  );
}
