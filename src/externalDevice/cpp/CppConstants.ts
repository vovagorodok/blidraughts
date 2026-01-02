export enum Feature {
  LastMove = 'last_move',
  Msg = 'msg',
  UndoRedo = 'undo_redo',
  Side = 'side',
  GetState = 'get_state',
  SetState = 'set_state',
  Option = 'option',
}

export enum Variant {
  DraughtsStandard = 'draughts_standard',
  AntiDraughts = 'anti_draughts',
  DraughtsBreakthrough = 'draughts_breakthrough',
  DraughtsFrisian = 'draughts_frisian',
  DraughtsFrysk = 'draughts_frysk',
  DraughtsRussian = 'draughts_russian',
  DraughtsBrazilian = 'draughts_brazilian',
  DraughtsEnglish = 'draughts_english',
}

export enum Command {
  Ok = 'ok',
  Nok = 'nok',
  Feature = 'feature',
  Variant = 'variant',
  SetVariant = 'set_variant',
  Begin = 'begin',
  State = 'state',
  Sync = 'sync',
  Unsync = 'unsync',
  UnsyncSettable = 'unsync_settable',
  End = 'end',
  Move = 'move',
  Promote = 'promote',
  Err = 'err',
  LastMove = 'last_move',
  Check = 'check',
  Msg = 'msg',
  Undo = 'undo',
  Redo = 'redo',
  Side = 'side',
  GetState = 'get_state',
  SetState = 'set_state',
  OptionsBegin = 'options_begin',
  OptionsEnd = 'options_end',
  OptionsReset = 'options_reset',
  Option = 'option',
  SetOption = 'set_option',
}

export enum EndReason {
  Undefined = 'undefined',
  Checkmate = 'checkmate',
  Draw = 'draw',
  Timeout = 'timeout',
  Resign = 'resign',
  Abort = 'abort',
}

export enum Side {
  White = 'w',
  Black = 'b',
  Both = '?'
}

export enum OptionType {
  Bool = 'bool',
  Enum = 'enum',
  Str = 'str',
  Int = 'int',
  Float = 'float',
}

export enum BoolOptionValue {
  True = 'true',
  False = 'false',
}