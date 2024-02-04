import React, { useState } from "react";
import { ethers } from "ethers";

import CONTRACT_ABI from "./abi.json";

const CONTRACT_ADDRESS = "0xeD802ee96c58141D744865301A7145D882C4254D";

export default function App() {
  const { Contract, BrowserProvider } = ethers;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function updateName() {
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
            const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      try {
        const transaction = await contract.updateName("Abdullahi Salihu");
        await transaction.wait();
      } catch (error) {
        setIsError(true);
      }
    }
  }

  async function updateAge() {
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
            const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      try {
        const transaction = await contract.updateAge(20);
        await transaction.wait();
      } catch (error) {
        setIsError(true);
      }
    }
  }

  async function getEntityDetails() {
    setIsLoading(true);
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
            const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      try {
        const entityDetails = await contract.getEntityDetails();
        console.log(entityDetails);
      } catch (error) {
        setIsError(true);
      }
    }
  }

  return (
    <div>
      <button onClick={updateName}>Update Name</button>
      <button onClick={updateAge}>Update Age</button>
      <button onClick={getEntityDetails}>Get Entity Details</button>
    </div>
  );
}
