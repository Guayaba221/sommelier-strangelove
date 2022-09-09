/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export type ValsetArgsStruct = {
  validators: PromiseOrValue<string>[];
  powers: PromiseOrValue<BigNumberish>[];
  valsetNonce: PromiseOrValue<BigNumberish>;
  rewardAmount: PromiseOrValue<BigNumberish>;
  rewardToken: PromiseOrValue<string>;
};

export type ValsetArgsStructOutput = [
  string[],
  BigNumber[],
  BigNumber,
  BigNumber,
  string
] & {
  validators: string[];
  powers: BigNumber[];
  valsetNonce: BigNumber;
  rewardAmount: BigNumber;
  rewardToken: string;
};

export type ValSignatureStruct = {
  v: PromiseOrValue<BigNumberish>;
  r: PromiseOrValue<BytesLike>;
  s: PromiseOrValue<BytesLike>;
};

export type ValSignatureStructOutput = [number, string, string] & {
  v: number;
  r: string;
  s: string;
};

export type LogicCallArgsStruct = {
  transferAmounts: PromiseOrValue<BigNumberish>[];
  transferTokenContracts: PromiseOrValue<string>[];
  feeAmounts: PromiseOrValue<BigNumberish>[];
  feeTokenContracts: PromiseOrValue<string>[];
  logicContractAddress: PromiseOrValue<string>;
  payload: PromiseOrValue<BytesLike>;
  timeOut: PromiseOrValue<BigNumberish>;
  invalidationId: PromiseOrValue<BytesLike>;
  invalidationNonce: PromiseOrValue<BigNumberish>;
};

export type LogicCallArgsStructOutput = [
  BigNumber[],
  string[],
  BigNumber[],
  string[],
  string,
  string,
  BigNumber,
  string,
  BigNumber
] & {
  transferAmounts: BigNumber[];
  transferTokenContracts: string[];
  feeAmounts: BigNumber[];
  feeTokenContracts: string[];
  logicContractAddress: string;
  payload: string;
  timeOut: BigNumber;
  invalidationId: string;
  invalidationNonce: BigNumber;
};

export interface GravityBridgeInterface extends utils.Interface {
  functions: {
    "deployERC20(string,string,string,uint8)": FunctionFragment;
    "lastBatchNonce(address)": FunctionFragment;
    "lastLogicCallNonce(bytes32)": FunctionFragment;
    "sendToCosmos(address,bytes32,uint256)": FunctionFragment;
    "state_gravityId()": FunctionFragment;
    "state_invalidationMapping(bytes32)": FunctionFragment;
    "state_lastBatchNonces(address)": FunctionFragment;
    "state_lastEventNonce()": FunctionFragment;
    "state_lastValsetCheckpoint()": FunctionFragment;
    "state_lastValsetNonce()": FunctionFragment;
    "state_powerThreshold()": FunctionFragment;
    "submitBatch((address[],uint256[],uint256,uint256,address),(uint8,bytes32,bytes32)[],uint256[],address[],uint256[],uint256,address,uint256)": FunctionFragment;
    "submitLogicCall((address[],uint256[],uint256,uint256,address),(uint8,bytes32,bytes32)[],(uint256[],address[],uint256[],address[],address,bytes,uint256,bytes32,uint256))": FunctionFragment;
    "testCheckValidatorSignatures((address[],uint256[],uint256,uint256,address),(uint8,bytes32,bytes32)[],bytes32,uint256)": FunctionFragment;
    "testMakeCheckpoint((address[],uint256[],uint256,uint256,address),bytes32)": FunctionFragment;
    "updateValset((address[],uint256[],uint256,uint256,address),(address[],uint256[],uint256,uint256,address),(uint8,bytes32,bytes32)[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "deployERC20"
      | "lastBatchNonce"
      | "lastLogicCallNonce"
      | "sendToCosmos"
      | "state_gravityId"
      | "state_invalidationMapping"
      | "state_lastBatchNonces"
      | "state_lastEventNonce"
      | "state_lastValsetCheckpoint"
      | "state_lastValsetNonce"
      | "state_powerThreshold"
      | "submitBatch"
      | "submitLogicCall"
      | "testCheckValidatorSignatures"
      | "testMakeCheckpoint"
      | "updateValset"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deployERC20",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "lastBatchNonce",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "lastLogicCallNonce",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "sendToCosmos",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "state_gravityId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "state_invalidationMapping",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "state_lastBatchNonces",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "state_lastEventNonce",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "state_lastValsetCheckpoint",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "state_lastValsetNonce",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "state_powerThreshold",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "submitBatch",
    values: [
      ValsetArgsStruct,
      ValSignatureStruct[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "submitLogicCall",
    values: [ValsetArgsStruct, ValSignatureStruct[], LogicCallArgsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "testCheckValidatorSignatures",
    values: [
      ValsetArgsStruct,
      ValSignatureStruct[],
      PromiseOrValue<BytesLike>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "testMakeCheckpoint",
    values: [ValsetArgsStruct, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateValset",
    values: [ValsetArgsStruct, ValsetArgsStruct, ValSignatureStruct[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "deployERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastBatchNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "lastLogicCallNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendToCosmos",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "state_gravityId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "state_invalidationMapping",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "state_lastBatchNonces",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "state_lastEventNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "state_lastValsetCheckpoint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "state_lastValsetNonce",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "state_powerThreshold",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitBatch",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "submitLogicCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testCheckValidatorSignatures",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "testMakeCheckpoint",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateValset",
    data: BytesLike
  ): Result;

  events: {
    "ERC20DeployedEvent(string,address,string,string,uint8,uint256)": EventFragment;
    "LogicCallEvent(bytes32,uint256,bytes,uint256)": EventFragment;
    "SendToCosmosEvent(address,address,bytes32,uint256,uint256)": EventFragment;
    "TransactionBatchExecutedEvent(uint256,address,uint256)": EventFragment;
    "ValsetUpdatedEvent(uint256,uint256,uint256,address,address[],uint256[])": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ERC20DeployedEvent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "LogicCallEvent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "SendToCosmosEvent"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "TransactionBatchExecutedEvent"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ValsetUpdatedEvent"): EventFragment;
}

export interface ERC20DeployedEventEventObject {
  _cosmosDenom: string;
  _tokenContract: string;
  _name: string;
  _symbol: string;
  _decimals: number;
  _eventNonce: BigNumber;
}
export type ERC20DeployedEventEvent = TypedEvent<
  [string, string, string, string, number, BigNumber],
  ERC20DeployedEventEventObject
>;

export type ERC20DeployedEventEventFilter =
  TypedEventFilter<ERC20DeployedEventEvent>;

export interface LogicCallEventEventObject {
  _invalidationId: string;
  _invalidationNonce: BigNumber;
  _returnData: string;
  _eventNonce: BigNumber;
}
export type LogicCallEventEvent = TypedEvent<
  [string, BigNumber, string, BigNumber],
  LogicCallEventEventObject
>;

export type LogicCallEventEventFilter = TypedEventFilter<LogicCallEventEvent>;

export interface SendToCosmosEventEventObject {
  _tokenContract: string;
  _sender: string;
  _destination: string;
  _amount: BigNumber;
  _eventNonce: BigNumber;
}
export type SendToCosmosEventEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  SendToCosmosEventEventObject
>;

export type SendToCosmosEventEventFilter =
  TypedEventFilter<SendToCosmosEventEvent>;

export interface TransactionBatchExecutedEventEventObject {
  _batchNonce: BigNumber;
  _token: string;
  _eventNonce: BigNumber;
}
export type TransactionBatchExecutedEventEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  TransactionBatchExecutedEventEventObject
>;

export type TransactionBatchExecutedEventEventFilter =
  TypedEventFilter<TransactionBatchExecutedEventEvent>;

export interface ValsetUpdatedEventEventObject {
  _newValsetNonce: BigNumber;
  _eventNonce: BigNumber;
  _rewardAmount: BigNumber;
  _rewardToken: string;
  _validators: string[];
  _powers: BigNumber[];
}
export type ValsetUpdatedEventEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, string, string[], BigNumber[]],
  ValsetUpdatedEventEventObject
>;

export type ValsetUpdatedEventEventFilter =
  TypedEventFilter<ValsetUpdatedEventEvent>;

export interface GravityBridge extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: GravityBridgeInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deployERC20(
      _cosmosDenom: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _decimals: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    lastBatchNonce(
      _erc20Address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    lastLogicCallNonce(
      _invalidation_id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    sendToCosmos(
      _tokenContract: PromiseOrValue<string>,
      _destination: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    state_gravityId(overrides?: CallOverrides): Promise<[string]>;

    state_invalidationMapping(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    state_lastBatchNonces(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    state_lastEventNonce(overrides?: CallOverrides): Promise<[BigNumber]>;

    state_lastValsetCheckpoint(overrides?: CallOverrides): Promise<[string]>;

    state_lastValsetNonce(overrides?: CallOverrides): Promise<[BigNumber]>;

    state_powerThreshold(overrides?: CallOverrides): Promise<[BigNumber]>;

    submitBatch(
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      _amounts: PromiseOrValue<BigNumberish>[],
      _destinations: PromiseOrValue<string>[],
      _fees: PromiseOrValue<BigNumberish>[],
      _batchNonce: PromiseOrValue<BigNumberish>,
      _tokenContract: PromiseOrValue<string>,
      _batchTimeout: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    submitLogicCall(
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      _args: LogicCallArgsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    testCheckValidatorSignatures(
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      _theHash: PromiseOrValue<BytesLike>,
      _powerThreshold: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[void]>;

    testMakeCheckpoint(
      _valsetArgs: ValsetArgsStruct,
      _gravityId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[void]>;

    updateValset(
      _newValset: ValsetArgsStruct,
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  deployERC20(
    _cosmosDenom: PromiseOrValue<string>,
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    _decimals: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  lastBatchNonce(
    _erc20Address: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  lastLogicCallNonce(
    _invalidation_id: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  sendToCosmos(
    _tokenContract: PromiseOrValue<string>,
    _destination: PromiseOrValue<BytesLike>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  state_gravityId(overrides?: CallOverrides): Promise<string>;

  state_invalidationMapping(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  state_lastBatchNonces(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  state_lastEventNonce(overrides?: CallOverrides): Promise<BigNumber>;

  state_lastValsetCheckpoint(overrides?: CallOverrides): Promise<string>;

  state_lastValsetNonce(overrides?: CallOverrides): Promise<BigNumber>;

  state_powerThreshold(overrides?: CallOverrides): Promise<BigNumber>;

  submitBatch(
    _currentValset: ValsetArgsStruct,
    _sigs: ValSignatureStruct[],
    _amounts: PromiseOrValue<BigNumberish>[],
    _destinations: PromiseOrValue<string>[],
    _fees: PromiseOrValue<BigNumberish>[],
    _batchNonce: PromiseOrValue<BigNumberish>,
    _tokenContract: PromiseOrValue<string>,
    _batchTimeout: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  submitLogicCall(
    _currentValset: ValsetArgsStruct,
    _sigs: ValSignatureStruct[],
    _args: LogicCallArgsStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  testCheckValidatorSignatures(
    _currentValset: ValsetArgsStruct,
    _sigs: ValSignatureStruct[],
    _theHash: PromiseOrValue<BytesLike>,
    _powerThreshold: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<void>;

  testMakeCheckpoint(
    _valsetArgs: ValsetArgsStruct,
    _gravityId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<void>;

  updateValset(
    _newValset: ValsetArgsStruct,
    _currentValset: ValsetArgsStruct,
    _sigs: ValSignatureStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deployERC20(
      _cosmosDenom: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _decimals: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    lastBatchNonce(
      _erc20Address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastLogicCallNonce(
      _invalidation_id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sendToCosmos(
      _tokenContract: PromiseOrValue<string>,
      _destination: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    state_gravityId(overrides?: CallOverrides): Promise<string>;

    state_invalidationMapping(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    state_lastBatchNonces(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    state_lastEventNonce(overrides?: CallOverrides): Promise<BigNumber>;

    state_lastValsetCheckpoint(overrides?: CallOverrides): Promise<string>;

    state_lastValsetNonce(overrides?: CallOverrides): Promise<BigNumber>;

    state_powerThreshold(overrides?: CallOverrides): Promise<BigNumber>;

    submitBatch(
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      _amounts: PromiseOrValue<BigNumberish>[],
      _destinations: PromiseOrValue<string>[],
      _fees: PromiseOrValue<BigNumberish>[],
      _batchNonce: PromiseOrValue<BigNumberish>,
      _tokenContract: PromiseOrValue<string>,
      _batchTimeout: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    submitLogicCall(
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      _args: LogicCallArgsStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    testCheckValidatorSignatures(
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      _theHash: PromiseOrValue<BytesLike>,
      _powerThreshold: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    testMakeCheckpoint(
      _valsetArgs: ValsetArgsStruct,
      _gravityId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateValset(
      _newValset: ValsetArgsStruct,
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ERC20DeployedEvent(string,address,string,string,uint8,uint256)"(
      _cosmosDenom?: null,
      _tokenContract?: PromiseOrValue<string> | null,
      _name?: null,
      _symbol?: null,
      _decimals?: null,
      _eventNonce?: null
    ): ERC20DeployedEventEventFilter;
    ERC20DeployedEvent(
      _cosmosDenom?: null,
      _tokenContract?: PromiseOrValue<string> | null,
      _name?: null,
      _symbol?: null,
      _decimals?: null,
      _eventNonce?: null
    ): ERC20DeployedEventEventFilter;

    "LogicCallEvent(bytes32,uint256,bytes,uint256)"(
      _invalidationId?: null,
      _invalidationNonce?: null,
      _returnData?: null,
      _eventNonce?: null
    ): LogicCallEventEventFilter;
    LogicCallEvent(
      _invalidationId?: null,
      _invalidationNonce?: null,
      _returnData?: null,
      _eventNonce?: null
    ): LogicCallEventEventFilter;

    "SendToCosmosEvent(address,address,bytes32,uint256,uint256)"(
      _tokenContract?: PromiseOrValue<string> | null,
      _sender?: PromiseOrValue<string> | null,
      _destination?: PromiseOrValue<BytesLike> | null,
      _amount?: null,
      _eventNonce?: null
    ): SendToCosmosEventEventFilter;
    SendToCosmosEvent(
      _tokenContract?: PromiseOrValue<string> | null,
      _sender?: PromiseOrValue<string> | null,
      _destination?: PromiseOrValue<BytesLike> | null,
      _amount?: null,
      _eventNonce?: null
    ): SendToCosmosEventEventFilter;

    "TransactionBatchExecutedEvent(uint256,address,uint256)"(
      _batchNonce?: PromiseOrValue<BigNumberish> | null,
      _token?: PromiseOrValue<string> | null,
      _eventNonce?: null
    ): TransactionBatchExecutedEventEventFilter;
    TransactionBatchExecutedEvent(
      _batchNonce?: PromiseOrValue<BigNumberish> | null,
      _token?: PromiseOrValue<string> | null,
      _eventNonce?: null
    ): TransactionBatchExecutedEventEventFilter;

    "ValsetUpdatedEvent(uint256,uint256,uint256,address,address[],uint256[])"(
      _newValsetNonce?: PromiseOrValue<BigNumberish> | null,
      _eventNonce?: null,
      _rewardAmount?: null,
      _rewardToken?: null,
      _validators?: null,
      _powers?: null
    ): ValsetUpdatedEventEventFilter;
    ValsetUpdatedEvent(
      _newValsetNonce?: PromiseOrValue<BigNumberish> | null,
      _eventNonce?: null,
      _rewardAmount?: null,
      _rewardToken?: null,
      _validators?: null,
      _powers?: null
    ): ValsetUpdatedEventEventFilter;
  };

  estimateGas: {
    deployERC20(
      _cosmosDenom: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _decimals: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    lastBatchNonce(
      _erc20Address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    lastLogicCallNonce(
      _invalidation_id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sendToCosmos(
      _tokenContract: PromiseOrValue<string>,
      _destination: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    state_gravityId(overrides?: CallOverrides): Promise<BigNumber>;

    state_invalidationMapping(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    state_lastBatchNonces(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    state_lastEventNonce(overrides?: CallOverrides): Promise<BigNumber>;

    state_lastValsetCheckpoint(overrides?: CallOverrides): Promise<BigNumber>;

    state_lastValsetNonce(overrides?: CallOverrides): Promise<BigNumber>;

    state_powerThreshold(overrides?: CallOverrides): Promise<BigNumber>;

    submitBatch(
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      _amounts: PromiseOrValue<BigNumberish>[],
      _destinations: PromiseOrValue<string>[],
      _fees: PromiseOrValue<BigNumberish>[],
      _batchNonce: PromiseOrValue<BigNumberish>,
      _tokenContract: PromiseOrValue<string>,
      _batchTimeout: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    submitLogicCall(
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      _args: LogicCallArgsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    testCheckValidatorSignatures(
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      _theHash: PromiseOrValue<BytesLike>,
      _powerThreshold: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    testMakeCheckpoint(
      _valsetArgs: ValsetArgsStruct,
      _gravityId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    updateValset(
      _newValset: ValsetArgsStruct,
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deployERC20(
      _cosmosDenom: PromiseOrValue<string>,
      _name: PromiseOrValue<string>,
      _symbol: PromiseOrValue<string>,
      _decimals: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    lastBatchNonce(
      _erc20Address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lastLogicCallNonce(
      _invalidation_id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sendToCosmos(
      _tokenContract: PromiseOrValue<string>,
      _destination: PromiseOrValue<BytesLike>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    state_gravityId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    state_invalidationMapping(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    state_lastBatchNonces(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    state_lastEventNonce(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    state_lastValsetCheckpoint(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    state_lastValsetNonce(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    state_powerThreshold(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    submitBatch(
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      _amounts: PromiseOrValue<BigNumberish>[],
      _destinations: PromiseOrValue<string>[],
      _fees: PromiseOrValue<BigNumberish>[],
      _batchNonce: PromiseOrValue<BigNumberish>,
      _tokenContract: PromiseOrValue<string>,
      _batchTimeout: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    submitLogicCall(
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      _args: LogicCallArgsStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    testCheckValidatorSignatures(
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      _theHash: PromiseOrValue<BytesLike>,
      _powerThreshold: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    testMakeCheckpoint(
      _valsetArgs: ValsetArgsStruct,
      _gravityId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    updateValset(
      _newValset: ValsetArgsStruct,
      _currentValset: ValsetArgsStruct,
      _sigs: ValSignatureStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}