export interface IConfig {
  ConfigVersion: number;
  AppProtocolVersion: string;
  SnapshotPaths: string[];
  GenesisBlockPath: string;
  StoreType: string;
  NoMiner: boolean;
  SnapshotThreshold: number;
  TrustedAppProtocolVersionSigners: string[];
  IceServerStrings: string[];
  PeerStrings: string[];
  BlockchainStoreDirParent: string;
  BlockchainStoreDirName: string;
  Locale: string;
  Workers: number;
  Confirmations: number;
  HeadlessArgs: string[];
  Mixpanel: boolean;
  Sentry: boolean;
  MuteTeaser: boolean;
  LogSizeBytes: number;
  AwsAccessKey: string | undefined;
  AwsSecretKey: string | undefined;
  AwsRegion: string | undefined;
  Network: string;
  SwapAddress: string | undefined;
  DataProviderUrl: string | undefined;
  UseRemoteHeadless: boolean;
  LaunchPlayer: boolean;
  RemoteNodeList: string[];
  RemoteClientSamplingRate: number;
  PreferLegacyInterface: boolean;
  DownloadBaseURL: string;
  UseUpdate: boolean;
  OnboardingPortalUrl: string;
  UnitySentrySampleRate: number;
}
