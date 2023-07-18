import "./App.css";
import { React, useState, useEffect } from "react";
import Web3 from "web3";
import BalanceCard from "./components/balanceCard";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import TransferTokenCard from "./components/transferTokenCard";
import config from "./config";

function App() {
  const [connectdAddress, setConnectdAddress] = useState();
  const [connected, setConnected] = useState(false);
  const [web3Instance, setWeb3Instance] = useState();
  const [provider, setProvider] = useState(window.ethereum);
  const [chainId, setChainId] = useState();

  useEffect(() => {
    // Check if Metamask is installed
    if (!provider) return alert("Please install Metamask");
    setChainId(window.ethereum.chainId);

    // if user has already connected their account then set the connected address
    const web3 = new Web3(provider);
    setWeb3Instance(web3);
    web3.eth.getAccounts().then(async (accounts) => {
      if (accounts.length > 0) {
        setConnectdAddress(accounts[0]);
        setConnected(true);
      }
    });

    // Catch the event when user has changed their account or disconnected their account
    const handleAccountChanged = (accounts) => {
      console.log("accountsChanged - ", accounts);
      if (accounts.length == 0) {
        setConnected(false);
        setConnectdAddress(null);
      } else {
        setConnectdAddress(accounts[0]);
      }
    };

    // Catch the event when user has changed their network
    const handleChainChanged = (chainId) => {
      setChainId(chainId);
      console.log("chainChanged - ", chainId);
      if (chainId != config.chainId) {
        alert("Please connect to Polygon Mumbai Testnet");
      } else {
        console.log("Connected to Polygon Mumbai Testnet");
      }
    };

    // Add event listeners
    web3.eth.provider.on("accountsChanged", handleAccountChanged);
    web3.eth.provider.on("chainChanged", handleChainChanged);
    return () => {
      web3.eth.provider.removeListener("accountsChanged", handleAccountChanged);
      web3.eth.provider.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  return (
    <div className="App">
      <div className="Main_Contaier">
        {/* Navbar */}
        <Navbar
          setConnectdAddress={setConnectdAddress}
          connected={connected}
          setConnected={setConnected}
          chainId={chainId}
          provider={provider}
        />

        {/* Ethereum Address Card */}
        <BalanceCard
          connectdAddress={connectdAddress}
          setConnectdAddress={setConnectdAddress}
          connected={connected}
        />

        {/* Transfer Card */}
        <TransferTokenCard
          web3={web3Instance}
          provider={provider}
          connectdAddress={connectdAddress}
          chainId={chainId}
          connected={connected}
        />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
