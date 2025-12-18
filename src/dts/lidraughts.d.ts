declare type Timestamp = number
declare type Seconds = number
declare type Centis = number
declare type Millis = number

declare type StringMap = {
  [i: string]: string | undefined
}

declare type SanChar = 'P' | 'N' | 'B' | 'R' | 'Q'

declare type Color = 'white' | 'black'

declare type ColorMap<T> = {
  [C in Color]: T | undefined
}

declare type VariantKey = 'standard' | 'antidraughts' | 'breakthrough' | 'fromPosition' | 'frisian' | 'frysk' | 'russian' | 'brazilian'

declare type Speed = 'ultraBullet' | 'bullet' | 'blitz' | 'rapid' | 'classical' | 'correspondence' | 'unlimited'
declare type PerfKey = Speed | 'antidraughts' | 'breakthrough' | 'frisian' | 'frysk' | 'russian' | 'brazilian' | 'puzzle' | 'puzzlefrisian'

declare type Role = 'king' | 'man' | 'ghostman' | 'ghostking' | 'unsupport'

declare type Key = '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '50'

declare type KeyPair = [Key, Key]

declare type ChessRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
declare type ChessFile = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j'
declare type ChessKey =
  | 'a1' | 'b1' | 'c1' | 'd1' | 'e1' | 'f1' | 'g1' | 'h1' | 'i1' | 'j1'
  | 'a2' | 'b2' | 'c2' | 'd2' | 'e2' | 'f2' | 'g2' | 'h2' | 'i2' | 'j2'
  | 'a3' | 'b3' | 'c3' | 'd3' | 'e3' | 'f3' | 'g3' | 'h3' | 'i3' | 'j3'
  | 'a4' | 'b4' | 'c4' | 'd4' | 'e4' | 'f4' | 'g4' | 'h4' | 'i4' | 'j4'
  | 'a5' | 'b5' | 'c5' | 'd5' | 'e5' | 'f5' | 'g5' | 'h5' | 'i5' | 'j5'
  | 'a6' | 'b6' | 'c6' | 'd6' | 'e6' | 'f6' | 'g6' | 'h6' | 'i6' | 'j6'
  | 'a7' | 'b7' | 'c7' | 'd7' | 'e7' | 'f7' | 'g7' | 'h7' | 'i7' | 'j7'
  | 'a8' | 'b8' | 'c8' | 'd8' | 'e8' | 'f8' | 'g8' | 'h8' | 'i8' | 'j8'
  | 'a9' | 'b9' | 'c9' | 'd9' | 'e9' | 'f9' | 'g9' | 'h9' | 'i9' | 'j9'
  | 'a:' | 'b:' | 'c:' | 'd:' | 'e:' | 'f:' | 'g:' | 'h:' | 'i:' | 'j:';

declare type ChessKeyPair = [ChessKey, ChessKey]

declare type Shift = 'undo' | 'redo'

declare type NumberPair = [number, number]
declare type NumberPairShift = [number, number, number]

declare type NumberQuad = [number, number, number, number]
declare type NumberQuadShift = [number, number, number, number, number]

declare type BoardPos = {
  left: number
  bottom: number
}

declare type Uci = string
declare type San = string
declare type Fen = string
declare type Ply = number

declare type DestsMap = {
  [index: string]: Key[] | undefined
}

interface LidraughtsOptions {
  apiEndPoint: string
  socketEndPoint: string
  mode: string
  packageVersion: string
  cpuArch: string
}

type RequestIdleCallbackHandle = any
type RequestIdleCallbackOptions = {
  timeout: number
}
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean
  timeRemaining: (() => number)
}

interface Window {
  lidraughts: LidraughtsOptions
  Shepherd: TetherShepherd.ShepherdStatic
  AndroidFullScreen: {
    showSystemUI: () => void
    immersiveMode: () => void
  }
  deviceInfo: {
    platform: 'ios' | 'android' | 'electron' | 'web'
    osVersion: string
    identifier: string
    appVersion: string
    cpuCores: number
    scanMaxMemory: number
  }
  requestIdleCallback?: ((
    callback: ((deadline: RequestIdleCallbackDeadline) => void),
    opts?: RequestIdleCallbackOptions,
  ) => RequestIdleCallbackHandle)
  cancelIdleCallback?: ((handle: RequestIdleCallbackHandle) => void)
}

interface Piece {
  role: Role
  color: Color
  promoted?: boolean
  kingMoves?: number;
}

interface BoardPosition {
  name: string
  fen: string
  code?: string
}

interface BoardPositionCategory {
  name: string
  positions: Array<BoardPosition>
}

declare type BoardSize = [number, number]

interface BoardData {
  key: string
  size: BoardSize
}

interface PeripheralPiece {
  role: Role | undefined
  color: Color | undefined
}

interface Variant {
  key: VariantKey
  board: BoardData
  name: string
  short: string
  title?: string
}
