import React, { useState } from "react";
import config from "../config";

const Navbar = ({
  setConnectdAddress,
  connected,
  setConnected,
  chainId,
  provider,
}) => {
  const [mobileView, setMobileView] = useState(true);

  const handleConnectWallet = async () => {
    if (!provider) return alert("Please install metamask");

    if (chainId != config.chainId)
      return alert("Please connect to Polygon Mumbai Testnet");
    else {
      try {
        console.log("handleConnectWallet function");
        if (!connected) {
          let res = await provider.request({
            method: "eth_requestAccounts",
          });
          setConnectdAddress(res[0]);
          setConnected(true);
        }
      } catch (error) {
        console.log("error in connecting wallet: ", error);
      }
    }
  };

  const handleDisconnect = async () => {
    console.log("Disconnect Function");
    setConnected(false);
  };

  const mobileViewHandle = () => {
    console.log("mobileViewHandle function");
    if (mobileView) {
      setMobileView(false);
      document.querySelector(".mobile_header_container").style.display = "flex";
    } else {
      setMobileView(true);
      document.querySelector(".mobile_header_container").style.display = "none";
    }
  };

  return (
    <>
      {/* Desktop view */}

      <div className="header_container h-[70px] text-sm hidden lg:flex justify-center items-center gap-8 xl:gap-16 xl:text-base">
        {/* left side */}
        <div className="header flex justify-center items-center gap-4 xl:gap-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
          >
            <g clipRule="url(#clip0_1_271)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.9827 19.5474C19.1069 19.5474 13.5345 13.9765 13.5345 7.11006C13.5345 3.51495 10.6344 0.599976 7.01732 0.599976C3.43277 0.599976 0.5 3.51495 0.5 7.11006C0.5 10.7053 3.40015 13.6203 7.01732 13.6203H7.04984C13.8929 13.6203 19.4328 19.191 19.4653 26.0574V26.0898C19.4653 29.685 22.3655 32.6 25.9827 32.6C29.5999 32.6 32.5 29.685 32.5 26.0898C32.4673 22.4624 29.5672 19.5474 25.9827 19.5474Z"
                fill="#31C1BF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.04992 19.5479C3.46537 19.5479 0.532593 22.4629 0.532593 26.058C0.532593 29.6532 3.43275 32.5681 7.04992 32.5681C10.667 32.5681 13.5672 29.6532 13.5672 26.058C13.5346 22.4629 10.6345 19.5479 7.04992 19.5479Z"
                fill="#31C1BF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.9828 0.599976C29.5823 0.599976 32.5001 3.5146 32.5001 7.11005C32.5001 10.7055 29.5823 13.6203 25.9828 13.6203C22.3833 13.6203 19.4655 10.7055 19.4655 7.11005C19.4655 3.5146 22.3833 0.599976 25.9828 0.599976Z"
                fill="#31C1BF"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_271">
                <rect
                  width="32"
                  height="32"
                  fill="white"
                  transform="translate(0.5 0.599976)"
                />
              </clipPath>
            </defs>
          </svg>
          {/* list items - Home,Demeter,Gauge,Stake,Buyback,Swap, More */}
          <ul className="flex gap-4 xl:gap-6 items-center">
            <li>
              <a className="font-bold text-[15px]" href="#home">
                Home
              </a>
            </li>
            <li className="font-sans flex justify-center items-center gap-4">
              <a href="#demeter">Demeter</a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 19 19"
                fill="none"
              >
                <path
                  d="M8.10999 4.59998H3.10999C2.57956 4.59998 2.07085 4.81069 1.69578 5.18577C1.3207 5.56084 1.10999 6.06955 1.10999 6.59998V15.6C1.10999 16.1304 1.3207 16.6391 1.69578 17.0142C2.07085 17.3893 2.57956 17.6 3.10999 17.6H12.11C12.6404 17.6 13.1491 17.3893 13.5242 17.0142C13.8993 16.6391 14.11 16.1304 14.11 15.6V10.6M7.10999 11.6L17.11 1.59998M17.11 1.59998H12.11M17.11 1.59998V6.59998"
                  stroke="#707E85"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
            <li className="font-sans">
              <a href="#gauge">Gauge</a>
            </li>
            <li className="font-sans">
              <a href="#stake">Stake</a>
            </li>
            <li className="font-sans">
              <a href="#buyback">Buyback</a>
            </li>
            <li className="font-sans">
              <a href="#swap">Swap</a>
            </li>
            <li className="font-sans flex justify-center items-center gap-0">
              <a href="#demeter">More</a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M6.40002 9.59998L12.4 15.6L18.4 9.59998"
                  stroke="#1B2022"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </li>
          </ul>
        </div>
        {/* right side */}
        <div className="flex gap-6 items-center">
          {/* buy SPA & USDs button */}
          <button className=" py-1 px-4 bg-[#31C1BF] text-white rounded-[90px] ">
            Buy SPA & USDs
          </button>
          {/* token select dropdown */}
          <div className=" px-2 flex items-center gap-1 rounded-[90px] border-[1px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M0.290039 12.6C0.290039 5.97256 5.66262 0.599976 12.29 0.599976C18.9175 0.599976 24.29 5.97256 24.29 12.6C24.29 19.2274 18.9175 24.6 12.29 24.6C5.66262 24.6 0.290039 19.2274 0.290039 12.6Z"
                fill="#1B2022"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.451 13.5825C13.159 13.5825 11.3016 11.7255 11.3016 9.4367C11.3016 8.23835 10.3349 7.26666 9.12922 7.26666C7.9344 7.26666 6.95679 8.23835 6.95679 9.4367C6.95679 10.6351 7.92352 11.6067 9.12922 11.6067H9.1401C11.4211 11.6067 13.2677 13.4637 13.2786 15.7525V15.7633C13.2786 16.9617 14.2453 17.9333 15.451 17.9333C16.6567 17.9333 17.6234 16.9617 17.6234 15.7633C17.6125 14.5541 16.6459 13.5825 15.451 13.5825Z"
                fill="#46D5CF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.13996 13.5825C7.94514 13.5825 6.96753 14.5541 6.96753 15.7525C6.96753 16.9509 7.93426 17.9226 9.13996 17.9226C10.3457 17.9226 11.3124 16.9509 11.3124 15.7525C11.3015 14.5541 10.3348 13.5825 9.13996 13.5825Z"
                fill="#46D5CF"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4509 7.26666C16.6507 7.26666 17.6233 8.2382 17.6233 9.4367C17.6233 10.6352 16.6507 11.6067 15.4509 11.6067C14.2511 11.6067 13.2784 10.6352 13.2784 9.4367C13.2784 8.2382 14.2511 7.26666 15.4509 7.26666Z"
                fill="#46D5CF"
              />
            </svg>
            0
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="9"
              viewBox="0 0 15 9"
              fill="none"
            >
              <path
                d="M1.68994 1.59998L7.68994 7.59998L13.6899 1.59998"
                stroke="#1B2022"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {/* connect wallet button */}
          {connected ? (
            <button
              onClick={handleDisconnect}
              className="py-1 px-4 bg-[#31C1BF] text-white rounded-[90px]"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={handleConnectWallet}
              className="py-1 px-4 bg-[#31C1BF] text-white rounded-[90px]"
            >
              Connect wallet
            </button>
          )}
          {/* light button */}
          <button>
            <div className="h-8 w-8 bg-[#E9EAF0] flex items-center justify-center shadow-lightButtonShadow rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M10.5001 1.04169C10.8453 1.04169 11.1251 1.32151 11.1251 1.66669V2.50002C11.1251 2.8452 10.8453 3.12502 10.5001 3.12502C10.1549 3.12502 9.87508 2.8452 9.87508 2.50002V1.66669C9.87508 1.32151 10.1549 1.04169 10.5001 1.04169Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.70841 10C5.70841 7.35366 7.85372 5.20835 10.5001 5.20835C13.1464 5.20835 15.2917 7.35366 15.2917 10C15.2917 12.6464 13.1464 14.7917 10.5001 14.7917C7.85372 14.7917 5.70841 12.6464 5.70841 10ZM10.5001 6.45835C8.54407 6.45835 6.95841 8.04401 6.95841 10C6.95841 11.956 8.54407 13.5417 10.5001 13.5417C12.4561 13.5417 14.0417 11.956 14.0417 10C14.0417 8.04401 12.4561 6.45835 10.5001 6.45835Z"
                  fill="black"
                />
                <path
                  d="M5.04948 3.66554C4.8054 3.42146 4.40967 3.42146 4.16559 3.66554C3.92152 3.90962 3.92152 4.30535 4.16559 4.54942L4.75485 5.13868C4.99893 5.38276 5.39466 5.38276 5.63873 5.13868C5.88281 4.8946 5.88281 4.49887 5.63873 4.2548L5.04948 3.66554Z"
                  fill="black"
                />
                <path
                  d="M19.4584 10C19.4584 10.3452 19.1786 10.625 18.8334 10.625H18.0001C17.6549 10.625 17.3751 10.3452 17.3751 10C17.3751 9.65484 17.6549 9.37502 18.0001 9.37502H18.8334C19.1786 9.37502 19.4584 9.65484 19.4584 10Z"
                  fill="black"
                />
                <path
                  d="M16.8346 4.54942C17.0786 4.30534 17.0786 3.90961 16.8346 3.66553C16.5905 3.42146 16.1948 3.42146 15.9507 3.66553L15.3614 4.25479C15.1173 4.49887 15.1173 4.8946 15.3614 5.13867C15.6055 5.38275 16.0012 5.38275 16.2453 5.13867L16.8346 4.54942Z"
                  fill="black"
                />
                <path
                  d="M10.5001 16.875C10.8453 16.875 11.1251 17.1548 11.1251 17.5V18.3334C11.1251 18.6785 10.8453 18.9584 10.5001 18.9584C10.1549 18.9584 9.87508 18.6785 9.87508 18.3334V17.5C9.87508 17.1548 10.1549 16.875 10.5001 16.875Z"
                  fill="black"
                />
                <path
                  d="M16.2454 14.8614C16.0013 14.6173 15.6056 14.6173 15.3615 14.8614C15.1174 15.1055 15.1174 15.5012 15.3615 15.7453L15.9507 16.3345C16.1948 16.5786 16.5905 16.5786 16.8346 16.3345C17.0787 16.0904 17.0787 15.6947 16.8346 15.4506L16.2454 14.8614Z"
                  fill="black"
                />
                <path
                  d="M3.62508 10C3.62508 10.3452 3.34526 10.625 3.00008 10.625H2.16675C1.82157 10.625 1.54175 10.3452 1.54175 10C1.54175 9.65484 1.82157 9.37502 2.16675 9.37502H3.00008C3.34526 9.37502 3.62508 9.65484 3.62508 10Z"
                  fill="black"
                />
                <path
                  d="M5.63868 15.7452C5.88276 15.5012 5.88276 15.1054 5.63868 14.8614C5.3946 14.6173 4.99887 14.6173 4.75479 14.8614L4.16554 15.4506C3.92146 15.6947 3.92146 16.0904 4.16554 16.3345C4.40962 16.5786 4.80535 16.5786 5.04942 16.3345L5.63868 15.7452Z"
                  fill="black"
                />
              </svg>
            </div>
          </button>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M12.5 13.6C13.0523 13.6 13.5 13.1523 13.5 12.6C13.5 12.0477 13.0523 11.6 12.5 11.6C11.9477 11.6 11.5 12.0477 11.5 12.6C11.5 13.1523 11.9477 13.6 12.5 13.6Z"
                stroke="#404B51"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.5 13.6C20.0523 13.6 20.5 13.1523 20.5 12.6C20.5 12.0477 20.0523 11.6 19.5 11.6C18.9477 11.6 18.5 12.0477 18.5 12.6C18.5 13.1523 18.9477 13.6 19.5 13.6Z"
                stroke="#404B51"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.5 13.6C6.05228 13.6 6.5 13.1523 6.5 12.6C6.5 12.0477 6.05228 11.6 5.5 11.6C4.94772 11.6 4.5 12.0477 4.5 12.6C4.5 13.1523 4.94772 13.6 5.5 13.6Z"
                stroke="#404B51"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile view */}

      <div className="mobile_view max-w-5xl lg:hidden">
        <div className="flex mb-1 justify-around items-center">
          <button onClick={mobileViewHandle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
            >
              <path
                d="M12.5 13.6C13.0523 13.6 13.5 13.1523 13.5 12.6C13.5 12.0477 13.0523 11.6 12.5 11.6C11.9477 11.6 11.5 12.0477 11.5 12.6C11.5 13.1523 11.9477 13.6 12.5 13.6Z"
                stroke="#404B51"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19.5 13.6C20.0523 13.6 20.5 13.1523 20.5 12.6C20.5 12.0477 20.0523 11.6 19.5 11.6C18.9477 11.6 18.5 12.0477 18.5 12.6C18.5 13.1523 18.9477 13.6 19.5 13.6Z"
                stroke="#404B51"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.5 13.6C6.05228 13.6 6.5 13.1523 6.5 12.6C6.5 12.0477 6.05228 11.6 5.5 11.6C4.94772 11.6 4.5 12.0477 4.5 12.6C4.5 13.1523 4.94772 13.6 5.5 13.6Z"
                stroke="#404B51"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button>
            <div className="h-8 w-8 bg-[#E9EAF0] flex items-center justify-center shadow-lightButtonShadow rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
              >
                <path
                  d="M10.5001 1.04169C10.8453 1.04169 11.1251 1.32151 11.1251 1.66669V2.50002C11.1251 2.8452 10.8453 3.12502 10.5001 3.12502C10.1549 3.12502 9.87508 2.8452 9.87508 2.50002V1.66669C9.87508 1.32151 10.1549 1.04169 10.5001 1.04169Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.70841 10C5.70841 7.35366 7.85372 5.20835 10.5001 5.20835C13.1464 5.20835 15.2917 7.35366 15.2917 10C15.2917 12.6464 13.1464 14.7917 10.5001 14.7917C7.85372 14.7917 5.70841 12.6464 5.70841 10ZM10.5001 6.45835C8.54407 6.45835 6.95841 8.04401 6.95841 10C6.95841 11.956 8.54407 13.5417 10.5001 13.5417C12.4561 13.5417 14.0417 11.956 14.0417 10C14.0417 8.04401 12.4561 6.45835 10.5001 6.45835Z"
                  fill="black"
                />
                <path
                  d="M5.04948 3.66554C4.8054 3.42146 4.40967 3.42146 4.16559 3.66554C3.92152 3.90962 3.92152 4.30535 4.16559 4.54942L4.75485 5.13868C4.99893 5.38276 5.39466 5.38276 5.63873 5.13868C5.88281 4.8946 5.88281 4.49887 5.63873 4.2548L5.04948 3.66554Z"
                  fill="black"
                />
                <path
                  d="M19.4584 10C19.4584 10.3452 19.1786 10.625 18.8334 10.625H18.0001C17.6549 10.625 17.3751 10.3452 17.3751 10C17.3751 9.65484 17.6549 9.37502 18.0001 9.37502H18.8334C19.1786 9.37502 19.4584 9.65484 19.4584 10Z"
                  fill="black"
                />
                <path
                  d="M16.8346 4.54942C17.0786 4.30534 17.0786 3.90961 16.8346 3.66553C16.5905 3.42146 16.1948 3.42146 15.9507 3.66553L15.3614 4.25479C15.1173 4.49887 15.1173 4.8946 15.3614 5.13867C15.6055 5.38275 16.0012 5.38275 16.2453 5.13867L16.8346 4.54942Z"
                  fill="black"
                />
                <path
                  d="M10.5001 16.875C10.8453 16.875 11.1251 17.1548 11.1251 17.5V18.3334C11.1251 18.6785 10.8453 18.9584 10.5001 18.9584C10.1549 18.9584 9.87508 18.6785 9.87508 18.3334V17.5C9.87508 17.1548 10.1549 16.875 10.5001 16.875Z"
                  fill="black"
                />
                <path
                  d="M16.2454 14.8614C16.0013 14.6173 15.6056 14.6173 15.3615 14.8614C15.1174 15.1055 15.1174 15.5012 15.3615 15.7453L15.9507 16.3345C16.1948 16.5786 16.5905 16.5786 16.8346 16.3345C17.0787 16.0904 17.0787 15.6947 16.8346 15.4506L16.2454 14.8614Z"
                  fill="black"
                />
                <path
                  d="M3.62508 10C3.62508 10.3452 3.34526 10.625 3.00008 10.625H2.16675C1.82157 10.625 1.54175 10.3452 1.54175 10C1.54175 9.65484 1.82157 9.37502 2.16675 9.37502H3.00008C3.34526 9.37502 3.62508 9.65484 3.62508 10Z"
                  fill="black"
                />
                <path
                  d="M5.63868 15.7452C5.88276 15.5012 5.88276 15.1054 5.63868 14.8614C5.3946 14.6173 4.99887 14.6173 4.75479 14.8614L4.16554 15.4506C3.92146 15.6947 3.92146 16.0904 4.16554 16.3345C4.40962 16.5786 4.80535 16.5786 5.04942 16.3345L5.63868 15.7452Z"
                  fill="black"
                />
              </svg>
            </div>
          </button>
        </div>
        <div className="mobile_header_container text-sm hidden flex-col justify-center items-center gap-5 xl:gap-16 xl:text-base ">
          {/* left side */}
          <div className="header flex flex-col justify-center items-center gap-4 xl:gap-6">
            {/* list items - Home,Demeter,Gauge,Stake,Buyback,Swap, More */}
            <ul className="flex flex-col gap-3 xl:gap-6 items-center">
              <li className="flex items-center">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  viewBox="0 0 33 33"
                  fill="none"
                >
                  <g clipRule="url(#clip0_1_271)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25.9827 19.5474C19.1069 19.5474 13.5345 13.9765 13.5345 7.11006C13.5345 3.51495 10.6344 0.599976 7.01732 0.599976C3.43277 0.599976 0.5 3.51495 0.5 7.11006C0.5 10.7053 3.40015 13.6203 7.01732 13.6203H7.04984C13.8929 13.6203 19.4328 19.191 19.4653 26.0574V26.0898C19.4653 29.685 22.3655 32.6 25.9827 32.6C29.5999 32.6 32.5 29.685 32.5 26.0898C32.4673 22.4624 29.5672 19.5474 25.9827 19.5474Z"
                      fill="#31C1BF"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.04992 19.5479C3.46537 19.5479 0.532593 22.4629 0.532593 26.058C0.532593 29.6532 3.43275 32.5681 7.04992 32.5681C10.667 32.5681 13.5672 29.6532 13.5672 26.058C13.5346 22.4629 10.6345 19.5479 7.04992 19.5479Z"
                      fill="#31C1BF"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25.9828 0.599976C29.5823 0.599976 32.5001 3.5146 32.5001 7.11005C32.5001 10.7055 29.5823 13.6203 25.9828 13.6203C22.3833 13.6203 19.4655 10.7055 19.4655 7.11005C19.4655 3.5146 22.3833 0.599976 25.9828 0.599976Z"
                      fill="#31C1BF"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_271">
                      <rect
                        width="32"
                        height="32"
                        fill="white"
                        transform="translate(0.5 0.599976)"
                      />
                    </clipPath>
                  </defs>
                </svg> */}
                <a className="font-bold text-[15px]" href="#home">
                  Home
                </a>
              </li>
              <li className="font-sans flex justify-center items-center gap-1">
                <a href="#demeter">Demeter</a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 19 19"
                  fill="none"
                >
                  <path
                    d="M8.10999 4.59998H3.10999C2.57956 4.59998 2.07085 4.81069 1.69578 5.18577C1.3207 5.56084 1.10999 6.06955 1.10999 6.59998V15.6C1.10999 16.1304 1.3207 16.6391 1.69578 17.0142C2.07085 17.3893 2.57956 17.6 3.10999 17.6H12.11C12.6404 17.6 13.1491 17.3893 13.5242 17.0142C13.8993 16.6391 14.11 16.1304 14.11 15.6V10.6M7.10999 11.6L17.11 1.59998M17.11 1.59998H12.11M17.11 1.59998V6.59998"
                    stroke="#707E85"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
              <li className="font-sans">
                <a href="#gauge">Gauge</a>
              </li>
              <li className="font-sans">
                <a href="#stake">Stake</a>
              </li>
              <li className="font-sans">
                <a href="#buyback">Buyback</a>
              </li>
              <li className="font-sans">
                <a href="#swap">Swap</a>
              </li>
              <li className="font-sans flex justify-center items-center gap-0">
                <a href="#demeter">More</a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                >
                  <path
                    d="M6.40002 9.59998L12.4 15.6L18.4 9.59998"
                    stroke="#1B2022"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </li>
            </ul>
          </div>
          {/* right side */}
          <div className="flex flex-col gap-6 items-center">
            {/* buy SPA & USDs button */}
            <button className=" py-1 px-4 bg-[#31C1BF] text-white rounded-[90px] ">
              Buy SPA & USDs
            </button>
            {/* token select dropdown */}
            <div className=" px-2 flex items-center gap-1 rounded-[90px] border-[1px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
              >
                <path
                  d="M0.290039 12.6C0.290039 5.97256 5.66262 0.599976 12.29 0.599976C18.9175 0.599976 24.29 5.97256 24.29 12.6C24.29 19.2274 18.9175 24.6 12.29 24.6C5.66262 24.6 0.290039 19.2274 0.290039 12.6Z"
                  fill="#1B2022"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.451 13.5825C13.159 13.5825 11.3016 11.7255 11.3016 9.4367C11.3016 8.23835 10.3349 7.26666 9.12922 7.26666C7.9344 7.26666 6.95679 8.23835 6.95679 9.4367C6.95679 10.6351 7.92352 11.6067 9.12922 11.6067H9.1401C11.4211 11.6067 13.2677 13.4637 13.2786 15.7525V15.7633C13.2786 16.9617 14.2453 17.9333 15.451 17.9333C16.6567 17.9333 17.6234 16.9617 17.6234 15.7633C17.6125 14.5541 16.6459 13.5825 15.451 13.5825Z"
                  fill="#46D5CF"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.13996 13.5825C7.94514 13.5825 6.96753 14.5541 6.96753 15.7525C6.96753 16.9509 7.93426 17.9226 9.13996 17.9226C10.3457 17.9226 11.3124 16.9509 11.3124 15.7525C11.3015 14.5541 10.3348 13.5825 9.13996 13.5825Z"
                  fill="#46D5CF"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.4509 7.26666C16.6507 7.26666 17.6233 8.2382 17.6233 9.4367C17.6233 10.6352 16.6507 11.6067 15.4509 11.6067C14.2511 11.6067 13.2784 10.6352 13.2784 9.4367C13.2784 8.2382 14.2511 7.26666 15.4509 7.26666Z"
                  fill="#46D5CF"
                />
              </svg>
              0
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="9"
                viewBox="0 0 15 9"
                fill="none"
              >
                <path
                  d="M1.68994 1.59998L7.68994 7.59998L13.6899 1.59998"
                  stroke="#1B2022"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* connect wallet button */}
            {connected ? (
              <button
                onClick={handleDisconnect}
                className="py-1 px-4 bg-[#31C1BF] text-white rounded-[90px]"
              >
                Disconnect
              </button>
            ) : (
              <button
                onClick={handleConnectWallet}
                className="py-1 px-4 bg-[#31C1BF] text-white rounded-[90px]"
              >
                Connect wallet
              </button>
            )}
            {/* light button */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
