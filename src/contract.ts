import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  DataFeedFunded,
  NewDataFeed,
  OneTimeTipClaimed,
  TipAdded,
  TipClaimed
} from "../generated/Contract/Contract"
import { ExampleEntity } from "../generated/schema"

export function handleDataFeedFunded(event: DataFeedFunded): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity._queryId = event.params._queryId
  entity._feedId = event.params._feedId

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.fee(...)
  // - contract.feedsWithFunding(...)
  // - contract.getCurrentFeeds(...)
  // - contract.getCurrentTip(...)
  // - contract.getDataAfter(...)
  // - contract.getDataBefore(...)
  // - contract.getDataFeed(...)
  // - contract.getFundedFeedDetails(...)
  // - contract.getFundedFeeds(...)
  // - contract.getFundedQueryIds(...)
  // - contract.getFundedSingleTipsInfo(...)
  // - contract.getIndexForDataAfter(...)
  // - contract.getIndexForDataBefore(...)
  // - contract.getMultipleValuesBefore(...)
  // - contract.getNewValueCountbyQueryId(...)
  // - contract.getPastTipByIndex(...)
  // - contract.getPastTipCount(...)
  // - contract.getPastTips(...)
  // - contract.getQueryIdFromFeedId(...)
  // - contract.getReporterByTimestamp(...)
  // - contract.getRewardAmount(...)
  // - contract.getRewardClaimStatusList(...)
  // - contract.getRewardClaimedStatus(...)
  // - contract.getTimestampbyQueryIdandIndex(...)
  // - contract.getTipsByAddress(...)
  // - contract.idMappingContract(...)
  // - contract.isInDispute(...)
  // - contract.queryDataStorage(...)
  // - contract.queryIdFromDataFeedId(...)
  // - contract.queryIdsWithFunding(...)
  // - contract.queryIdsWithFundingIndex(...)
  // - contract.retrieveData(...)
  // - contract.setupDataFeed(...)
  // - contract.tellor(...)
  // - contract.tips(...)
  // - contract.token(...)
  // - contract.userTipsTotal(...)
  // - contract.valueFor(...)
}

export function handleNewDataFeed(event: NewDataFeed): void {}

export function handleOneTimeTipClaimed(event: OneTimeTipClaimed): void {}

export function handleTipAdded(event: TipAdded): void {}

export function handleTipClaimed(event: TipClaimed): void {}
