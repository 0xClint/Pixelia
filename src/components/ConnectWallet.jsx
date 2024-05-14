import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { profileIcon } from "../assets";

const ConnectWallet = () => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");

  async function connectWallet() {
    if (!connected) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      // const network = await provider.getNetwork();
      const signer = await provider.getSigner();
      const _walletAddress = await signer.getAddress();
      setConnected(true);
      setAccount(_walletAddress);
    } else {
      window.ethereum.selectedAddress = null;
      setConnected(false);
      setAccount("");
    }
  }

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="flex justify-center items-center">
      {account ? (
        <div className="flex">
          <div className="btn flex items-center gap-2 bg-[#8f2d0fd0] hover:scale-[102%] ">
            {/* <FaUserLarge /> */}
            <img src={profileIcon} className="w-6" />
            {`${account.slice(0, 4)}..${account.slice(account.length - 4)}`}
          </div>
        </div>
      ) : (
        <button
          className="btn bg-[#8f2d0fd0] hover:scale-[102%]"
          onClick={connectWallet}
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
