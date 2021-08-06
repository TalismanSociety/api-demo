import BN from 'bn.js';

const formatBalance = bal => {
  const base = new BN(10).pow(new BN(10));
  const dm = new BN(bal).divmod(base);
  return parseFloat(dm.div.toString() + "." + dm.mod.toString())
}

export default formatBalance