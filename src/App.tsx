import { useEffect } from 'react'
import styled from 'styled-components'
import { useBalances } from './@talisman/api-react-hooks'
import { formatBalance } from './@talisman/util'

const DemoForm = styled(
  ({
    className
  }) => {

    const { 
      balances,
      addresses,
      chains,
      status,
      message,
      setAddresses,
      setChains,
      fetch,
    } = useBalances()

    useEffect(() => {
      setAddresses(['14ShUZUYUR35RBZW6uVVt1zXDxmSQddkeDdXf1JkMA6P721N'])
      setChains([2])
    }, [setAddresses, setChains])

    return <div
      className={className}
      >
      <fieldset>
        <legend>Enter one or more addresses (new line for each)</legend>
        <textarea 
          cols="30"
          rows="10"
          value={addresses.join('\n')}
          onChange={e => setAddresses(e.target.value?.split('\n'))}
          >
        </textarea>
      </fieldset>
      <fieldset>
        <legend>Select a chain (hold shift for multiple)</legend>
        <select 
          multiple
          onChange={e => setChains([...e.target.options].filter(x => x.selected).map(({value}) => value))}
          >
          <option value="0" selected={chains.includes(0)}>Polkadot</option>
          <option value="2" selected={chains.includes(2)}>Kusama</option>
          <option value="2000" selected={chains.includes(2000)}>Karura</option>
        </select>
      </fieldset>
      <button
        disabled={status === 'PROCESSING'}
        onClick={() => fetch()}
        >
        {status === 'PROCESSING' ? 'loading' : 'Fetch'}
      </button>
      <hr/>
      {!!message && <div className="error" data-status={status}>{message}</div>}
      <div>
        {balances.map(({address, total, token}) => <p><strong>{address}</strong> balance: {formatBalance(total)} {token}</p>)}
      </div>
    </div>
  })
  `
    width: 50%;
    min-width: 300px;
    input,
    textarea{
      display: block;
      width: 100%;
    }
  `

const App = () => {
  return <>
    <header>
      <h1>Talisman Chainfactory Demo</h1>
      <h3>The purpose of this demo is to showcase the chainfactory API and underlying factory lib</h3>
      <p>This app contains 4 levels of nesting. These are, from top level to bottom:</p>
      <ol>
        <li><strong>The UI</strong>; this repo</li>
        <li><strong>A set of react helper hooks</strong>; making React life easier one hook at a time</li>
        <li><strong>The chainfactory API</strong>; a better way to interact with the chainfactory</li>
        <li><strong>The chainfactory lib</strong>; the underyling factory, made of 2 modules ↴</li>
        <ol>
          <li>→ polkadot.js factory (done)</li>
          <li>→ talisman.js factory (todo)</li>
          <li>→ Lightclient factory (todo)</li>
        </ol>
      </ol>
      <hr/>
    </header>
    <main>
      <p>To test, enter an address and a chain to start (can use multiple by comma delimiting)</p>
      <DemoForm/>
    </main>
  </>
}

export default App;
