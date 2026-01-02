import { Variants } from '../Variants'

export class DummyVariants implements Variants {
  get standard() { return false }
  get antidraughts() { return false }
  get breakthrough() { return false }
  get frisian() { return false }
  get frysk() { return false }
  get russian() { return false }
  get brazilian() { return false }
  get english() { return false }
}