import { React, useState, useEffect } from "react";
import Web3 from "web3";
import { isAddress } from "web3-validator";
import config from "../config";

const BalanceCard = () => {
  const [inputAddress, setInputAddress] = useState();
  const [isAddressValid, setIsAddressValid] = useState();
  const [balance, setBalance] = useState("0.00");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Please enter correct Ethereum Address!"
  );

  useEffect(() => {
    if (isAddressValid === false) {
      displayErrorMessageCard("Please enter correct Ethereum Address!");
    }
  }, [isAddressValid]);

  function displayErrorMessageCard(err) {
    setErrorMessage(err);
    console.log("eerrr", document.querySelector(".error_message_container"));
    if (document.getElementById("error_message")) {
      document.getElementById("error_message").classList.add("animate-bounce");
      setTimeout(() => {
        document
          .getElementById("error_message")
          .classList.remove("animate-bounce");
      }, 1500);
    }
    if (document.querySelector(".error_message_container"))
      document.querySelector(".error_message_container").style.display = "flex";
  }

  const fetchBalance = async () => {
    try {
      setLoader(true);
      setIsAddressValid(true);
      const web3 = new Web3(
        new Web3.providers.HttpProvider(config.polygonTestnetRpc)
      );

      const contract = new web3.eth.Contract(
        config.abi,
        config.contractAddress
      );

      const balance = await contract.methods.balanceOf(inputAddress).call();
      console.log("balance", balance);

      // balance from wei to eth
      const balanceInEth = parseFloat(
        web3.utils.fromWei(balance, "ether")
      ).toFixed(2);
      console.log("balanceInEth", balanceInEth);
      const balanceWithCommas = balanceInEth
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      console.log("balanceWithCommas", balanceWithCommas);
      setBalance(balanceWithCommas);

      setLoader(false);
    } catch (error) {
      console.log("fetchBalance error: ", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAddress(inputAddress)) {
      setInputAddress(inputAddress);
      fetchBalance();
    } else {
      console.log("invalid address");
      setIsAddressValid(false);
      displayErrorMessageCard("Please enter correct Ethereum Address!");
    }
  };

  return (
    <>
      <div className="balance_card_container">
        <div className=" pt-16 pb-8 flex flex-col gap-6 justify-center items-center">
          <h2 className="font-semibold text-2xl">ERC20 Token Balance</h2>
          <div className="address_card max-w-xl min-w-[350px] w-2/5 p-5 bg-[#F4F6F8] text-base  shadow-cardShadow rounded-xl">
            <form
              className=" flex flex-col gap-2 items-start"
              onSubmit={handleSubmit}
            >
              <label className="font-medium" htmlFor="ethereum_address">
                {" "}
                Ethereum Address{" "}
              </label>
              <input
                className="w-full pt-[10px] pb-[11px] pl-[11px] rounded-[12px] border border-[#CCC]"
                type="text"
                id="ethereum_address"
                name="ethereum_address"
                placeholder="Enter Ethereum address"
                onChange={(e) => setInputAddress(e.target.value.trim())}
              />
              <div className="mt-2 py-1 px-3 bg-[#31C1BF] text-white font-semibold shadow-lightButtonShadow rounded-[50px]">
                <button className=" " type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
          {isAddressValid ? (
            <div className="total_balance_card w-2/5 min-w-[350px] pt-14 bg-[#F4F6F8] flex flex-col items-start shadow-cardShadow rounded-xl">
              <div className=" w-full  py-5 bg-[#FFF] flex justify-center items-center gap-24 lg:gap-64 border border-y-[#CCC] rounded-b-xl ">
                <span>Token Balance</span>
                {loader ? (
                  <div className="bg-[#FFF] flex justify-center items-center after:content-[''] after:w-9 after:h-9 after:border-[7px] after:border-t-black after:rounded-full after:animate-spin " />
                ) : (
                  <>
                    <div>
                      <span className="text-lg font-semibold">{balance}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="error_message_container hidden w-2/5 min-w-[350px] py-3 bg-[#F4F6F8]  justify-center items-center shadow-cardShadow rounded-xl">
              <span id="error_message">{errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BalanceCard;
