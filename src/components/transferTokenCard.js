import React, { useState } from "react";
import Web3 from "web3";
import { isAddress } from "web3-validator";
import config from "../config";

const TransferTokenCard = ({
  provider,
  chainId,
  connectdAddress,
  connected,
}) => {
  const [recipientAddress, setRecipientAddress] = useState();
  const [tokenAmount, setTokenAmount] = useState();
  const [loader, setLoader] = useState(false);

  const showTransactionStatus = (type, message, duration) => {
    let messageDiv;
    switch (type) {
      case "success":
        messageDiv = document.querySelector(".success_div");
        messageDiv.innerHTML = message;

        break;
      case "error":
        messageDiv = document.querySelector(".error_div");
        messageDiv.innerHTML = message;
        break;
      default:
        return;
        break;
    }
    setLoader(false);
    messageDiv.style.display = "flex";
    setTimeout(() => {
      messageDiv.style.display = "none";
    }, duration);
  };

  const sendTransactions = async (toAddress, amount) => {
    try {
      const web3 = new Web3(provider);
      amount = web3.utils.toWei(amount, "ether");
      const contract = new web3.eth.Contract(
        config.abi,
        config.contractAddress
      );
      // check if connected wallet has enough balance
      const balance = await contract.methods.balanceOf(connectdAddress).call();
      if (balance < parseFloat(amount)) {
        showTransactionStatus("error", "Insufficient Balance ❌", 4000);
        return;
      }
      // send transaction
      contract.methods
        .transfer(toAddress, amount)
        .send({ from: connectdAddress })
        .on("confirmation", (confirmationNumber) => {
          console.log("confirmationNumber", confirmationNumber);
          showTransactionStatus("success", "success 👍", 4000);
        })
        .catch((err) => {
          console.log("sendTransaction event emitter err", err);
          showTransactionStatus("error", "Transfer Failed ❌", 4000);
        });
    } catch (error) {
      console.log("sendTransaction error", error);
      showTransactionStatus("error", "Transfer Failed ❌", 4000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if wallet is connected
    if (!connected)
      return showTransactionStatus(
        "error",
        "Please connect your wallet first",
        4000
      );
    // check if connected wallet is on correct network
    if (chainId != config.chainId)
      return showTransactionStatus(
        "error",
        "Please connect to Polygon Mumbai Testnet",
        4000
      );
    // check if all the form details are filled
    if (!tokenAmount || !recipientAddress)
      return showTransactionStatus(
        "error",
        "Please fill all the form details",
        4000
      );
    // check if recipient address is valid
    if (isAddress(recipientAddress)) {
      // send transaction
      sendTransactions(recipientAddress, tokenAmount);
      setLoader(true);
    } else {
      showTransactionStatus("error", "Please enter a valid address", 4000);
    }
  };

  return (
    <div className="transfer_token_card_container">
      <div className=" py-8 flex flex-col gap-3 justify-center items-center">
        <h2 className="font-semibold text-2xl">Transfer ERC20 Token</h2>
        <div className="transfer_card max-w-xl min-w-[350px] w-2/5 p-5 bg-[#F4F6F8] text-base  shadow-cardShadow rounded-xl">
          <form
            className=" flex flex-col gap-2 items-start"
            onSubmit={handleSubmit}
          >
            <label className="font-medium" htmlFor="recipint_ethereum_address">
              Recipient's Ethereum Address
            </label>
            <input
              className="w-full pt-[10px] pb-[11px] pl-[11px] rounded-[12px] border border-[#CCC]"
              type="text"
              id="recipint_ethereum_address"
              name="recipint_ethereum_address"
              placeholder="Enter Ethereum address"
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
            <label className="font-medium" htmlFor="token_amount">
              Token Amount
            </label>
            <input
              className="w-full pt-[10px] pb-[11px] pl-[11px] rounded-[12px] border border-[#CCC]"
              type="number"
              step={0.00000000000000001}
              min={0}
              id="token_amount"
              name="token_amount"
              placeholder="Enter Ethereum address"
              onChange={(e) => setTokenAmount(e.target.value)}
            />
            <div className="mt-2 py-1 px-3 bg-[#31C1BF] text-white font-semibold shadow-lightButtonShadow rounded-[50px]">
              {loader ? (
                "Loading..."
              ) : (
                <button className=" " type="submit">
                  Transfer
                </button>
              )}
            </div>
          </form>
          <div className="success_div text-green-700 hidden justify-center"></div>
          <div className="error_div text-red-700 hidden justify-center"></div>
        </div>
      </div>
    </div>
  );
};

export default TransferTokenCard;
