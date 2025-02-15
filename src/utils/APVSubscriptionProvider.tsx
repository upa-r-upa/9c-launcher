import React from "react";
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { ipcRenderer } from "electron";
import { IDownloadProgress } from "src/interfaces/ipc";
import UpdateView from "src/renderer/views/UpdateView";
import machine from "src/renderer/machines/updateMachine";
import { useEncounteredAPV } from "./useEncounteredAPV";

export default function APVSubscriptionProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [state, send] = useMachine(machine, { devTools: true });
  const apv = useEncounteredAPV();

  useEffect(() => {
    if (apv) {
      ipcRenderer.send("encounter different version", apv);
    }
  }, [apv]);

  useEffect(() => {
    // Progress updates
    ipcRenderer.on(
      "update extract progress",
      (_event, progress: IDownloadProgress) => {
        send({ type: "UPDATE_PROGRESS", progress: progress.percent * 100 });
      }
    );
    ipcRenderer.on(
      "update download progress",
      (_event, progress: IDownloadProgress) => {
        send({ type: "UPDATE_PROGRESS", progress: progress.percent * 100 });
      }
    );
    ipcRenderer.on(
      "update player extract progress",
      (_event, progress: IDownloadProgress) => {
        send({ type: "UPDATE_PROGRESS", progress: progress.percent * 100 });
      }
    );
    ipcRenderer.on(
      "update player download progress",
      (_event, progress: IDownloadProgress) => {
        send({ type: "UPDATE_PROGRESS", progress: progress.percent * 100 });
      }
    );
  }, []);

  return state.matches("ok") ? (
    <>{children}</>
  ) : (
    <UpdateView state={state} progress={state.context.progress} />
  );
}
