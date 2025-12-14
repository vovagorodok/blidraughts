import { Support } from '../utils/Support'
import { Variant } from './CppConstants'
import { Variants } from '../Variants'

export class CppVariants {
  standard = new Support(Variant.DraughtsStandard)
  antidraughts = new Support(Variant.AntiDraughts)
  breakthrough = new Support(Variant.DraughtsBreakthrough)
  frisian = new Support(Variant.DraughtsFrisian)
  frysk = new Support(Variant.DraughtsFrysk)
  russian = new Support(Variant.DraughtsRussian)
  brazilian = new Support(Variant.DraughtsBrazilian)
  english = new Support(Variant.DraughtsEnglish)
}

export class CppWrappedVariants implements Variants {
  private _variants: CppVariants

  constructor(variants: CppVariants) {
    this._variants = variants
  }

  get standard() {
    return this._variants.standard.isSupported
  }
  get antidraughts() {
    return this._variants.antidraughts.isSupported
  }
  get breakthrough() {
    return this._variants.breakthrough.isSupported
  }
  get frisian() {
    return this._variants.frisian.isSupported
  }
  get frysk() {
    return this._variants.frysk.isSupported
  }
  get russian() {
    return this._variants.russian.isSupported
  }
  get brazilian() {
    return this._variants.brazilian.isSupported
  }
  get english() {
    return this._variants.english.isSupported
  }
}