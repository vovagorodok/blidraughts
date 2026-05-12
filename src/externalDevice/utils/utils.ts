import * as draughtsFormat from '../../utils/draughtsFormat'
import { State } from '../../draughtsground/state'
import fen from '../../draughtsground/fen'
import bluetooth from '../bluetooth'
import external from '../../externalDevice'

export function isCentralStateCreated(st: State): boolean {
  return Object.keys(st.pieces).length !== 0
}

export function isPeripheralStateGettable(st: State): boolean {
  const pieces = st.peripheral.pieces;
  for (const piece of pieces.values()) {
    if (piece.role === undefined || piece.color === undefined)
      return false;
  }
  return true;
}

export function isUserTurn(st: State): boolean {
  return st.otb || st.orientation === st.turnColor
}

export function createFenTurnColor(st: State): string {
  return st.turnColor === 'white' ? 'w' : 'b'
}

export function createFullFen(st: State): string {
  return [fen.convertPiecesToChessFen(st.pieces, st.boardSize[0]), createFenTurnColor(st)].join(' ')
}

export function applyPeripheralMoveRejected(st: State, isRejected: boolean) {
  st.peripheral.isMoveRejected = isRejected
}

export function applyPeripheralLastMove(st: State, uci: string) {
  const move = draughtsFormat.chessUciToChessMove(uci)
  const prom = draughtsFormat.uciToProm(uci)
  st.peripheral.lastMove = move
  st.peripheral.lastPromotion = prom || null
}

export function applyVariantSupported(st: State, isVariantSupported: boolean) {
  st.peripheral.isVariantSupported = isVariantSupported
}

export function applyPeripheralSynchronized(st: State, isSynchronized: boolean) {
  st.peripheral.isSynchronized = isSynchronized
}

export function applyPeripheralGettable(st: State, isGettable: boolean) {
  st.peripheral.isGettable = isGettable
}

export function applyPeripheralSettable(st: State, isSettable: boolean) {
  st.peripheral.isSettable = isSettable
}

export function applyPeripheralPieces(st: State, peripheralFen: string) {
  st.peripheral.isStateKnown = true
  st.peripheral.pieces = fen.convertChessFenToPeripheralPieces(peripheralFen)
}

export function lastMoveToUci(st: State): string {
  return draughtsFormat.moveToChessUci(
    st.lastMove!,
    st.boardSize[0],
    st.lastPromotion ? st.lastPromotion : undefined)
}

export function sendCommandToPeripheral(cmd: string) {
  bluetooth.sendCommandToPeripheral(cmd)
}

export function sendMoveToCentral(st: State, uci: string): boolean {
  const move = draughtsFormat.chessUciToMove(uci, st.boardSize[0])
  if (move.length !== 2)
    return false
  external.sendMoveToCentral(move[0], move[1])
  return true
}

export function sendStateChangeToCentral() {
  external.sendStateChangeToCentral()
}

export function sendOptionsUpdateToCentral() {
  external.sendOptionsUpdateToCentral()
}

export function getCommandParams(cmd: string): string {
  return cmd.substring(cmd.indexOf(' ') + 1)
}

export function isUciWithPromotion(uci: string): boolean {
  return draughtsFormat.uciToProm(uci) !== undefined
}

export function delay(milliseconds : number) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function* createValuesIterator<T extends object>(instance: T): Generator<T[keyof T]> {
  for (const key of Object.keys(instance) as (keyof T)[]) {
    yield instance[key];
  }
}