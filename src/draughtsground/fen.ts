import * as cg from './interfaces'
import { allKeys, algebraicKeys } from './util'
import * as draughtsFormat from '../utils/draughtsFormat'
import * as util from './util'

export const initial = 'W31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50:B1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20'
export const chessInitial = '1p1p1p1p/p1p1p1p1/1p1p1p1p/8/8/P1P1P1P1/1P1P1P1P/P1P1P1P1 w'

export function read(fen: string, fields?: number): cg.Pieces {
  const pieces: cg.Pieces = {}
  if (!fen) return pieces
  if (fen === 'start') fen = initial
  for (const fenPart of fen.split(':')) {
    if (fenPart.length <= 1) continue
    const first = fenPart.slice(0, 1)
    let clr: Color
    if (first === 'W') clr = 'white'
    else if (first === 'B') clr = 'black'
    else continue
    const fenPieces = fenPart.slice(1).split(',')
    for (const fenPiece of fenPieces) {
      if (!fenPiece) continue
      let fieldStr, role: Role
      switch (fenPiece.slice(0, 1)) {
        case 'K':
          role = 'king'
          fieldStr = fenPiece.slice(1)
          break
        case 'G':
          role = 'ghostman'
          fieldStr = fenPiece.slice(1)
          break
        case 'P':
          role = 'ghostking'
          fieldStr = fenPiece.slice(1)
          break
        default:
          role = 'man'
          fieldStr = fenPiece
          break
      }
      if (fieldStr.length === 1) fieldStr = '0' + fieldStr
      let fieldNumber = parseInt(fieldStr)
      if (!fieldNumber) {
        fieldNumber = algebraicKeys.indexOf(fieldStr) + 1
      }
      if (fieldNumber && (!fields || fieldNumber <= fields)) {
        pieces[fieldStr as Key] = {
          color: clr,
          role
        }
      }
    }
  }
  return pieces
}

export function write(pieces: cg.Pieces, fields?: number, algebraic?: boolean): string {
  const max = fields || 50
  let fenW = 'W', fenB = 'B'
  for (let f = 1; f <= max; f++) {
    const key = allKeys[f - 1], piece = pieces[key]
    if (!piece) continue
    if (piece.color === 'white') {
      if (fenW.length > 1) fenW += ','
      if (piece.role === 'king')
        fenW += 'K'
      else if (piece.role === 'ghostman')
        fenW += 'G'
      else if (piece.role === 'ghostking')
        fenW += 'P'
      if (algebraic) fenW += algebraicKeys[f - 1]
      else fenW += f.toString()
    } else {
      if (fenB.length > 1) fenB += ','
      if (piece.role === 'king')
        fenB += 'K'
      else if (piece.role === 'ghostman')
        fenB += 'G'
      else if (piece.role === 'ghostking')
        fenB += 'P'
      if (algebraic) fenB += algebraicKeys[f - 1]
      else fenB += f.toString()
    }
  }
  return fenW + ':' + fenB
}

export function toggleCoordinates(fen: string | undefined, algebraic: boolean, fields?: number): string {
  if (!fen) return ''
  if (fen === 'start') fen = initial
  const extraParts = []
  let prefix = '', fenW = 'W', fenB = 'B'
  for (const fenPart of fen.split(':')) {
    const first = fenPart.slice(0, 1)
    let clr: boolean
    if (first === 'W') clr = true
    else if (first === 'B') clr = false
    else {
      extraParts.push(fenPart)
      continue
    }
    if (fenPart.length === 1) {
      if (!prefix && !extraParts.length) prefix = first
      continue
    }
    const fenPieces = fenPart.slice(1).split(',')
    for (const fenPiece of fenPieces) {
      if (!fenPiece) continue
      let fieldStr, role = fenPiece.slice(0, 1)
      switch (role) {
        case 'K':
        case 'G':
        case 'P':
          fieldStr = fenPiece.slice(1)
          break
        default:
          fieldStr = fenPiece
          role = ''
          break
      }
      if (algebraic) {
        const fieldNumber = parseInt(fieldStr)
        if (fieldNumber && (!fields || fieldNumber <= fields)) {
          if (clr) {
            if (fenW.length > 1) fenW += ','
            fenW += role + algebraicKeys[fieldNumber - 1]
          } else {
            if (fenB.length > 1) fenB += ','
            fenB += role + algebraicKeys[fieldNumber - 1]
          }
        } else if (!fieldNumber && algebraicKeys.includes(fieldStr)) {
          return fen // assume the FEN is already algebraic
        }
      } else {
        const coordIndex = algebraicKeys.indexOf(fieldStr)
        if (coordIndex !== -1 && (!fields || coordIndex < fields)) {
          if (clr) {
            if (fenW.length > 1) fenW += ','
            fenW += role + (coordIndex + 1).toString()
          } else {
            if (fenB.length > 1) fenB += ','
            fenB += role + (coordIndex + 1).toString()
          }
        } else if (coordIndex === -1 && parseInt(fieldStr)) {
          return fen // assume the FEN is already fieldnumbers
        }
      }
    }
  }
  const partsOut = prefix ? [prefix, fenW, fenB] : [fenW, fenB]
  return partsOut.concat(extraParts).join(':')
}

export function countGhosts(fen: string): number {
  if (!fen) return 0
  if (fen === 'start') fen = initial
  let ghosts = 0
  for (const fenPart of fen.split(':')) {
    if (fenPart.length <= 1) continue
    let first = fenPart.slice(0, 1)
    if (first === 'W' || first === 'B') {
      const fenPieces = fenPart.slice(1).split(',')
      for (const fenPiece of fenPieces) {
        first = fenPiece.slice(0, 1)
        if (first === 'G' || first === 'P')
          ghosts++
      }
    }
  }
  return ghosts
}


export function readKingMoves(fen: string): cg.KingMoves | null {

  if (!fen) return null
  if (fen === 'start') fen = initial

  const fenParts = fen.split(':'),
    kingMoves = fenParts.length ? fenParts[fenParts.length - 1] : ''

  if (kingMoves.indexOf('+') !== 0)
    return null

  const playerMoves = kingMoves.split('+').filter(function (e) { return e.length !== 0 })
  if (playerMoves.length !== 2)
    return null

  const whiteMoves = parseInt(playerMoves[1].slice(0, 1)),
    blackMoves = parseInt(playerMoves[0].slice(0, 1)),
    result: cg.KingMoves = { 
      white: { count: whiteMoves },
      black: { count: blackMoves }
    }
  if (whiteMoves > 0)
    result.white.key = playerMoves[1].slice(1) as Key
  if (blackMoves > 0)
    result.black.key = playerMoves[0].slice(1) as Key

  return result
}

const roles: {[i: string]: Role} = {
  p: 'man',
  r: 'man',
  n: 'man',
  b: 'man',
  q: 'king',
  k: 'king',
  P: 'man',
  R: 'man',
  N: 'man',
  B: 'man',
  Q: 'king',
  K: 'king'
}

const letters = {
  man: 'p',
  king: 'q',
  ghostman: 'p',
  ghostking: 'q',
}

export function convertChessFenToPeripheralPieces(fen: string): cg.PeripheralPieces {
  const pieces: cg.PeripheralPieces = new Map()
  let row = 8
  let col = 0
  for (let i = 0; i < fen.length; i++) {
    const c = fen[i]
    switch (c) {
      case ' ': return pieces
      case '/':
        --row
        if (row === 0) return pieces
        col = 0
        break
      default: {
        const nb = ~~c
        if (nb) col += nb
        else {
          ++col
          const role = c.toLowerCase()
          pieces.set(util.pos2chessKey([col, row] as cg.Pos), {
            role: 'u?'.includes(role) ? undefined : roles[role],
            color: role === '?' ? undefined : c === role ? 'black' : 'white'
          })
        }
      }
    }
  }
  return pieces
}

function convertPeripheralPiecesToFen(_pieces: cg.PeripheralPieces) {
  return chessInitial
  // return [8, 7, 6, 5, 4, 3, 2].reduce(
  //   function(str, nb) {
  //     return str.replace(new RegExp(Array(nb + 1).join('1'), 'g'), String(nb))
  //   },
  //   util.invRanks.map((y) => {
  //     return util.ranks.map((x) => {
  //       const piece = pieces.get(util.pos2key([x, y]))
  //       if (piece) {
  //         if (piece.role) {
  //           const letter = letters[piece.role]
  //           return piece.color === 'white' ? letter.toUpperCase() : letter
  //         } else {
  //           return piece.color ? (piece.color === 'white' ? 'U' : 'u') : '?'
  //         }
  //       } else return '1'
  //     }).join('')
  //   }).join('/'))
}

export function convertPiecesToChessPieces(pieces: cg.Pieces, boardSize: number): cg.ChessPieces {
  const chessPieces: cg.ChessPieces = new Map()
  for (const [key, piece] of Object.entries(pieces) as [Key, Piece][]) {
    const chessKey = draughtsFormat.convertKeyToChessKey(key, boardSize)
    chessPieces.set(chessKey, piece)
  }
  return chessPieces
}

export const ranks: readonly ChessRank[] = [1, 2, 3, 4, 5, 6, 7, 8]
export const invRanks: readonly ChessRank[] = [8, 7, 6, 5, 4, 3, 2, 1]
function convertPiecesToChessFen(pieces: cg.Pieces, boardSize: number) {
  if (boardSize === 10)
    return chessInitial
  const chessPieces = convertPiecesToChessPieces(pieces, boardSize)
  return [8, 7, 6, 5, 4, 3, 2].reduce(
    function(str, nb) {
      return str.replace(new RegExp(Array(nb + 1).join('1'), 'g'), String(nb))
    },
    invRanks.map((y) => {
      return ranks.map((x) => {
        const piece = chessPieces.get(util.pos2chessKey([x, y]))
        if (piece) {
          const letter = letters[piece.role]
          return piece.color === 'white' ? letter.toUpperCase() : letter
        } else return '1'
      }).join('')
    }).join('/'))
}

export default {
  initial,
  read,
  write,
  toggleCoordinates,
  countGhosts,
  readKingMoves,
  convertChessFenToPeripheralPieces,
  convertPeripheralPiecesToFen,
  convertPiecesToChessFen
}
